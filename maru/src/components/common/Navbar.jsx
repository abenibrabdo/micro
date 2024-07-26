import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { BsBell } from "react-icons/bs";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { useColorTheme } from "../../contexts/ThemeContext";
import ProfileMenu from "./ProfileMenu";
import { links } from "../../data/links"; // Import your links data

const Navbar = ({ sideBarWidth, handleDrawerToggle }) => {
  const colorMode = useColorTheme();
  const currentTheme = colorMode.currentTheme;
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleTheme = () => {
    colorMode.toggleColorMode();
    document.documentElement.setAttribute(
      "data-theme",
      currentTheme === "light" ? "dark" : "light"
    );
  };

  // Handle opening and closing of the menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${sideBarWidth}px)` },
        ml: { md: `${sideBarWidth}px` },
        boxShadow: "unset",
        backgroundColor: "#3f51b5",
        color: "text.primary",
        borderBottomWidth: 1,
        borderBottomColor: "divider",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Tooltip title="Menu" arrow>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <FiMenu />
              </IconButton>
            </Tooltip>

            <Typography
              variant="h5"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Dashboard
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Menu" arrow>
              <IconButton
                aria-label="menu"
                onClick={handleMenuClick}
                sx={{ fontSize: "20px", color: "white" }}
              >
                <FiMenu />
              </IconButton>
            </Tooltip>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              sx={{ mt: "45px" }} // Adjust to position menu below button
            >
              {links.map((link, index) => (
                <div key={index}>
                  <MenuItem onClick={handleCloseMenu} component="a" href={link.url}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {link.icon}
                      <Typography variant="body1">{link.name}</Typography>
                    </Box>
                  </MenuItem>
                  {link.subLinks && (
                    <>
                      <Divider />
                      {link.subLinks.map((subLink, subIndex) => (
                        <MenuItem
                          key={subIndex}
                          onClick={handleCloseMenu}
                          component="a"
                          href={subLink.url}
                          sx={{ pl: 4 }} // Indent sublinks
                        >
                          {subLink.name}
                        </MenuItem>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </Menu>

            <Tooltip title="Notifications" arrow>
              <IconButton sx={{ fontSize: "20px", color: "text.primary" }}>
                <Badge color="error" variant="dot">
                  <BsBell />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle Theme" arrow>
              <IconButton
                onClick={toggleTheme}
                sx={{ fontSize: "20px", color: "text.primary" }}
              >
                {currentTheme === "light" ? <FiMoon /> : <FiSun />}
              </IconButton>
            </Tooltip>

            <ProfileMenu />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

