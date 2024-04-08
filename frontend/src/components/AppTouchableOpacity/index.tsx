import { ReactNode, useState } from "react";
import { Box, BoxProps, SxProps, Theme } from "@mui/material";

type Props = {
  onClick?: () => void;
  sx?: SxProps<Theme>;
  children: ReactNode;
} & BoxProps;

const AppTouchableOpacity = ({ onClick, sx, children, ...props }: Props) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
  };

  const handleRelease = () => {
    setTimeout(() => {
      setIsPressed(false);
      onClick && onClick();
    }, 100);
  };

  return (
    <Box
      {...props}
      sx={{
        cursor: "pointer",
        opacity: isPressed ? 0.5 : 1,
        ...sx,
      }}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
    >
      {children}
    </Box>
  );
};

export default AppTouchableOpacity;
