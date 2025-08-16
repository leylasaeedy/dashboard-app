import React from "react";
import { Table } from "@/components/ui/Table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUsersQuery } from "@/lib/api/usersQuery";
import { User } from "@/types/user.type";
import { Box, Card, CardContent } from "@mui/material";
import { usePageLogger } from "@/hooks/usePageLogger";

export default function UsersPage() {
  const { data: users = [], isLoading, isError } = useUsersQuery();
  usePageLogger("users");

  if (isLoading)
    return (
      <DashboardLayout>
        <Card sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
          <CardContent>Loading...</CardContent>
        </Card>
      </DashboardLayout>
    );
  if (isError)
    return (
      <DashboardLayout>
        <Card sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
          <CardContent>Error loading users list</CardContent>
        </Card>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "50%",
          },
          mx: "auto",
        }}
      >
        <h1>Users</h1>
        <Table
          columns={[
            { header: "Name", accessor: (u: User) => u.name },
            { header: "Email", accessor: (u: User) => u.email },
          ]}
          data={users}
        />
      </Box>
    </DashboardLayout>
  );
}
