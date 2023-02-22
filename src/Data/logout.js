import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { pink } from "@mui/material/colors";

import LogoutIcon from "@mui/icons-material/Logout";

export const logout = (
  <React.Fragment>
    <NavLink className="nav-link active" aria-current="page" to="adminLogout">
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon sx={{ color: pink[500] }} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);
