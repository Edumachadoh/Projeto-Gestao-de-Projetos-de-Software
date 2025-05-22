import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./routes/pages/Home.tsx";
import RelatorioFinanceiro from "./routes/pages/RelatorioFinanceiro.tsx";
import Cadastro from "./routes/pages/Cadastro.tsx";
import Pedido from "./routes/pages/Pedido.tsx";
import Listar from "./routes/pages/Listar.tsx";
import ListarFuncionarios from "./components/funcionario/ListarFuncionarios.tsx";
import ListarPedidos from "./components/pedido/ListarPedidos.tsx";
import CadastroPedido from "./components/pedido/CadastroPedido.tsx";
import CadastroFuncionario from "./components/funcionario/CadastroFuncionario.tsx";
import CadastroCliente from "./components/cliente/CadastroCliente.tsx";

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
        children: [
          {
            path: "/cadastro/funcionario",
            element: <CadastroFuncionario />,
          },
          {
            path: "/cadastro/pedido",
            element: <CadastroPedido />,
          },
          {
            path: "/cadastro/cliente",
            element: <CadastroCliente />,
          },
        ],
      },
      {
        path: "/listar",
        element: <Listar />,
        children: [
          {
            path: "/listar/funcionario",
            element: <ListarFuncionarios />,
          },
          {
            path: "/listar/pedido",
            element: <ListarPedidos />,
          },
        ],
      },
      {
        path: "/pedido",
        element: <Pedido />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
