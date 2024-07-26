import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ name, icon, url }) => {
  return (
    <NavLink
      to={url}
      style={{ textDecoration: "none" }}
      end
      activeclassname="active"
    >
      <ListItemButton
        className="linkBtn"
        sx={{
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
          paddingY: "10px",
          paddingX: "20px",
          borderRadius: "8px",
        }}
      >
        <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
        <ListItemText
          primary={name}
          sx={{ ml: "-10px", color: "#fff" }}
        />
      </ListItemButton>
    </NavLink>
  );
};

export default SidebarItem;
