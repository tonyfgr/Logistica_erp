import { useState } from "react";

import { Link } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import "./index.css";

const CustomListItem = ({ name, url, icons, item, bigOpen }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem key={name} disablePadding>
        <Link to={url}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              px: 2.5,
            }}
            onClick={handleClick}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 2,
                justifyContent: "center",
              }}
            >
              {icons}
            </ListItemIcon>
            <ListItemText primary={name} style={{ color: "#454545 " }} disableTypography/>
          </ListItemButton>
        </Link>
      </ListItem>
      {item.map((i, index) => (
        <Collapse key={index} in={open} timeout="auto">
          <Link
            to={i.url}
            style={{ textDecoration: "none", color: "#777777 " }}
          >
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>{i.icon}</ListItemIcon>
                <ListItemText id="items" primary={i.name} disableTypography />
              </ListItemButton>
            </List>
          </Link>
        </Collapse>
      ))}
    </>
  );
};

export default CustomListItem;