import { useEffect, useState } from "react";
import type { Pedido } from "../../models/interfaces/Pedido";
import React from "react";
import { DeletarPedido } from "./DeletarPedido";

const ListarPedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<number | null>(
    null,
  );
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formEdit, setFormEdit] = useState<Partial<Pedido>>({});

  const selecionarItens = (id: number, idSelecionado: number) => {
    setPedidoSelecionado(id === idSelecionado ? null : id);
  };

  const carregarPedidos = async () => {
    try {
      const resposta = await fetch("http://localhost:5190/api/pedidos");
      if (!resposta.ok) throw new Error("Erro ao carregar pedidos");
      const dados: Pedido[] = await resposta.json();
      setPedidos(dados);
    } catch (erro) {
      console.error("Erro ao carregar pedidos:", erro);
      alert("Erro ao carregar pedidos");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const iniciarEdicao = (pedido: Pedido) => {
    setEditandoId(pedido.id);
    setFormEdit({
      estaAtivo: pedido.estaAtivo,
      estaPago: pedido.estaPago,
    });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormEdit({});
  };

  const salvarEdicao = async (id: number) => {
    const pedidoOriginal = pedidos.find((p) => p.id === id);
    if (!pedidoOriginal) return;

    const pedidoAtualizado: Pedido = {
      ...pedidoOriginal,
      ...formEdit,
    };

    try {
      const resposta = await fetch(`http://localhost:5190/api/pedidos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoAtualizado),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(erro);
      }

      await carregarPedidos();
      setEditandoId(null);
    } catch (erro) {
      console.error("Erro ao atualizar pedido:", erro);
      alert("Erro ao atualizar pedido");
    }
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormEdit((prev) => ({
      ...prev,
      [name]: value === "1",
    }));
  };

  const deletarPedido = async (id: number) => {
    await DeletarPedido(id);
    carregarPedidos();
  };

  if (carregando) return <div>Carregando...</div>;

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Lista de Pedidos</h2>
      </div>
      <div className="form-content">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Itens</th>
              <th>Ativo</th>
              <th>Pago</th>
              <th>Total</th>
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
                  <tr className={editandoId === pedido.id ? "editing-row" : ""}>
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
                    {editandoId === pedido.id ? (
                      <>
                        <td>
                          <select
                            name="estaAtivo"
                            value={formEdit.estaAtivo ? "1" : "0"}
                            onChange={handleChangeEdit}>
                            <option value="1">Sim</option>
                            <option value="0">Não</option>
                          </select>
                        </td>
                        <td>
                          <select
                            name="estaPago"
                            value={formEdit.estaPago ? "1" : "0"}
                            onChange={handleChangeEdit}>
                            <option value="1">Sim</option>
                            <option value="0">Não</option>
                          </select>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{pedido.estaAtivo ? "Sim" : "Não"}</td>
                        <td>{pedido.estaPago ? "Sim" : "Não"}</td>
                      </>
                    )}
                    <td>R$ {pedido.valorTotal.toFixed(2)}</td>
                    <td className="action-buttons">
                      {editandoId === pedido.id ? (
                        <>
                          <button
                            onClick={() => salvarEdicao(pedido.id)}
                            className="save-btn">
                            Salvar
                          </button>
                          <button
                            onClick={cancelarEdicao}
                            className="cancel-btn">
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => iniciarEdicao(pedido)}
                            className="edit-btn">
                            Editar
                          </button>
                          <button
                            onClick={() => deletarPedido(pedido.id)}
                            className="delete-btn">
                            Deletar
                          </button>
                        </>
                      )}
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
                              pedido.itens.map((item, i) => (
                                <tr key={i}>
                                  <td>{item.item?.nome ?? "N/A"}</td>
                                  <td>
                                    R$ {item.item?.valor?.toFixed(2) ?? "0.00"}
                                  </td>
                                  <td>{item.quantidade ?? 0}</td>
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
