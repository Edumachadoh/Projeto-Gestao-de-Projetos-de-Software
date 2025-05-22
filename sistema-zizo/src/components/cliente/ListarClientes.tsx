import { useEffect, useState } from "react";
import React from "react";
import { DeletarCliente } from "./DeletarCliente";
import type { Cliente } from "../../models/interfaces/Cliente";
import type { Pedido } from "../../models/interfaces/Pedido";
import { Link, Outlet } from "react-router";

const ListarClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [clienteSelecionado, setClienteSelecionado] = useState<number | null>(
    null,
  );
  const [mostrarEditar, setMostrarEditar] = useState(false);

  const selecionarItens = (id: number, idSelecionado: number) => {
    if (id === idSelecionado) {
      setClienteSelecionado(null);
    } else {
      setClienteSelecionado(id);
    }
  };

  const carregarClientes = async () => {
    try {
      const resposta = await fetch("http://localhost:5190/api/clientes");
      if (!resposta.ok) throw new Error("Erro ao carregar clientes");
      const dados: Cliente[] = await resposta.json();
      setClientes(dados);
    } catch (erro: any) {
      console.error("Erro ao carregar clientes:", erro);
      alert("Erro ao carregar clientes");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  if (carregando) {
    return <div className="form-container">Carregando...</div>;
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Lista de Clientes</h2>
      </div>
      <div className="form-content">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data Nascimento</th>
              <th>Telefone</th>
              <th>Pontos Fidelidade</th>
              <th>Pedidos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={8} className="no-data">
                  Nenhum cliente cadastrado
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <React.Fragment key={cliente.id}>
                  <tr>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>
                      {new Date(cliente.dataNascimento).toLocaleDateString()}
                    </td>
                    <td>{cliente.telefone}</td>
                    <td>{cliente.pontosFidelidade}</td>
                    <td>
                      <button
                        onClick={() =>
                          selecionarItens(cliente.id, clienteSelecionado ?? -1)
                        }
                        className="table-input">
                        {cliente.id === clienteSelecionado
                          ? "Ocultar Pedidos"
                          : "Ver Pedidos"}
                      </button>
                    </td>
                    <td className="action-buttons">
                      <Link to={`/listar/cliente/editar/${cliente.id}`}>
                        <button
                          className="edit-btn"
                          onClick={() => setMostrarEditar(true)}>
                          Editar
                        </button>
                      </Link>
                      {mostrarEditar && (
                        <div
                          className="edit"
                          style={{
                            display: "flex",
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}>
                          <div className="edit-content">
                            <Outlet />
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => DeletarCliente(cliente.id)}
                        className="delete-btn">
                        Deletar
                      </button>
                    </td>
                  </tr>
                  {cliente.id === clienteSelecionado && (
                    <tr>
                      <td colSpan={8}>
                        <strong>Itens do pedido:</strong>
                        <ul>
                          {cliente.pedidos.length !== 0 ? (
                            cliente.pedidos.map((pedido: Pedido, index) => (
                              <li key={index}>
                                {pedido.id ?? "Produto sem nome"} - id:
                                {pedido.id}
                              </li>
                            ))
                          ) : (
                            <li>Nenhum pedido encontrado</li>
                          )}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarClientes;
