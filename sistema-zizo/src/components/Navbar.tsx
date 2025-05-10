import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
          label="Recents"
          icon={<RestoreIcon />}
          sx={iconColor}
        />
        <BottomNavigationAction
          label="Recents"
          icon={<FavoriteIcon />}
          sx={iconColor}
        />
        <BottomNavigationAction
          label="Recents"
          icon={<LocationOnIcon />}
          sx={iconColor}
        />
      </BottomNavigation>
    </Box>
  );
}
