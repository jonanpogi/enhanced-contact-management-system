import { Typography } from "@mui/material";
import AppContainer from "../../components/AppContainer";
import ErrorIcon from "@mui/icons-material/Error";
import { useRouteError } from "react-router-dom";
import { grey } from "@mui/material/colors";

const Error = () => {
  const error = useRouteError();
  let errorMessage;

  if (error && typeof error === "object") {
    errorMessage =
      "statusText" in error
        ? error.statusText
        : "message" in error
        ? error.message
        : "";
  }

  return (
    <AppContainer>
      <Typography variant="h3" color={grey[800]} gutterBottom>
        Oops!
      </Typography>
      <Typography variant="subtitle1" color="GrayText" gutterBottom>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography color="error" sx={{ display: "flex", alignItems: "center" }}>
        <ErrorIcon />
        &nbsp;<i>{errorMessage as string}</i>
      </Typography>
    </AppContainer>
  );
};

export default Error;
