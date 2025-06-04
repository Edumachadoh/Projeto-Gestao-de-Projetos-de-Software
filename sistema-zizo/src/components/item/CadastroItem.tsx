import React, { useState } from "react";

const CadastroItem = () => {
  const [nome, setNome] = useState<string>("");
  const [valor, setValor] = useState<number>(0);

  function enviarItem(e: React.FormEvent) {
    e.preventDefault();

    const item = {
      nome,
      valor,
    };

    fetch("http://localhost:5190/api/itens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
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
      .then((itemCadastrado) => {
        console.log("Item cadastrado", itemCadastrado);
        alert("Item cadastrado com sucesso!");
        // Limpa o formulário
        setNome("");
        setValor(0);
      })
      .catch((erro) => {
        console.error("Erro ao cadastrar item\n", erro);
        alert(`Erro: ${erro.message}`);
      });
  }
  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Cadastro de Item</h2>
      </div>
      <form className="form-content" onSubmit={enviarItem}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            placeholder="Suco de Uva"
            type="text"
            id="nome"
            name="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="valor">Valor</label>
          <input
            placeholder="00,00"
            type="number"
            id="valor"
            name="valor"
            required
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="form-submit-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroItem;
