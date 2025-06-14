import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useLocation } from "react-router-dom";

const iconColor = {
  color: "#000",
  "&.Mui-selected": {
    color: "#d01818",
  },
};

export default function Navbar() {
  const location = useLocation();

  const pathToValueList = [
    { path: "/pedido", value: 1 },
    { path: "/relatorio-financeiro", value: 2 },
    { path: "/relatorio-produtos", value: 3 },
    { path: "/cadastro/funcionario", value: 4 },
    { path: "/listar/funcionario", value: 5 },
  ];

  const value =
    pathToValueList.find(({ path }) => location.pathname.startsWith(path))
      ?.value ?? 0;

  return (
    <Box sx={{ width: "100%", margin: "0 auto" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event) => {}}
        sx={{ backgroundColor: "#c0c0c1" }}>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          sx={iconColor}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Pedido"
          icon={<ShoppingBagIcon />}
          sx={iconColor}
          component={Link}
          to="/pedido"
        />
        <BottomNavigationAction
          label="Finanças"
          icon={<AssignmentIcon />}
          sx={iconColor}
          component={Link}
          to="/relatorio-financeiro"
        />
        <BottomNavigationAction
          label="Produtos"
          icon={<AssignmentIcon />}
          sx={iconColor}
          component={Link}
          to="/relatorio-produtos"
        />
        <BottomNavigationAction
          label="Cadastro"
          icon={<PersonAddAlt1Icon />}
          sx={iconColor}
          component={Link}
          to="/cadastro/funcionario"
        />
        <BottomNavigationAction
          label="Listar"
          icon={<FormatListBulletedIcon />}
          sx={iconColor}
          component={Link}
          to="/listar/funcionario"
        />
      </BottomNavigation>
    </Box>
  );
}
