import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BadgeIcon from "@mui/icons-material/Badge";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Link } from "react-router-dom";

interface SidebarProps {
  type: string;
}

const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  const list = () => (
    <Box sx={{ width: 200, display: "" }} role="presentation">
      <List>
        <ListItem component={Link} to={`/${type}/funcionario`}>
          <ListItemButton>
            <ListItemIcon>
              <BadgeIcon />
            </ListItemIcon>
            <ListItemText primary="Funcionários" />
          </ListItemButton>
        </ListItem>
        <ListItem component={Link} to={`/${type}/pedido`}>
          <ListItemButton>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
          </ListItemButton>
        </ListItem>
        <ListItem component={Link} to={`/${type}/cliente`}>
          <ListItemButton>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
          </ListItemButton>
        </ListItem>
        <ListItem component={Link} to={`/${type}/produto`}>
          <ListItemButton>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Produtos" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "56px",
        left: "0",
      }}>
      {list()}
    </div>
  );
};

export default Sidebar;
