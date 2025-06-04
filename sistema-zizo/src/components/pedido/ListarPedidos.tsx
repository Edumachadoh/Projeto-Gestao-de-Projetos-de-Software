import { useEffect, useState } from "react";
import type { Pedido } from "../../models/interfaces/Pedido";
import React from "react";
import { DeletarPedido } from "./DeletarPedido";
// import EditarPedido from "./EditarPedido"; // descomente se estiver pronto

const ListarPedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<number | null>(
    null,
  );
  const [editarPedidoId, setEditarPedidoId] = useState<number | null>(null);

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
      setPedidos(dados);
      console.log("Pedidos carregados:", dados);
    } catch (erro: any) {
      console.error("Erro ao carregar pedidos:", erro);
      alert("Erro ao carregar pedidos");
    } finally {
      setCarregando(false);
    }
  };

  const deletarPedido = async (id: number) => {
    await DeletarPedido(id);
    carregarPedidos(); // Atualiza a lista
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
              <th>Está ativo</th>
              <th>Está Pago</th>
              <th>valorTotal</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length === 0 ? (
              <tr>
                <td colSpan={8} className="no-data">
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
                    <td>{pedido.estaAtivo ? "Sim" : "Não"}</td>
                    <td>{pedido.estaPago ? "Sim" : "Não"}</td>
                    <td>R$ {pedido.valorTotal.toFixed(2)}</td>
                    <td className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => setEditarPedidoId(pedido.id)}>
                        Editar
                      </button>
                      {editarPedidoId === pedido.id && (
                        <div
                          className="edit"
                          style={{
                            display: "flex",
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                            zIndex: 1000,
                          }}>
                          <div className="edit-content">
                            {/* Descomente e implemente o componente abaixo quando pronto */}
                            {/* <EditarPedido _pedido={pedido} _id={pedido.id} /> */}
                            <button onClick={() => setEditarPedidoId(null)}>
                              Fechar
                            </button>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => deletarPedido(pedido.id)}
                        className="delete-btn">
                        Deletar
                      </button>
                    </td>
                  </tr>

                  {pedido.id === pedidoSelecionado && (
                    <tr>
                      <td colSpan={8}>
                        <strong>Itens do pedido:</strong>
                        <table className="subtable">
                          <thead>
                            <tr>
                              <th>Nome</th>
                              <th>Valor</th>
                              <th>Quantidade</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pedido.itens && pedido.itens.length > 0 ? (
                              pedido.itens.map((itemPedido, index) => (
                                <tr key={index}>
                                  <td>
                                    {itemPedido.item?.nome ??
                                      "Produto sem nome"}
                                  </td>
                                  <td>
                                    R${" "}
                                    {itemPedido.item?.valor?.toFixed(2) ??
                                      "0.00"}
                                  </td>
                                  <td>{itemPedido.quantidade ?? 0}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={3}>Nenhum item encontrado</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
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
