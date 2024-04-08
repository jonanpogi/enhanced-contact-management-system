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
import theme from "../../utils/theme";
import { grey } from "@mui/material/colors";

const AppBar = () => {
  const isMoble = useMediaQuery(theme.breakpoints.down("sm"));

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
          {isMoble ? "" : "Enhanced Contact Management System"}
        </Typography>

        {isMoble ? (
          <IconButton>
            <LogoutIcon sx={{ color: "white" }} />
          </IconButton>
        ) : (
          <Button color="inherit">SIGNOUT</Button>
        )}
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
