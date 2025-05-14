import { useState } from "react";
import type { Funcionario } from "../../interfaces/Funcionario";
import { Cargo } from "../../interfaces/Cargo";

function CadastroFuncionario() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [salario, setSalario] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState<Cargo>(Cargo.Balconista);
  const [estaAtivo, setEstaAtivo] = useState(true);

  function enviarFuncionario(e: React.FormEvent) {
    e.preventDefault();

    const funcionario: Funcionario = {
      nome,
      cpf,
      senha,
      cargo,
      salario: Number(salario),
      telefone: telefone || undefined,
      estaAtivo,
      status: 1,
    };

    fetch("http://localhost:5020/api/funcionario/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(funcionario),
    })
      .then((resposta) => resposta.json())
      .then((funcionarioCadastrado) => {
        console.log("Funcionário cadastrado", funcionarioCadastrado);
      })
      .catch((erro) => {
        console.error("Erro ao cadastrar funcionário", erro);
      });
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Cadastro de Funcionário</h2>
      </div>
      <form className="form-content" onSubmit={enviarFuncionario}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            placeholder="José Inácio da Silva"
            type="text"
            id="nome"
            name="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            placeholder="000.000.000-00"
            type="text"
            id="cpf"
            name="cpf"
            required
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="salario">Salário</label>
          <input
            placeholder="3000.00"
            type="number"
            step="0.01"
            id="salario"
            name="salario"
            required
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            placeholder="(00) 00000-0000"
            type="text"
            id="telefone"
            name="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cargo">Cargo: </label>
          <select
            id="cargo"
            value={cargo}
            onChange={(e) => setCargo(Number(e.target.value) as Cargo)}>
            {Object.entries(Cargo)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="estaAtivo">Status: </label>
          <select
            id="estaAtivo"
            value={estaAtivo ? "1" : "0"}
            onChange={(e) => setEstaAtivo(e.target.value === "1")}>
            <option value="1">Ativo</option>
            <option value="0">Inativo</option>
          </select>
        </div>
        <button type="submit" className="form-submit-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroFuncionario;
