import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Box, Snackbar } from "@mui/material";
import { useLogsStore } from "@/store/logs.store";
import { AuthUser } from "@/types/user.type";

export default function LoginPage() {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();
  const addLog = useLogsStore((s) => s.addLog);
  const router = useRouter();

  const [snackOpen, setSnackOpen] = React.useState(false);

  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const users: AuthUser[] = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      addLog({ action: "login", meta: { path: router.asPath } });
      router.push("/dashboard/users");
    } else setSnackOpen(true);
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
      <Snackbar
        open={snackOpen}
        autoHideDuration={1000}
        onClose={() => setSnackOpen(false)}
        message="User doesnt exist or Wrong User Credentials"
      />
      <h1>Login</h1>
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
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      <Button
        component={Link}
        href="/register"
        variant="text"
        color="secondary"
        sx={{ mt: 2 }}
      >
        Don`t have an account? Register
      </Button>
    </Box>
  );
}
