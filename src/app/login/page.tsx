"use client";
import { setAuthState } from "@/store/authSlice";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { saveAuth } from "../../lib/storage";
import { UserTypeDTO } from "../api/user/login/route";
const page = () => {
  const dispatcher = useDispatch();
  const router = useRouter();
  const checkValueAndSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const { email, password } = {
      email: target.email.value,
      password: target.password.value,
    };
    // pour faire simple
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && password.length > 4) {
      const AxiosResult = await axios.post<{
        result: UserTypeDTO;
        xsrfToken: string;
      }>("/api/user/login", {
        email,
        password,
      });
      if (AxiosResult?.data) {
        const auth = { status: true, user: AxiosResult?.data?.result };
        saveAuth(auth, AxiosResult.data.xsrfToken);

        dispatcher(setAuthState(auth));
        router.push("/");
      }
      //TODO:do some stuff to clean form
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        width={{ xs: 300, sm: 400, md: 700 }}
        height="auto"
        margin="auto"
        borderRadius={3}
        sx={{
          backgroundColor: "#c0c7c6e0",
        }}
      >
        <form onSubmit={checkValueAndSubmit}>
          <Stack spacing={{ xs: 1, md: 5 }} padding={{ xs: 2, md: 10 }}>
            <TextField id="email" type="email" label="email" name="email" />
            <TextField id="password" label="password" name="passeword" />
            <Button type="submit" variant="outlined" color="primary">
              {"se connecter "}
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
export default page;
