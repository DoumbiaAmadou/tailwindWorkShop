"use client";
import { UserType } from "@/store/type";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent } from "react";

const page = () => {
  const checkValueAndSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data = {
      email: target.email.value,
      name: target.lastname.value,
      firstName: target.firstname.value,
      password: target.password.value,
      city: target.city.value,
      cellphone: target.cellphone.value,
      userStatus: "USER",
      passwordConfirm: target.passwordConfirm.value,
    };
    // pour faire simple
    if (
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email) &&
      data.password.length > 4 &&
      data.passwordConfirm === data.password
    ) {
      const user = await axios.post<UserType>("/api/user/create", data);
      console.log(" ==>", user);
    } else {
      console.log(" wrong data ");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        width={{ xs: 300, sm: 400, md: 700 }}
        height="auto"
        margin="auto"
        sx={{
          backgroundColor: "#c0c7c6e0",
        }}
      >
        {" "}
        <form onSubmit={checkValueAndSubmit}>
          <Stack spacing={{ xs: 1, md: 5 }} padding={{ xs: 2, md: 10 }}>
            <TextField id="email" type="Email" label="email" name="email" />
            <TextField id="firstname" label="Prenom" name="firstname" />
            <TextField id="lastname" label="Nom" name="lastname" />
            <TextField id="cellphone" label="Telephone" name="cellphone" />
            <TextField id="city" label="city" name="Ville" />
            <TextField id="password" label="mot de passe " name="passeword" />
            <TextField
              id="passwordConfirm"
              label="confimer votre mot de passe"
              name="passwordConfirm"
            />
            <Button type="submit" variant="outlined" color="primary">
              {"créer un compte"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
export default page;
