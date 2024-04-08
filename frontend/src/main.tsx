import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import { ClerkProvider } from "@clerk/clerk-react";
import { CLERK_PUBLISHABLE_KEY } from "./utils/constants";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
