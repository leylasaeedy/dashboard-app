import React from "react";
import { useLogsStore } from "@/store/logs.store";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Box } from "@mui/material";
import { usePageLogger } from "@/hooks/usePageLogger";
import { PaginatedTable } from "@/components/ui/PaginatedTable";
import { messages } from "@/i18n/en";

export default function LogsPage() {
  const logs = useLogsStore((s) => s.logs);
  usePageLogger("logs");

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
        <h1>{messages.screens.dashboard.logs.logs}</h1>
        <PaginatedTable
          columns={[
            { header: "Action", accessor: (l) => l.action },
            {
              header: "Time",
              accessor: (l) => {
                return new Date(l.timestamp).toLocaleString();
              },
            },
            {
              header: "Meta",
              accessor: (l) => (l.meta ? JSON.stringify(l.meta) : "-"),
            },
          ]}
          data={logs}
        />
      </Box>
    </DashboardLayout>
  );
}
