import { Box, Divider, Drawer, List, Toolbar, Typography, IconButton } from "@mui/material";
import React from "react";
import { links } from "../../data/links";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";

import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({ sideBarWidth, mobileOpen, handleDrawerToggle }) => {
  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2, color: "#fff" }}>
          CIS
        </Typography>
        {/* Close button for mobile view */}
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#fff", ml: "auto" }}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List disablePadding>
        {links?.map((link, index) =>
          link?.subLinks ? (
            <SidebarItemCollapse {...link} key={index} />
          ) : (
            <SidebarItem {...link} key={index} />
          )
        )}
      </List>
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { md: sideBarWidth }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
 

      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          "& .MuiDrawer-paper": {
            width: sideBarWidth,
            boxSizing: "border-box",
            backgroundColor: "#3f51b5",
            color: "#fff",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
