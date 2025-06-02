import { useEffect, useMemo, useState } from "react";
import React from "react";
import type { Item } from "../../models/interfaces/Item";
import { Link, Outlet } from "react-router";
import { DeletarItem } from "./DeletarItem";

interface ItemSelecionado {
  item: Item;
  quantidade: number;
}

interface ListarItensProps {
  modoSelecao?: boolean;
  itensSelecionados?: ItemSelecionado[];
  aoSelecionarItens?: (itens: ItemSelecionado[]) => void;
}

const ListarItens = ({
  modoSelecao = false,
  itensSelecionados = [],
  aoSelecionarItens,
}: ListarItensProps) => {
  const [itens, setItens] = useState<Item[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [selecionados, setSelecionados] =
    useState<ItemSelecionado[]>(itensSelecionados);

  const carregarItens = async () => {
    try {
      const resposta = await fetch("http://localhost:5190/api/itens");
      if (!resposta.ok) throw new Error("Erro ao carregar itens");
      const dados: Item[] = await resposta.json();
      setItens(dados);
    } catch (erro: any) {
      console.error("Erro ao carregar itens:", erro);
      alert("Erro ao carregar itens");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarItens();
  }, []);

  const itensFiltrados = useMemo(() => {
    return itens.filter((item) =>
      item.nome.toLowerCase().includes(termoPesquisa.toLowerCase()),
    );
  }, [itens, termoPesquisa]);

  const alterarQuantidade = (item: Item, novaQtd: number) => {
    if (novaQtd < 1) {
      removerItem(item);
      return;
    }

    const atualizado = selecionados.map((sel) =>
      sel.item.id === item.id ? { ...sel, quantidade: novaQtd } : sel,
    );
    setSelecionados(atualizado);
    aoSelecionarItens?.(atualizado);
  };

  const alternarSelecao = (item: Item) => {
    const existe = selecionados.find((sel) => sel.item.id === item.id);
    let atualizados: ItemSelecionado[];

    if (existe) {
      atualizados = selecionados.filter((sel) => sel.item.id !== item.id);
    } else {
      atualizados = [...selecionados, { item, quantidade: 1 }];
    }

    setSelecionados(atualizados);
    aoSelecionarItens?.(atualizados);
  };

  const removerItem = (item: Item) => {
    const atualizados = selecionados.filter((sel) => sel.item.id !== item.id);
    setSelecionados(atualizados);
    aoSelecionarItens?.(atualizados);
  };

  const getQuantidade = (id: number) => {
    return selecionados.find((sel) => sel.item.id === id)?.quantidade || 0;
  };

  if (carregando) {
    return <div className="form-container">Carregando...</div>;
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{modoSelecao ? "Selecionar Itens" : "Lista de Itens"}</h2>
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
              <th>Valor</th>
              <th>{modoSelecao ? "Quantidade" : "Ações"}</th>
            </tr>
          </thead>
          <tbody>
            {itensFiltrados.length === 0 ? (
              <tr>
                <td colSpan={4} className="no-data">
                  {termoPesquisa
                    ? "Nenhum item encontrado com esse nome"
                    : "Nenhum item cadastrado"}
                </td>
              </tr>
            ) : (
              itensFiltrados.map((item) => {
                const selecionado = selecionados.find(
                  (sel) => sel.item.id === item.id,
                );
                return (
                  <React.Fragment key={item.id}>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.nome}</td>
                      <td>{item.valor}</td>
                      <td className="action-buttons">
                        {modoSelecao ? (
                          <>
                            <button
                              onClick={() => alternarSelecao(item)}
                              className={"table-input"}>
                              {selecionado ? "Remover" : "Selecionar"}
                            </button>
                            {selecionado && (
                              <input
                                type="number"
                                min={1}
                                value={selecionado.quantidade}
                                onChange={(e) =>
                                  alterarQuantidade(
                                    item,
                                    parseInt(e.target.value),
                                  )
                                }
                                style={{ width: "60px", marginLeft: "10px" }}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            <Link to={`/listar/item/editar/${item.id}`}>
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
                              onClick={() => DeletarItem(item.id)}
                              className="delete-btn">
                              Deletar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarItens;
