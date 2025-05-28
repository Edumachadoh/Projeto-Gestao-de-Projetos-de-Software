import "./css/App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

function App() {
  return (
    <div>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
