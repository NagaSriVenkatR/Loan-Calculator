import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { darkMode, setDarkMode } = useAppContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { label: "EMICalculator", path: "/" },
    { label: "Exchangerates", path: "/exchange-rate" },
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ mt: 0 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>
            Loan Calculator
          </Typography>

          {/* Desktop & Tablet Menu (visible from sm and up) */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={NavLink}
                to={item.path}
                color="inherit"
                sx={{
                  "&.active": {
                    backgroundColor: "#1976d2",
                    color: "#fff",
                  },
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                  textTransform: "none",
                }}
              >
                {item.label}
              </Button>
            ))}
            <Switch
              checked={darkMode}
              onChange={handleDarkModeToggle}
              inputProps={{ "aria-label": "toggle theme" }}
              color="default"
            />
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 200 }}>
          {menuItems.map((item) => (
            <Button
              key={item.label}
              component={NavLink}
              to={item.path}
              color="inherit"
              sx={{
                width: "100%",
                justifyContent: "flex-center",
                marginLeft: 1,
                "&.active": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                },
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
                textTransform: "none",
              }}
            >
              {item.label}
            </Button>
          ))}
          <ListItem>
            <Switch
              checked={darkMode}
              onChange={handleDarkModeToggle}
              color="default"
              inputProps={{ "aria-label": "toggle theme" }}
            />
            Dark Mode
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
