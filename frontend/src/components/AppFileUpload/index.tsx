import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Avatar, Box, IconButton } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import Swal from "sweetalert2";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  onChange: (image: File | null) => void;
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

const AppFileUpload = ({ onChange }: Props) => {
  const [image, setImage] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

    if (!file) {
      return;
    }

    if (file.size > maxSizeInBytes) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonColor: blue[500],
        text: "File size exceeds 10MB",
      });
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonColor: blue[500],
        text: "File type must be either jpeg or png",
      });
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
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ bgcolor: grey[700], "&:hover": { bgcolor: grey[500] } }}
        >
          Upload Profile Picture
          <VisuallyHiddenInput type="file" onChangeCapture={handleFileUpload} />
        </Button>
      )}
    </Box>
  );
};

export default AppFileUpload;
