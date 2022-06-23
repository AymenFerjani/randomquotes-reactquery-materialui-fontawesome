import { useState } from "react";
import { useQuery } from "react-query";
import { MyCard } from "./components/MyCard";
import { getRandomInt } from "./utils";

function App() {
  //React States
  const [quotes, setQuotes] = useState([]); //to store the fetched list of quotes
  const [quote, updateQuote] = useState(null); //to store the selected quote

  //fetch the list of quotes
  const { isFetching: isFetchingQuotes, error: errorQuotes } = useQuery(
    "quote",
    async () => {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        setQuotes(data); //store the list of quotes
        updateQuote(data[getRandomInt(0, data.length - 1)]); //select and store a random quote
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    {
      retry: 2 //retry at most 2 times if the query fails
    }
  );

  //fetch the random image, no need to store it in a state
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
      retry: 2 //retry at most 2 times if the query fails
    }
  );

  //this function refetchs a new random image from api and selects a random quote from the stored list
  const doUpdate = () => {
    updateImg(); //refetch a new random image
    updateQuote(quotes[getRandomInt(0, quotes.length - 1)]); //select a random quote from the stored list
  };

  //show a spinner when fetching
  if (isFetchingQuotes || isFetchingImg) {
    return <MyCard fetching={true} />;
  }

  //show an error
  if (errorQuotes && errorImg) {
    return <MyCard error={true} />;
  }

  //return the MyCard component
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
