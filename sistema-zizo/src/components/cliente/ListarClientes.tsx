import React, { useEffect, useMemo, useState } from "react";
import { DeletarCliente } from "./DeletarCliente";
import type { Cliente } from "../../models/interfaces/Cliente";
import type { Pedido } from "../../models/interfaces/Pedido";
import { Link, Outlet } from "react-router";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { Box } from "@mui/material";

interface ListarClientesProps {
  modoSelecao?: boolean;
  onSelecionarCliente?: (cliente: Cliente) => void;
}

const ListarClientes: React.FC<ListarClientesProps> = ({
  modoSelecao = false,
  onSelecionarCliente,
}) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [clienteSelecionado, setClienteSelecionado] = useState<number | null>(
    null,
  );
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [quantidades, setQuantidades] = useState<
    Record<number, Record<number, number>>
  >({});

  const getGaugeColor = (pontos: number) => {
    if (pontos >= 200) {
      return "#52b202";
    } else if (pontos > 50) {
      return "#f0ad4e";
    } else {
      return "#d9534f";
    }
  };

  const selecionarItens = (id: number, idSelecionado: number) => {
    setClienteSelecionado(id === idSelecionado ? null : id);
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

  const clientesFiltrados = useMemo(() => {
    return clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(termoPesquisa.toLowerCase()),
    );
  }, [clientes, termoPesquisa]);

  const handleQuantidadeChange = (
    clienteId: number,
    pedidoId: number,
    novaQuantidade: number,
  ) => {
    setQuantidades((prev) => ({
      ...prev,
      [clienteId]: {
        ...prev[clienteId],
        [pedidoId]: novaQuantidade,
      },
    }));
  };

  if (carregando) return <div className="form-container">Carregando...</div>;

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{modoSelecao ? "Selecione um Cliente" : "Lista de Clientes"}</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar por nome..."
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            className="search-input"
          />
        </div>
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
              <th>Pontos</th>
              {!modoSelecao && <th>Pedidos</th>}
              <th>{modoSelecao ? "Selecionar" : "Ações"}</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={modoSelecao ? 7 : 8} className="no-data">
                  {termoPesquisa
                    ? "Nenhum cliente encontrado com esse nome"
                    : "Nenhum cliente cadastrado"}
                </td>
              </tr>
            ) : (
              clientesFiltrados.map((cliente) => (
                <React.Fragment key={cliente.id}>
                  <tr>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>
                      {new Date(cliente.dataNascimento).toLocaleDateString()}
                    </td>
                    <td>{cliente.telefone}</td>
                    <td>
                      <Box
                        position="relative"
                        display="inline-flex"
                        justifyContent="center">
                        <Gauge
                          width={80}
                          height={80}
                          value={(cliente.pontosFidelidade / 500) * 100} // valor convertido de 0–500 para 0–100%
                          cornerRadius="50%"
                          sx={{
                            [`& .${gaugeClasses.valueArc}`]: {
                              fill: getGaugeColor(cliente.pontosFidelidade),
                            },
                            [`& .${gaugeClasses.valueText}`]: {
                              display: "none", // oculta o valor original
                            },
                          }}
                        />
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          width="100%"
                          height="100%"
                          display="flex"
                          alignItems="center"
                          justifyContent="center">
                          <span style={{ fontSize: 14, fontWeight: "bold" }}>
                            {cliente.pontosFidelidade}
                          </span>
                        </Box>
                      </Box>
                    </td>

                    {!modoSelecao && (
                      <td>
                        <button
                          onClick={() =>
                            selecionarItens(
                              cliente.id,
                              clienteSelecionado ?? -1,
                            )
                          }
                          className="table-input">
                          {cliente.id === clienteSelecionado
                            ? "Ocultar"
                            : "Ver Pedidos"}
                        </button>
                      </td>
                    )}

                    <td className="action-buttons">
                      {modoSelecao ? (
                        <button
                          className="table-input"
                          onClick={() => onSelecionarCliente?.(cliente)}>
                          Selecionar
                        </button>
                      ) : (
                        <>
                          <Link to={`/listar/cliente/editar/${cliente.id}`}>
                            <button
                              className="edit-btn"
                              onClick={() => setMostrarEditar(true)}>
                              Editar
                            </button>
                          </Link>
                          <button
                            onClick={() => DeletarCliente(cliente.id)}
                            className="delete-btn">
                            Deletar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>

                  {cliente.id === clienteSelecionado && !modoSelecao && (
                    <tr className="editing-row">
                      <td colSpan={8}>
                        <div className="pedido-lista">
                          <strong>Pedidos:</strong>
                          {cliente.pedidos.length > 0 ? (
                            <ul>
                              {cliente.pedidos.map((pedido: Pedido, index) => (
                                <li key={index} className="pedido-item">
                                  Pedido ID: {pedido.id} - Quantidade:
                                  <input
                                    type="number"
                                    min={1}
                                    value={
                                      quantidades[cliente.id]?.[pedido.id] ?? 1
                                    }
                                    onChange={(e) =>
                                      handleQuantidadeChange(
                                        cliente.id,
                                        pedido.id,
                                        parseInt(e.target.value),
                                      )
                                    }
                                    className="table-input"
                                    style={{
                                      width: "60px",
                                      marginLeft: "10px",
                                    }}
                                  />
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>Nenhum pedido encontrado.</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {mostrarEditar && (
        <div className="edit-overlay">
          <div className="edit-content">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarClientes;
