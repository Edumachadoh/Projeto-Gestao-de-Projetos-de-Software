import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Link } from "react-router";

const iconColor = {
  color: "#000",
  "&.Mui-selected": {
    color: "#d01818",
  },
};

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "100%", margin: "0 auto" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: "#c0c0c1" }}>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          sx={iconColor}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Relatório"
          icon={<AssignmentIcon />}
          sx={iconColor}
          component={Link}
          to="/relatorio-financeiro"
        />
        <BottomNavigationAction
          label="Cadastro"
          icon={<PersonAddAlt1Icon />}
          sx={iconColor}
          component={Link}
          to="/cadastro/funcionarios"
        />
        <BottomNavigationAction
          label="Listar"
          icon={<FormatListBulletedIcon />}
          sx={iconColor}
          component={Link}
          to="/listar/funcionarios"
        />
      </BottomNavigation>
    </Box>
  );
}
