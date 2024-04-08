import { Avatar, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import AppTouchableOpacity from "../AppTouchableOpacity";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { grey } from "@mui/material/colors";
import theme from "../../utils/theme";

type Props = {
  imageUrl: string;
  title: string;
  subTitle: string;
  onClick: () => void;
};

const AppItem = ({ imageUrl, title, subTitle, onClick }: Props) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppTouchableOpacity onClick={onClick} sx={{ width: "100%" }}>
      <Paper elevation={4} sx={{ borderRadius: 3, width: "inherit", p: 1 }}>
        <Stack
          direction={"row"}
          rowGap={1}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Avatar
              src={imageUrl}
              alt="picture"
              sx={{ mr: 3, height: 50, width: 50 }}
            />
            <Stack>
              <Typography
                gutterBottom
                variant={isMobile ? "body2" : "body1"}
                component="div"
              >
                {title}
              </Typography>
              <Typography
                fontSize={isMobile ? 12 : 14}
                color="text.secondary"
                gutterBottom
              >
                {subTitle}
              </Typography>
            </Stack>
          </Stack>

          <ChevronRightIcon sx={{ height: 30, width: 30, color: grey[700] }} />
        </Stack>
      </Paper>
    </AppTouchableOpacity>
  );
};

export default AppItem;
