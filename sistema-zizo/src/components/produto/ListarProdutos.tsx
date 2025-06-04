import { useState, useEffect, useMemo } from "react";
import type { Produto } from "../../models/interfaces/Produto";

function ListarProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formEdit, setFormEdit] = useState<Partial<Produto>>({});
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [mostrarNotificacao, setMostrarNotificacao] = useState(false);
  const [mostrarProdutosCriticos, setMostrarProdutosCriticos] = useState(false);

  const carregarProdutos = async () => {
    try {
      const resposta = await fetch("http://localhost:5190/api/produtos");
      if (!resposta.ok) throw new Error("Erro ao carregar produtos");
      const dados: Produto[] = await resposta.json();
      setProdutos(dados);
      
      const temProdutosCriticos = dados.some(p => p.qtdAtual < p.qtdMinima);
      setMostrarNotificacao(temProdutosCriticos);
    } catch (erro) {
      console.error("Erro ao carregar produtos:", erro);
      alert("Erro ao carregar produtos");
    } finally {
      setCarregando(false);
    }
  };

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
  }, [produtos, termoPesquisa]);

  const produtosCriticos = useMemo(() => {
    return produtos.filter(produto => produto.qtdAtual < produto.qtdMinima);
  }, [produtos]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const iniciarEdicao = (produto: Produto) => {
    if (typeof produto.id !== "number") return;
    setEditandoId(produto.id);
    setFormEdit({
      id: produto.id,
      nome: produto.nome,
      qtdMinima: produto.qtdMinima,
      qtdMaxima: produto.qtdMaxima,
      qtdAtual: produto.qtdAtual,
    });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormEdit({});
  };

  const salvarEdicao = async () => {
    if (editandoId === null) return;

    try {
      const produtoAtual = produtos.find((p) => p.id === editandoId);
      if (!produtoAtual) {
        throw new Error("Produto não encontrado na lista local");
      }

      const dadosParaEnviar: Produto = {
        id: editandoId,
        nome: formEdit.nome ?? produtoAtual.nome,
        qtdMinima: formEdit.qtdMinima ?? produtoAtual.qtdMinima,
        qtdMaxima: formEdit.qtdMaxima ?? produtoAtual.qtdMaxima,
        qtdAtual: formEdit.qtdAtual ?? produtoAtual.qtdAtual,
      };

      const resposta = await fetch(
        `http://localhost:5190/api/produtos/att/${editandoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnviar),
        }
      );

      if (!resposta.ok) {
        const errorData = await resposta.json().catch(() => null);
        console.error("Detalhes do erro da API:", errorData);
        throw new Error(errorData?.message || "Erro ao atualizar produto");
      }

      await carregarProdutos();
      setEditandoId(null);
      alert("Produto atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro ao editar produto:", erro);
      alert(
        erro instanceof Error ? erro.message : "Erro desconhecido ao atualizar"
      );
    }
  };

  const deletarProduto = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja deletar este produto?"))
      return;

    try {
      const resposta = await fetch(
        `http://localhost:5190/api/produtos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!resposta.ok) throw new Error("Erro ao deletar produto");

      await carregarProdutos();
      alert("Produto deletado com sucesso!");
    } catch (erro) {
      console.error("Erro ao deletar produto:", erro);
      alert("Erro ao deletar produto");
    }
  };

  const handleChangeEdit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
    const { name, value } = e.target;
    setFormEdit((prev: Partial<Produto>) => ({
        ...prev,
        [name]: name.startsWith("qtd") ? Number(value) : value,
    }));
    };

  const handleDeletar = (produto: Produto) => {
    if (typeof produto.id !== "number") return;
    deletarProduto(produto.id);
  };

  const toggleProdutosCriticos = () => {
    setMostrarProdutosCriticos(!mostrarProdutosCriticos);
  };

  if (carregando) return <div className="form-container">Carregando...</div>;

  return (
    <div className="form-container">
      {mostrarNotificacao && (
        <div className="notification-badge" onClick={toggleProdutosCriticos}>
          ⚠️ {produtosCriticos.length} {produtosCriticos.length === 1 ? 'Produto' : 'Produtos'} com estoque crítico!

        </div>
      )}

      {mostrarProdutosCriticos && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff8dc',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          zIndex: 1000,
          width: '400px',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <h3 style={{margin: 0}}>Produtos com Estoque Crítico</h3>
            <button 
              onClick={toggleProdutosCriticos}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              X
            </button>
          </div>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{backgroundColor: '#FFA500'}}>
                <th style={{padding: '8px', textAlign: 'left'}}>Nome</th>
                <th style={{padding: '8px', textAlign: 'left'}}>Mínimo</th>
                <th style={{padding: '8px', textAlign: 'left'}}>Atual</th>
              </tr>
            </thead>
            <tbody>
              {produtosCriticos.map((produto) => (
                <tr key={produto.id} style={{borderBottom: '1px solid #ddd'}}>
                  <td style={{padding: '8px'}}>{produto.nome}</td>
                  <td style={{padding: '8px'}}>{produto.qtdMinima}</td>
                  <td style={{padding: '8px', color: '#FF0000', fontWeight: 'bold'}}>
                    {produto.qtdAtual}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="form-header" style={{ marginTop: "32px"}}>
        <h2>Lista de Produtos</h2>
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
              <th>Nome</th>
              <th>Qtd. Mínima</th>
              <th>Qtd. Máxima</th>
              <th>Qtd. Atual</th>
              <th>Status Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="no-data">
                  {termoPesquisa
                    ? "Nenhum produto encontrado com esse nome"
                    : "Nenhum produto cadastrado"}
                </td>
              </tr>
            ) : (
              produtosFiltrados.map((produto) => {
                const statusEstoque =
                  produto.qtdAtual < produto.qtdMinima
                    ? "Crítico"
                    : produto.qtdAtual >= produto.qtdMaxima
                    ? "Excesso"
                    : "Normal";

                return (
                  <tr
                    key={produto.id}
                    className={`
                      ${editandoId === produto.id ? "editing-row" : ""}
                      ${produto.qtdAtual < produto.qtdMinima ? "critical-row" : ""}
                    `}
                  >
                    {editandoId === produto.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            name="nome"
                            value={formEdit.nome || ""}
                            onChange={handleChangeEdit}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="qtdMinima"
                            value={formEdit.qtdMinima || 0}
                            onChange={handleChangeEdit}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="qtdMaxima"
                            value={formEdit.qtdMaxima || 0}
                            onChange={handleChangeEdit}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="qtdAtual"
                            value={formEdit.qtdAtual || 0}
                            onChange={handleChangeEdit}
                            className="table-input"
                          />
                        </td>
                        <td className="non-editable">{statusEstoque}</td>
                        <td className="action-buttons">
                          <button onClick={salvarEdicao} className="save-btn">
                            Salvar
                          </button>
                          <button onClick={cancelarEdicao} className="cancel-btn">
                            Cancelar
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{produto.nome}</td>
                        <td>{produto.qtdMinima}</td>
                        <td>{produto.qtdMaxima}</td>
                        <td>{produto.qtdAtual}</td>
                        <td>
                          <span
                            style={
                              statusEstoque === "Crítico"
                                ? { color: "red", fontWeight: "bold" }
                                : {}
                            }
                          >
                            {statusEstoque}
                          </span>
                        </td>
                        <td className="action-buttons">
                          <button
                            onClick={() => iniciarEdicao(produto)}
                            className="edit-btn"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeletar(produto)}
                            className="delete-btn"
                          >
                            Deletar
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListarProdutos;