import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { Produto } from "../../models/interfaces/Produto";

function RelatorioProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formEdit, setFormEdit] = useState<Partial<Produto>>({});
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const carregarProdutos = async () => {
    try {
      const resposta = await fetch("http://localhost:5190/api/produtos");
      if (!resposta.ok) throw new Error("Erro ao carregar produtos");
      const dados: Produto[] = await resposta.json();
      setProdutos(dados);
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

  useEffect(() => {
    carregarProdutos();
  }, []);

  const dadosPizza = useMemo(() => {
    const contagem = { Critico: 0, Normal: 0, Excesso: 0 };

    produtosFiltrados.forEach((produto) => {
      if (produto.qtdAtual <= produto.qtdMinima) {
        contagem.Critico += 1;
      } else if (produto.qtdAtual >= produto.qtdMaxima) {
        contagem.Excesso += 1;
      } else {
        contagem.Normal += 1;
      }
    });

    return [
      { name: "Crítico", value: contagem.Critico },
      { name: "Normal", value: contagem.Normal },
      { name: "Excesso", value: contagem.Excesso },
    ];
  }, [produtosFiltrados]);

  const produtosPorStatus = useMemo(() => {
  const grupos: Record<string, Produto[]> = {
    Critico: [],
    Normal: [],
    Excesso: [],
  };

  produtosFiltrados.forEach((produto) => {
    if (produto.qtdAtual <= produto.qtdMinima) {
      grupos.Critico.push(produto);
    } else if (produto.qtdAtual >= produto.qtdMaxima) {
      grupos.Excesso.push(produto);
    } else {
      grupos.Normal.push(produto);
    }
  });

  return grupos;
}, [produtosFiltrados]);


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



  const handleChangeEdit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormEdit((prev: Partial<Produto>) => ({
      ...prev,
      [name]: name.startsWith("qtd") ? Number(value) : value,
    }));
  };

  

  if (carregando) return <div className="form-container">Carregando...</div>;

  return (
    <div className="form-container">
      <div className="form-header">
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
                  produto.qtdAtual <= produto.qtdMinima
                    ? "Crítico"
                    : produto.qtdAtual >= produto.qtdMaxima
                    ? "Excesso"
                    : "Normal";

                return (
                  <tr
                    key={produto.id}
                    className={editandoId === produto.id ? "editing-row" : ""}
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
                          <button
                            onClick={cancelarEdicao}
                            className="cancel-btn"
                          >
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
                            className={`status-badge ${
                              produto.qtdAtual <= produto.qtdMinima
                                ? "critical"
                                : produto.qtdAtual >= produto.qtdMaxima
                                ? "excess"
                                : "normal"
                            }`}
                          >
                            {statusEstoque}
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Gráfico de barras */}
        {produtosFiltrados.length > 0 && (
          <div style={{ width: "100%", height: 400, marginTop: "2rem" }}>
            <h3>Gráfico de Estoque dos Produtos</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={produtosFiltrados}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="qtdAtual" fill="#8884d8" name="Qtd Atual" />
                <Bar dataKey="qtdMinima" fill="#ff7300" name="Qtd Mínima" />
                <Bar dataKey="qtdMaxima" fill="#82ca9d" name="Qtd Máxima" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Gráfico de pizza */}
        {produtosFiltrados.length > 0 && (
          <div style={{ width: "100%", height: 400, marginTop: "2rem" }}>
            <h3>Distribuição do Estoque</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosPizza}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#ff7875" /> {/* Crítico */}
                  <Cell fill="#95de64" /> {/* Normal */}
                  <Cell fill="#69c0ff" /> {/* Excesso */}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
        )}
        <div style={{ marginTop: "1rem" }}>
  <h4>Detalhes por Status</h4>
  <div style={{ display: "flex", justifyContent: "space-around" }}>
    {/* Crítico */}
    <div>
      <h5 style={{ color: "#ff7875" }}>Crítico ({produtosPorStatus.Critico.length})</h5>
      <ul>
        {produtosPorStatus.Critico.map((p) => (
          <li key={p.id}>{p.nome}</li>
        ))}
      </ul>
    </div>
    {/* Normal */}
    <div>
      <h5 style={{ color: "#95de64" }}>Normal ({produtosPorStatus.Normal.length})</h5>
      <ul>
        {produtosPorStatus.Normal.map((p) => (
          <li key={p.id}>{p.nome}</li>
        ))}
      </ul>
    </div>
    {/* Excesso */}
    <div>
      <h5 style={{ color: "#69c0ff" }}>Excesso ({produtosPorStatus.Excesso.length})</h5>
      <ul>
        {produtosPorStatus.Excesso.map((p) => (
          <li key={p.id}>{p.nome}</li>
        ))}
      </ul>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}

export default RelatorioProdutos;
