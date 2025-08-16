import React from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, Typography } from "@mui/material";
import { useUserDetailsQuery } from "@/lib/api/userDetailsQuery";
import { usePageLogger } from "@/hooks/usePageLogger";
import { messages } from "@/i18n/en";

export default function UserDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: user,
    isLoading,
    isError,
  } = useUserDetailsQuery(Number(id), !!id);

  usePageLogger("user-details");

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
          <CardContent>{messages.screens.dashboard.user.error}</CardContent>
        </Card>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <Card sx={{ maxWidth: 500, mx: "auto", mt: 8 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 4 }}>
            {user?.name}
          </Typography>
          <Typography>
            {messages.screens.dashboard.user.email}: {user?.email}
          </Typography>
          <Typography>
            {messages.screens.dashboard.user.phone}: {user?.phone}
          </Typography>
          <Typography>
            {messages.screens.dashboard.user.website}: {user?.website}
          </Typography>
          <Typography>
            {messages.screens.dashboard.user.company}: {user?.company?.name}
          </Typography>
          <Typography>
            {messages.screens.dashboard.user.address}: {user?.address?.street},{" "}
            {user?.address?.city}
          </Typography>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
