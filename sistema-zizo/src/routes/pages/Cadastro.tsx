import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar";

const Cadastro = () => {
  return (
    <div>
      <Sidebar type="cadastro" />
      <Outlet />
    </div>
  );
};

export default Cadastro;
