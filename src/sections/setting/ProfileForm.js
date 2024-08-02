import React, { useCallback, useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Typography, Avatar, Button } from "@mui/material";
import { faker } from "@faker-js/faker";
import FormProvider from "../../components/Hook-Form/FormProvider";
import { RHFTextField } from "../../components/Hook-Form";

const ProfileForm = () => {
  const [file, setFile] = useState(null);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatar: Yup.mixed().required("Avatar is required"),
  });

  const defaultValues = {
    firstName: "",
    about: "",
    avatar: null,
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const { reset, watch, control, setValue } = methods;

  const values = watch();

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      // Handle the form data and file upload here
      console.log("DATA", data);
      console.log("File", file);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setValue("avatar", file, { shouldValidate: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" alignItems="center" spacing={2}>
        <Typography variant="body2">Avatar</Typography>
        <Avatar
          src={file ? URL.createObjectURL(file) : faker.image.avatar()}
          alt="Avatar"
          sx={{ width: 100, height: 100 }}
        />
        <Button variant="contained" component="label">
          Upload Avatar
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
      </Stack>

      <Stack spacing={3} sx={{ mt: "40px" }}>
        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="firstName"
          label="First Name"
        />
        <RHFTextField multiline rows={4} name="about" label="About" />

        <Stack direction={"row"} justifyContent="end">
          <Button color="primary" size="large" type="submit" variant="outlined">
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
