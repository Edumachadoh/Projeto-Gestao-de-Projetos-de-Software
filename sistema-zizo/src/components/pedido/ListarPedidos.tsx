import { useEffect, useState } from "react";
import type { Pedido } from "../../models/interfaces/Pedido";
import React from "react";
import type { Item } from "../../models/interfaces/Item";
import { DeletarPedido } from "./DeletarPedido";
import EditarPedido from "./EditarPedido";

const ListarPedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<number | null>(
    null,
  );
  const [mostrarEditar, setMostrarEditar] = useState(false);

  const statusPreparoMap: { [key: number]: string } = {
    0: "A Fazer",
    1: "Fazendo",
    2: "Feito",
    3: "Entregue",
  };

  const selecionarItens = (id: number, idSelecionado: number) => {
    if (id === idSelecionado) {
      setPedidoSelecionado(null);
    } else {
      setPedidoSelecionado(id);
    }
  };

  const carregarPedidos = async () => {
    try {
      const resposta = await fetch("http://localhost:5190/api/pedidos");
      if (!resposta.ok) throw new Error("Erro ao carregar pedidos");
      const dados: Pedido[] = await resposta.json();
      console.log(dados);
      setPedidos(dados);
    } catch (erro: any) {
      console.error("Erro ao carregar pedidos:", erro);
      alert("Erro ao carregar pedidos");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Lista de Pedidos</h2>
      </div>
      <div className="form-content">
        <table className="styled-table">
          <thead>
            <tr>
              <th>id</th>
              <th>cliente</th>
              <th>data</th>
              <th>itens</th>
              <th>Status</th>
              <th>valorTotal</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length === 0 ? (
              <tr>
                <td colSpan={7} className="no-data">
                  Nenhum pedido cadastrado
                </td>
              </tr>
            ) : (
              pedidos.map((pedido) => (
                <React.Fragment key={pedido.id}>
                  <tr>
                    <td>{pedido.id}</td>
                    <td>{pedido.cliente?.nome ?? "N/A"}</td>
                    <td>
                      {pedido.data
                        ? new Date(pedido.data).toLocaleDateString()
                        : "Data não disponível"}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          selecionarItens(pedido.id, pedidoSelecionado ?? -1)
                        }>
                        {pedido.id === pedidoSelecionado
                          ? "Ocultar Itens"
                          : "Ver Itens"}
                      </button>
                    </td>
                    <td>{statusPreparoMap[Number(pedido.statusPreparo)]}</td>
                    <td>
                      {pedido.valorTotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => setMostrarEditar(true)}>
                        Editar
                      </button>
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
                            <EditarPedido _pedido={pedido} _id={pedido.id} />
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => DeletarPedido(pedido.id)}
                        className="delete-btn">
                        Deletar
                      </button>
                    </td>
                  </tr>
                  {pedido.id === pedidoSelecionado && (
                    <tr>
                      <td colSpan={7}>
                        <strong>Itens do pedido:</strong>
                        <ul>
                          {pedido.itens.length !== 0 ? (
                            pedido.itens.map((item: Item, index) => (
                              <li key={index}>
                                {item.nome ?? "Produto sem nome"} - id:
                                {item.id}
                              </li>
                            ))
                          ) : (
                            <li>Nenhum item encontrado</li>
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

export default ListarPedidos;
