import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import AppItem from "../../components/AppItem";
import {
  Alert,
  AlertTitle,
  Avatar,
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
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";

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
  const [contactDetailsDrawer, setContactDetailsDrawer] = useState(false);
  const [details, setDetails] = useState<Contact | null>(null);

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

  const toggleContactDetailsDrawer = () => {
    if (contactDetailsDrawer) {
      setDetails(null);
    }

    setContactDetailsDrawer(!contactDetailsDrawer);
  };

  const openContactDetails = (details: Contact) => {
    toggleContactDetailsDrawer();
    setDetails(details);
  };

  const handleDeleteContact = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
      preConfirm: async () => {
        try {
          const url = `${BASE_URL}/contact/${id}`;

          const rawResponse = await fetch(url, {
            method: "DELETE",
          });

          const response = (await rawResponse.json()) as {
            success: boolean;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: any;
            message?: string;
          };

          if (!response.success) {
            throw new Error(response.message);
          }

          return { success: response.success };
        } catch (error) {
          if (error instanceof Error) {
            console.error(error);
            Swal.fire("Error!", error.message, "error");
          } else {
            Swal.fire("Error!", "An unexpected error has occurred", "error");
          }
        }
      },
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed && result.value?.success) {
        await Swal.fire({
          title: "Deleted!",
          text: "The contact has been deleted.",
          icon: "success",
        });
        await fetchData();
        toggleContactDetailsDrawer();
      }
    });
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
              onClick={() => openContactDetails(contact)}
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

          <ContactForm
            refetch={fetchData}
            toggleContactFormDrawer={toggleContactFormDrawer}
            defaultValues={details as Contact}
          />
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={contactDetailsDrawer}
        onClose={toggleContactDetailsDrawer}
      >
        <Box sx={{ width: isMobile ? "100vw" : 500, padding: 2 }}>
          {isMobile && (
            <IconButton onClick={toggleContactDetailsDrawer}>
              <CloseIcon />
            </IconButton>
          )}
          <Stack
            direction={"row"}
            mb={6}
            display={"flex"}
            alignItems={"center"}
          >
            <Avatar
              src={details?.imageData}
              sx={{
                width: isMobile ? 150 : 180,
                height: isMobile ? 150 : 180,
              }}
              alt="Profile Picture"
            />

            <Stack direction={"column"} ml={3}>
              <Typography
                variant={isMobile ? "h6" : "h5"}
              >{`${details?.firstName}${details?.lastName}`}</Typography>
              <Button
                size="small"
                variant="contained"
                onClick={openContactForm}
              >
                <EditIcon /> EDIT CONTACT
              </Button>
            </Stack>
          </Stack>

          <Stack direction={"column"} mb={6} display={"flex"}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{ marginBottom: 1 }}
            >
              Personal Details:
            </Typography>

            <Stack display={"flex"} direction={"column"}>
              <Typography color={"GrayText"} variant={"caption"}>
                First Name:
              </Typography>
              <Typography variant={isMobile ? "body2" : "body1"}>
                {details?.firstName}
              </Typography>
            </Stack>

            <Stack display={"flex"} direction={"column"}>
              <Typography color={"GrayText"} variant={"caption"}>
                Last Name:
              </Typography>
              <Typography variant={isMobile ? "body2" : "body1"}>
                {details?.lastName}
              </Typography>
            </Stack>

            <Stack display={"flex"} direction={"column"}>
              <Typography color={"GrayText"} variant={"caption"}>
                Email:
              </Typography>
              <Typography variant={isMobile ? "body2" : "body1"}>
                {details?.email}
              </Typography>
            </Stack>

            <Stack display={"flex"} direction={"column"}>
              <Typography color={"GrayText"} variant={"caption"}>
                Phone Number:
              </Typography>
              <Typography variant={isMobile ? "body2" : "body1"}>
                {`(${details?.phoneNumber.countryCode}) ${details?.phoneNumber.number}`}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction={"column"} mb={6} display={"flex"}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{ marginBottom: 1 }}
            >
              Address Details:
            </Typography>

            <Stack display={"flex"} direction={"column"}>
              <Typography color={"GrayText"} variant={"caption"}>
                Street
              </Typography>
              <Typography variant={isMobile ? "body2" : "body1"}>
                {details?.address?.street}
              </Typography>
            </Stack>

            <Stack display={"flex"} direction={"column"}>
              <Typography color={"GrayText"} variant={"caption"}>
                State
              </Typography>
              <Typography variant={isMobile ? "body2" : "body1"}>
                {details?.address?.state}
              </Typography>
            </Stack>

            <Stack display={"flex"} direction={"column"}>
              <Typography color={"GrayText"} variant={"caption"}>
                Country
              </Typography>
              <Typography variant={isMobile ? "body2" : "body1"}>
                {details?.address?.country}
              </Typography>
            </Stack>

            <Stack display={"flex"} direction={"column"}>
              <Typography color={"GrayText"} variant={"caption"}>
                Zip Code
              </Typography>
              <Typography variant={isMobile ? "body2" : "body1"}>
                {details?.address?.zipCode}
              </Typography>
            </Stack>
          </Stack>

          <Button
            color="error"
            fullWidth
            variant="contained"
            onClick={() => handleDeleteContact(details?.id as string)}
          >
            DELETE CONTACT
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Contacts;
