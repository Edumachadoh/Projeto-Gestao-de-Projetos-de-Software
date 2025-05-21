import { Outlet } from "react-router";
import SidebarListar from "../../components/sidebars/SidebarListar";

const ListarFuncionarios = () => {
  return (
    <div>
      <SidebarListar />
      <Outlet />
    </div>
  );
};

export default ListarFuncionarios;
