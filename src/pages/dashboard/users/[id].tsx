import React from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, Typography } from "@mui/material";
import { useUserDetailsQuery } from "@/lib/api/userDetailsQuery";
import { usePageLogger } from "@/hooks/usePageLogger";

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
          <CardContent>Loading...</CardContent>
        </Card>
      </DashboardLayout>
    );
  if (isError)
    return (
      <DashboardLayout>
        <Card sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
          <CardContent>Error loading user</CardContent>
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
          <Typography>Email: {user?.email}</Typography>
          <Typography>Phone: {user?.phone}</Typography>
          <Typography>Website: {user?.website}</Typography>
          <Typography>Company: {user?.company?.name}</Typography>
          <Typography>
            Address: {user?.address?.street}, {user?.address?.city}
          </Typography>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
