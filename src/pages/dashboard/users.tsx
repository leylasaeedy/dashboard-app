import React from "react";
import { Table } from "@/components/ui/Table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUsersQuery } from "@/lib/api/usersQuery";
import { User } from "@/types/user.type";
import { Box, Card, CardContent } from "@mui/material";
import { usePageLogger } from "@/hooks/usePageLogger";
import { messages } from "@/i18n/en";

export default function UsersPage() {
  const { data: users = [], isLoading, isError } = useUsersQuery();
  usePageLogger("users");

  if (isLoading)
    return (
      <DashboardLayout>
        <Card sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
          <CardContent>
            {messages.components.dashboard.common.loading}
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  if (isError)
    return (
      <DashboardLayout>
        <Card sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
          <CardContent>{messages.screens.dashboard.users.error}</CardContent>
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
        <h1>{messages.screens.dashboard.users.users}</h1>
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
