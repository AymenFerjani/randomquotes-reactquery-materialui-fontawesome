import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { shadows } from "@mui/system"; //needed to show the shadow effect on Card
import { red, grey } from "@mui/material/colors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //to use the quote-left and quote-right icons

export function MyCard({
  fetching,
  error,
  quoteText,
  quoteAuthor,
  dataImg,
  doUpdate
}) {
  //shows the spinner when fetching
  if (fetching) {
    return (
      <Container fixed={true} maxWidth="xs">
        <Box sx={{ mt: 15, textAlign: "center" }}>
          <CircularProgress color="primary" size={150} />
        </Box>
      </Container>
    );
  }

  //shows a Card with an error message
  if (error) {
    return (
      <Container fixed={true} maxWidth="xs">
        <Box sx={{ mt: 10, boxShadow: 3 }}>
          <Card>
            <CardContent>
              <h3 style={{ color: red[500] }}>A problem occured...</h3>
            </CardContent>
            <CardActions>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                onClick={doUpdate}
              >
                Retry
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    );
  }

  //shows the Card if all the data is passed
  return (
    <Container fixed={true} maxWidth="xs">
      {quoteText && dataImg && (
        <Box sx={{ mt: 1, mb: 1, boxShadow: 3 }}>
          <Card>
            <CardMedia component="img" image={dataImg} alt="" />
            <CardContent>
              <blockquote>
                <FontAwesomeIcon
                  icon="quote-left"
                  size="xl"
                  beat
                  style={{ color: "#3f51b5" }}
                />
                <span style={{ marginLeft: 5, marginRight: 5 }}>
                  {quoteText}
                </span>
                <FontAwesomeIcon
                  icon="quote-right"
                  size="xl"
                  beat
                  style={{ color: "#3f51b5" }}
                />
                <Box
                  component="div"
                  sx={{
                    fontStyle: "italic",
                    fontSize: 16,
                    textAlign: "right",
                    fontWeight: "bold",
                    color: grey[700],
                    mb: -3
                  }}
                >
                  {quoteAuthor}
                </Box>
              </blockquote>
            </CardContent>
            <CardActions>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                onClick={doUpdate}
              >
                Update
              </Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </Container>
  );
}
