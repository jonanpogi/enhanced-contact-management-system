import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  defaultImage?: string | null;
  onChange: (image: File | null) => void;
  error: string | null;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AppFileUpload = ({ defaultImage = null, onChange, error }: Props) => {
  const [image, setImage] = useState<string | null>(defaultImage);
  const [errorMessage, setErrorMessage] = useState<string | null>(error);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

    if (!file) {
      return;
    }

    if (file.size > maxSizeInBytes) {
      return setErrorMessage("File size must not exceed 10MB");
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return setErrorMessage("Only JPEG and PNG files are allowed");
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);

    onChange(file as File);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      mb={5}
      sx={
        image
          ? {
              position: "relative",
              padding: 2,
              borderWidth: 2,
              borderRadius: 3,
              borderStyle: "solid",
              alignItems: "center",
              borderColor: grey[300],
            }
          : undefined
      }
    >
      {image && (
        <>
          <Box position={"absolute"} top={2} right={2}>
            <IconButton onClick={() => setImage(null)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Avatar src={image as string} sx={{ height: 125, width: 125 }} />
        </>
      )}
      {!image && (
        <>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ bgcolor: grey[700], "&:hover": { bgcolor: grey[500] } }}
          >
            Upload Profile Picture
            <VisuallyHiddenInput
              type="file"
              onChangeCapture={handleFileUpload}
            />
          </Button>
          {errorMessage && (
            <Typography color={"error"} variant={"caption"} mt={1}>
              {errorMessage}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default AppFileUpload;
