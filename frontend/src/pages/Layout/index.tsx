import { Box, CssBaseline } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import AppContainer from "../../components/AppContainer";
import AppBar from "../../components/AppBar";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      navigate("/sign-in");
    }
  }, [isSignedIn, isLoaded, navigate]);

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
