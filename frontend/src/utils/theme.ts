import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Verdana",
      "Georgia",
      "Arial",
      "Calibri",
      "Trebuchet MS",
      "Candara",
      "Arial Unicode MS",
      "Segoe UI",
      "Century Gothic",
      "Roboto",
      '"Helvetica Neue"',
      "sans-serif",
    ].join(","),
    fontSize: 16,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
