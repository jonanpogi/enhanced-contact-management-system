import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppContainer from "../../components/AppContainer";
import AppBar from "../../components/AppBar";

const Layout = () => {
  return (
    <Box flex={1} display={"flex"}>
      <CssBaseline />
      <AppBar />
      <AppContainer>
        <Outlet />
      </AppContainer>
    </Box>
  );
};

export default Layout;
