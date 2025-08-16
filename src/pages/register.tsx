import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { RegisterFormUser } from "@/types/user.type";
import { registerUser } from "@/utils/localStorageHandler.utils";
import { messages } from "@/i18n/en";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterFormUser>();
  const router = useRouter();

  const onSubmit = (data: RegisterFormUser) => {
    registerUser(data);
    router.push("/login");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
        my: 12,
      }}
    >
      <h1>{messages.screens.register.register}</h1>
      <TextField label="Name" {...register("name", { required: true })} />
      <TextField
        label="Username"
        {...register("username", { required: true })}
      />
      <TextField
        label="Email"
        type="email"
        {...register("email", { required: true })}
      />
      <TextField
        label="Password"
        type="password"
        {...register("password", { required: true })}
      />
      <Button variant="contained" color="primary" type="submit">
        {messages.screens.register.register}
      </Button>
    </Box>
  );
}
