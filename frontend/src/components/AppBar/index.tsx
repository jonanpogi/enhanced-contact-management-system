import {
  Button,
  IconButton,
  AppBar as MUIAppBar,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import theme from "../../utils/theme";
import { grey } from "@mui/material/colors";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AppBar = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MUIAppBar
      position="fixed"
      sx={{
        backgroundColor: grey[900],
      }}
    >
      <Toolbar>
        <CallIcon sx={{ marginRight: 2 }} />

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {isMobile ? "" : "Enhanced Contact Management System"}
        </Typography>

        <SignedIn>
          {isMobile ? (
            <IconButton>
              <LogoutIcon sx={{ color: "white" }} />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={() => signOut()}>
              SIGNOUT
            </Button>
          )}
        </SignedIn>

        <SignedOut>
          {isMobile ? (
            <IconButton>
              <LoginIcon sx={{ color: "white" }} />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={() => navigate("/sign-in")}>
              SIGNIN
            </Button>
          )}
        </SignedOut>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
