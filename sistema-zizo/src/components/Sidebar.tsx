import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BadgeIcon from "@mui/icons-material/Badge";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface SidebarProps {
  type: string;
}

const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false); // Estado para expandir/retrair a sidebar

  const drawerWidth = 220;
  const collapsedWidth = 64;

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const listItems = [
    { text: "Funcionários", icon: <BadgeIcon />, to: `/${type}/funcionario` },
    { text: "Itens", icon: <Inventory2Icon />, to: `/${type}/item` },
    { text: "Pedidos", icon: <AssignmentIcon />, to: `/${type}/pedido` },
    { text: "Clientes", icon: <PeopleAltIcon />, to: `/${type}/cliente` },
    { text: "Produtos", icon: <ShoppingBagIcon />, to: `/${type}/produto` },
  ];

  const sidebarContent = (
    <List>
      {listItems.map(({ text, icon, to }) => (
        <ListItem
          key={text}
          disablePadding
          component={Link}
          to={to}
          sx={{
            textDecoration: "none",
            color: "inherit",
          }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : "auto",
                justifyContent: "center",
              }}>
              {icon}
            </ListItemIcon>
            {open && <ListItemText primary={text} />}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 1300,
          color: "inherit",
        }}>
        <MenuIcon />
      </IconButton>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            backgroundColor: "#f9f9f9",
            borderRight: "1px solid #ddd",
            paddingTop: isMobile ? 0 : "64px",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
          },
        }}>
        <Box sx={{ mt: isMobile ? 0 : 2 }}>{sidebarContent}</Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
