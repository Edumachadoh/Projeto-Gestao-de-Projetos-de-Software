import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./routes/pages/Home.tsx";
import RelatorioFinanceiro from "./routes/pages/RelatorioFinanceiro.tsx";
import Cadastro from "./routes/pages/Cadastro.tsx";
import ListarFuncionarios from "./routes/pages/Listar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/relatorio-financeiro",
        element: <RelatorioFinanceiro />,
      },
      {
        path: "/cadastro",
        element: <Cadastro />,
      },
      {
        path: "/funcionarios",
        element: < ListarFuncionarios/>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
