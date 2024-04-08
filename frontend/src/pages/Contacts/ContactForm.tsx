import { Button, Grid, InputLabel, TextField } from "@mui/material";
import AppRequiredFieldIndicator from "../../components/AppRequiredFieldIndicator";
import AppFileUpload from "../../components/AppFileUpload";
import { blue } from "@mui/material/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import { Contact } from ".";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import Swal from "sweetalert2";

type ContactInput = { imageId?: string } & Omit<Contact, "imageData">;

type Props = {
  toggleContactFormDrawer: () => void;
  refetch: () => Promise<void>;
};

const ContactForm = ({ refetch, toggleContactFormDrawer }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm<ContactInput>();

  const onSubmit: SubmitHandler<ContactInput> = async (data) => {
    if (image === null) return;

    // show loading dialog
    Swal.showLoading();

    // create form data
    const formData = new FormData();

    // append image to form data
    formData.append("profileImage", image);

    // send image to server
    const imageResponse = await fetch(`${BASE_URL}/contact/image`, {
      method: "POST",
      body: formData,
    });

    // get image response data
    const imageResponseData = (await imageResponse.json()) as {
      success: boolean;
      data: string;
    };

    // check if image upload is successful
    if (!imageResponseData.success) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonColor: blue[500],
        text: "Failed to upload image",
      });
    }

    // get image id
    const imageId = imageResponseData.data;

    // create contact input
    const body: ContactInput = {
      ...data,
      phoneNumber: {
        countryCode: "+63",
        number: data.phoneNumber.number.slice(1),
      },
      address: {
        ...data.address,
        geocode: { longitude: 0, latitude: 0 },
      },
      imageId,
    };

    // send contact to server
    const contactResponse = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const contactResponseData = (await contactResponse.json()) as {
      success: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any;
    };

    if (!contactResponseData.success) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonColor: blue[500],
        text: "Failed to create contact",
      });
    }

    // close contact form drawer and refetch contacts
    toggleContactFormDrawer();
    Swal.hideLoading();
    await refetch();
  };

  const handleSaveChanges = async () => {
    const test = await trigger([
      "firstName",
      "lastName",
      "email",
      "phoneNumber.number",
      "address",
    ]);

    if (!test) {
      return;
    }

    handleSubmit(onSubmit)();
  };

  return (
    <>
      <AppFileUpload onChange={(image) => setImage(image)} />
      <Grid container flex={1} rowSpacing={2} columnSpacing={1}>
        <Grid item xs={12} sm={6}>
          <InputLabel shrink>
            First Name <AppRequiredFieldIndicator />
          </InputLabel>
          <TextField
            placeholder="John"
            fullWidth
            size="small"
            {...register("firstName", {
              required: {
                value: true,
                message: "Please enter your first name.",
              },
              minLength: {
                value: 2,
                message: "Please enter atleast 2 characters.",
              },
            })}
            error={!!errors.firstName}
            helperText={errors?.firstName?.message || ""}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel shrink>
            Last Name <AppRequiredFieldIndicator />
          </InputLabel>
          <TextField
            placeholder="Doe"
            fullWidth
            size="small"
            {...register("lastName", {
              required: {
                value: true,
                message: "Please enter your last name.",
              },
              minLength: {
                value: 2,
                message: "Please enter atleast 2 characters.",
              },
            })}
            error={!!errors.lastName}
            helperText={errors?.lastName?.message || ""}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <InputLabel shrink>
            Email <AppRequiredFieldIndicator />
          </InputLabel>
          <TextField
            placeholder="john.doe@gmail.com"
            fullWidth
            size="small"
            {...register("email", {
              required: {
                value: true,
                message: "Please enter your email address.",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address.",
              },
            })}
            error={!!errors.email}
            helperText={errors?.email?.message || ""}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <InputLabel shrink>
            Phone Number <AppRequiredFieldIndicator />
          </InputLabel>
          <TextField
            placeholder="09XXXXXXXXX"
            fullWidth
            size="small"
            {...register("phoneNumber.number", {
              required: {
                value: true,
                message: "Please enter your phone number.",
              },
              pattern: {
                value: /^09\d{9}$/,
                message:
                  "Please enter a valid 11-digit number starting with 09",
              },
            })}
            error={!!errors.phoneNumber?.number}
            helperText={errors?.phoneNumber?.number?.message || ""}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <InputLabel shrink>
            Street <AppRequiredFieldIndicator />
          </InputLabel>
          <TextField
            placeholder="123 Street"
            fullWidth
            size="small"
            {...register("address.street", {
              required: {
                value: true,
                message: "Please enter your street address.",
              },
              minLength: {
                value: 2,
                message: "Please enter atleast 2 characters.",
              },
            })}
            error={!!errors.address?.street}
            helperText={errors?.address?.street?.message || ""}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <InputLabel shrink>
            State <AppRequiredFieldIndicator />
          </InputLabel>
          <TextField
            placeholder="Arizona"
            fullWidth
            size="small"
            {...register("address.state", {
              required: {
                value: true,
                message: "Please enter your state.",
              },
              minLength: {
                value: 2,
                message: "Please enter atleast 2 characters.",
              },
            })}
            error={!!errors.address?.state}
            helperText={errors?.address?.state?.message || ""}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <InputLabel shrink>
            Country <AppRequiredFieldIndicator />
          </InputLabel>
          <TextField
            placeholder="United States"
            fullWidth
            size="small"
            {...register("address.country", {
              required: {
                value: true,
                message: "Please enter your country.",
              },
              minLength: {
                value: 2,
                message: "Please enter atleast 2 characters.",
              },
            })}
            error={!!errors.address?.country}
            helperText={errors?.address?.country?.message || ""}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <InputLabel shrink>
            Zip Code <AppRequiredFieldIndicator />
          </InputLabel>
          <TextField
            placeholder="85001"
            fullWidth
            size="small"
            {...register("address.zipCode", {
              required: {
                value: true,
                message: "Please enter your zip code.",
              },
              pattern: {
                value: /^\d{5}$/,
                message: "Please enter a valid 5-digit zip code.",
              },
            })}
            error={!!errors.address?.zipCode}
            helperText={errors?.address?.zipCode?.message || ""}
          />
        </Grid>

        <Grid item xs={12} sm={12} flex={1} sx={{ marginTop: 6 }}>
          <Button
            fullWidth
            size="small"
            variant="contained"
            onClick={handleSaveChanges}
            sx={{ bgcolor: blue[700], "&:hover": { bgcolor: blue[500] } }}
          >
            SAVE CHANGES
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactForm;
