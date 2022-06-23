import { useState } from "react";
//import DeleteIcon from "@material-ui/icons/Delete";
import { useQuery } from "react-query";
import { MyCard } from "./components/MyCard";

function App() {
  //React State
  const [quotes, setQuotes] = useState([]);
  const [quote, updateQuote] = useState(null);

  const { isFetching: isFetchingQuotes, error: errorQuotes } = useQuery(
    "quote",
    async () => {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        setQuotes(data);
        updateQuote(data[getRandomInt(0, data.length - 1)]);
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    {
      retry: 2
    }
  );

  const {
    data: dataImg,
    isFetching: isFetchingImg,
    error: errorImg,
    refetch: updateImg
  } = useQuery(
    "img",
    async () => {
      try {
        const response = await fetch(
          "https://source.unsplash.com/random/1000x1000/?nature&animal"
        );
        const imageBlob = await response.blob();
        return URL.createObjectURL(imageBlob);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    {
      retry: 2
    }
  );

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const doUpdate = () => {
    updateImg();
    updateQuote(quotes[getRandomInt(0, quotes.length - 1)]);
  };

  if (isFetchingQuotes || isFetchingImg) {
    return <MyCard fetching={true} />;
  }

  if (errorQuotes && errorImg) {
    return <MyCard error={true} />;
  }

  return (
    <MyCard
      quoteText={quote?.text}
      quoteAuthor={quote?.author}
      dataImg={dataImg}
      doUpdate={doUpdate}
    />
  );
}

export default App;
