import { useState, useEffect, useMemo } from "react";
import type { Funcionario } from "../../models/interfaces/Funcionario";
import { Cargo } from "../../models/enums/Cargo";

const getNomeCargo = (valorCargo: Cargo): string => {
  const entry = Object.entries(Cargo).find(
    ([_, value]) => value === valorCargo,
  );
  return entry?.[0] || "Desconhecido";
};

function ListaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formEdit, setFormEdit] = useState<Partial<Funcionario>>({});
  const [termoPesquisa, setTermoPesquisa] = useState(""); 


  const carregarFuncionarios = async () => {
    try {
      const resposta = await fetch("http://localhost:5190/api/funcionarios");
      if (!resposta.ok) throw new Error("Erro ao carregar funcionários");
      const dados: Funcionario[] = await resposta.json();
      setFuncionarios(dados);
    } catch (erro) {
      console.error("Erro ao carregar funcionários:", erro);
      alert("Erro ao carregar funcionários");
    } finally {
      setCarregando(false);
    }
  };

  const funcionariosFiltrados = useMemo(() => {
    return funcionarios.filter((funcionario) =>
      funcionario.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
  }, [funcionarios, termoPesquisa]);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const iniciarEdicao = (funcionario: Funcionario) => {
    if (typeof funcionario.id !== "number") return;
    setEditandoId(funcionario.id);
    setFormEdit({
      id: funcionario.id,
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      cargo: funcionario.cargo,
      salario: funcionario.salario,
      telefone: funcionario.telefone || "",
      estaAtivo: funcionario.estaAtivo,
      status: funcionario.estaAtivo ? 1 : 0,
    });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormEdit({});
  };

  const salvarEdicao = async () => {
    if (editandoId === null) return;

    try {
      const funcionarioAtual = funcionarios.find((f) => f.id === editandoId);
      if (!funcionarioAtual) {
        throw new Error("Funcionário não encontrado na lista local");
      }

      const telefoneTratado =
        formEdit.telefone === "" ? undefined : formEdit.telefone;

      const dadosParaEnviar: Funcionario = {
        ...funcionarioAtual,
        ...formEdit,
        id: editandoId,
        telefone: telefoneTratado,
      };

      const resposta = await fetch(
        `http://localhost:5190/api/funcionarios/${editandoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnviar),
        },
      );

      if (!resposta.ok) {
        const errorData = await resposta.json().catch(() => null);
        throw new Error(errorData?.message || "Erro ao atualizar funcionário");
      }

      await carregarFuncionarios();
      setEditandoId(null);
      alert("Funcionário atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro ao editar funcionário:", erro);
      alert(
        erro instanceof Error ? erro.message : "Erro desconhecido ao atualizar",
      );
    }
  };
  const deletarFuncionario = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja deletar este funcionário?"))
      return;

    try {
      const resposta = await fetch(
        `http://localhost:5190/api/funcionarios/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!resposta.ok) throw new Error("Erro ao deletar funcionário");

      await carregarFuncionarios();
      alert("Funcionário deletado com sucesso!");
    } catch (erro) {
      console.error("Erro ao deletar funcionário:", erro);
      alert("Erro ao deletar funcionário");
    }
  };

  const handleChangeEdit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormEdit((prev) => ({
      ...prev,
      [name]:
        name === "cargo"
          ? (Number(value) as Cargo)
          : name === "estaAtivo"
          ? value === "1"
          : name === "salario"
          ? Number(value)
          : value,
    }));
  };

  const handleDeletar = (funcionario: Funcionario) => {
    if (typeof funcionario.id !== "number") return;
    deletarFuncionario(funcionario.id);
  };

  if (carregando) return <div className="form-container">Carregando...</div>;

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Lista de Funcionários</h2>
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
              <th>CPF</th>
              <th>Cargo</th>
              <th>Salário</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="no-data">
                  {termoPesquisa ? 
                    "Nenhum funcionário encontrado com esse nome" : 
                    "Nenhum funcionário cadastrado"}
                </td>
              </tr>
            ) : (
              funcionariosFiltrados.map((funcionario) => (
                <tr
                  key={funcionario.id}
                  className={
                    editandoId === funcionario.id ? "editing-row" : ""
                  }>
                  {editandoId === funcionario.id ? (
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
                      <td className="non-editable">{funcionario.cpf}</td>
                      <td>
                        <select
                          name="cargo"
                          value={formEdit.cargo || Cargo.Balconista}
                          onChange={handleChangeEdit}
                          className="table-input">
                          {Object.entries(Cargo)
                            .filter(([key]) => isNaN(Number(key)))
                            .map(([key, value]) => (
                              <option key={key} value={value}>
                                {key}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          name="salario"
                          value={formEdit.salario || 0}
                          onChange={handleChangeEdit}
                          className="table-input"
                        />
                      </td>
                      <td>
                        <select
                          name="estaAtivo"
                          value={formEdit.estaAtivo ? "1" : "0"}
                          onChange={handleChangeEdit}
                          className="table-input">
                          <option value="1">Ativo</option>
                          <option value="0">Inativo</option>
                        </select>
                      </td>
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
                      <td>{funcionario.nome}</td>
                      <td>{funcionario.cpf}</td>
                      <td>{getNomeCargo(funcionario.cargo)}</td>
                      <td>R$ {funcionario.salario.toFixed(2)}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            funcionario.estaAtivo ? "active" : "inactive"
                          }`}>
                          {funcionario.estaAtivo ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                      <td className="action-buttons">
                        <button
                          onClick={() => iniciarEdicao(funcionario)}
                          className="edit-btn">
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeletar(funcionario)}
                          className="delete-btn">
                          Deletar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaFuncionarios;
