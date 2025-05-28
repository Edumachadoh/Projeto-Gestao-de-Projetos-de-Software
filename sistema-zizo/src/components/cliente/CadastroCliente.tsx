import React, { useState } from "react";
import { formatDateToISO } from "../../util/FormatarData";

const CadastroCliente = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date>();
  const [telefone, setTelefone] = useState("");

  function enviarCliente(e: React.FormEvent) {
    e.preventDefault();

    const cliente = {
      nome,
      cpf,
      dataNascimento: formatDateToISO(dataNascimento),
      telefone: telefone || null,
    };

    fetch("http://localhost:5190/api/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    })
      .then(async (resposta) => {
        if (!resposta.ok) {
          const erro = await resposta
            .json()
            .catch(() => ({ message: "Erro desconhecido" }));
          throw new Error(erro.message || "Erro ao cadastrar");
        }
        return resposta.json();
      })
      .then((clienteCadastrado) => {
        console.log("Cliente cadastrado", clienteCadastrado);
        alert("Cliente cadastrado com sucesso!");
        // Limpa o formulário
        setNome("");
        setCpf("");
        setDataNascimento(undefined);
        setTelefone("");
      })
      .catch((erro) => {
        console.error("Erro ao cadastrar cliente\n", erro);
        alert(`Erro: ${erro.message}`);
      });
  }
  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Cadastro de Cliente</h2>
      </div>
      <form className="form-content" onSubmit={enviarCliente}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            placeholder="Lucas da Silva"
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
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            required
            value={dataNascimento ? formatDateToISO(dataNascimento) ?? "" : ""}
            onChange={(e) => setDataNascimento(new Date(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            placeholder="(00) 00000-0000"
            type="text"
            id="telefone"
            name="telefone"
            required
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <button type="submit" className="form-submit-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroCliente;
