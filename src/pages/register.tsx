import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { AuthUser, RegisterFormUser } from "@/types/user.type";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterFormUser>();
  const router = useRouter();

  const onSubmit = (data: RegisterFormUser) => {
    const users: AuthUser[] = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
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
      <h1>Register</h1>
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
        Register
      </Button>
    </Box>
  );
}
