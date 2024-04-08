import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import AppItem from "../../components/AppItem";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Drawer,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import theme from "../../utils/theme";
import CloseIcon from "@mui/icons-material/Close";
import ContactForm from "./ContactForm";
import bufferToBase64 from "../../utils/bufferToBase64";

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: {
    countryCode: string;
    number: string;
  };
  address: {
    street: string;
    state: string;
    country: string;
    zipCode: string;
    geocode: {
      longitude: number;
      latitude: number;
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageData: any;
};

const Contacts = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [contactFormDrawer, setContactFormDrawer] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const url = `${BASE_URL}/contacts`;

      const rawResponse = await fetch(url);

      const response = (await rawResponse.json()) as {
        success: boolean;
        data: Contact[];
        message?: string;
      };

      if (!response.success) {
        throw new Error(response.message);
      }

      const mappedData = response.data.map((contact) => {
        const { imageData } = contact;

        if (imageData && imageData?.type === "Buffer") {
          const base64String = bufferToBase64(imageData.data);

          return {
            ...contact,
            imageData: `data:image/jpeg;base64,${base64String}`,
          };
        }

        return contact;
      });

      setData(mappedData);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setError(error.message);
      } else {
        setError("An unexpected error has occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleContactFormDrawer = () => {
    setContactFormDrawer(!contactFormDrawer);
  };

  const openContactForm = () => {
    toggleContactFormDrawer();
  };

  return (
    <>
      <Box
        display={"flex"}
        rowGap={3}
        flex={1}
        flexDirection={"column"}
        width={"100%"}
        paddingTop={10}
      >
        <Stack
          direction={"row"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant={isMobile ? "h6" : "h5"}>Contacts</Typography>
          <Button
            size="small"
            variant="contained"
            onClick={openContactForm}
            sx={{ bgcolor: grey[700], "&:hover": { bgcolor: grey[500] } }}
          >
            ADD CONTACT
          </Button>
        </Stack>

        {loading &&
          [...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={66.66}
              width={"100%"}
              sx={{ borderRadius: 3 }}
            />
          ))}
        {!loading && error && (
          <Alert severity="error" variant="filled">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        {!loading &&
          data.length > 0 &&
          data.map((contact) => (
            <AppItem
              key={contact.id}
              imageUrl={contact.imageData}
              title={`${contact.firstName} ${contact.lastName}`}
              subTitle={`(${contact.phoneNumber.countryCode}) ${contact.phoneNumber.number}`}
              onClick={() => alert(JSON.stringify(contact))}
            />
          ))}
      </Box>
      {/* Drawers should be at the same level of this component */}
      <Drawer
        anchor="right"
        open={contactFormDrawer}
        onClose={toggleContactFormDrawer}
      >
        <Box sx={{ width: isMobile ? "100%" : 500, padding: 2 }}>
          {isMobile && (
            <IconButton onClick={toggleContactFormDrawer}>
              <CloseIcon />
            </IconButton>
          )}
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ marginBottom: 3 }}>
            Contact Form
          </Typography>
          <Typography
            variant={isMobile ? "subtitle2" : "subtitle1"}
            color={"GrayText"}
            sx={{ marginBottom: 3 }}
          >
            <i>Please fill in the form below to add a new contact.</i>
          </Typography>

          <ContactForm refetch={fetchData} toggleContactFormDrawer={toggleContactFormDrawer} />
        </Box>
      </Drawer>
    </>
  );
};

export default Contacts;
