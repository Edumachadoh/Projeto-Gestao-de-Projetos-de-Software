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

  const drawerWidth = 220;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const listItems = [
    { text: "Funcionários", icon: <BadgeIcon />, to: `/${type}/funcionario` },
    { text: "Itens", icon: <Inventory2Icon />, to: `/${type}/item` },
    { text: "Pedidos", icon: <AssignmentIcon />, to: `/${type}/pedido` },
    { text: "Clientes", icon: <PeopleAltIcon />, to: `/${type}/cliente` },
    { text: "Produtos", icon: <ShoppingBagIcon />, to: `/${type}/produto` },
  ];

  const sidebarContent = (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={handleDrawerToggle}>
      <List>
        {listItems.map(({ text, icon, to }) => (
          <ListItem
            key={text}
            disablePadding
            component={Link}
            to={to}
            sx={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{ position: "fixed", top: 10, left: 10, zIndex: 1300 }}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f9f9f9",
            borderRight: "1px solid #ddd",
            paddingTop: isMobile ? "0" : "64px",
          },
        }}>
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
