import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar";

const Listar = () => {
  return (
    <div>
      <Sidebar type="listar" />
      <Outlet />
    </div>
  );
};

export default Listar;
