import Link from "next/link";
import { useRouter } from "next/router";
import { useLogsStore } from "@/store/logs.store";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { AppBar, IconButton, Toolbar } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { removeAuth } from "@/utils/localStorageHandler.utils";
import { messages } from "@/i18n/en";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const removeLogs = useLogsStore((s) => s.removeLogs);

  const [drawerShow, setDrawerShow] = React.useState(false);

  const handleLogout = () => {
    removeAuth();
    removeLogs();
    router.push("/login");
  };
  const handleDrawerOpen = () => {
    setDrawerShow(true);
  };

  const handleDrawerClose = () => {
    setDrawerShow(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar color="inherit" position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerShow} variant="persistent" anchor="left">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton size="large" onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Box sx={{ width: 240, p: 2 }}>
          <Box sx={{ mb: 2, fontWeight: "bold", fontSize: 20 }}>Dashboard</Box>
          <List>
            <ListItem component={Link} href="/dashboard/users">
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem component={Link} href="/dashboard/logs">
              <ListItemText primary="Logs" />
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            fullWidth
            sx={{ mt: 2 }}
          >
            {messages.components.dashboard.layout.logout}
          </Button>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {children}
      </Box>
    </Box>
  );
}
