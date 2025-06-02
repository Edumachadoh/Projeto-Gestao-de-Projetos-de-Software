import { useState } from "react";

function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [qtdMinima, setQtdMinima] = useState("");
  const [qtdMaxima, setQtdMaxima] = useState("");
  const [qtdAtual, setQtdAtual] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  async function enviarProduto(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    // Validação básica no cliente
    if (Number(qtdAtual) < 0 || Number(qtdMinima) < 0 || Number(qtdMaxima) < 0) {
      setErro("As quantidades não podem ser negativas");
      return;
    }

    if (Number(qtdMinima) > Number(qtdMaxima)) {
      setErro("A quantidade mínima não pode ser maior que a máxima");
      return;
    }

    try {
      const produto = {
        nome,
        qtdMinima: Number(qtdMinima),
        qtdMaxima: Number(qtdMaxima),
        qtdAtual: Number(qtdAtual),
      };

      const resposta = await fetch("http://localhost:5190/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });

      if (!resposta.ok) {
        // Tenta extrair o erro da resposta
        const erroResponse = await resposta.json().catch(() => null);
        const mensagemErro = erroResponse?.message || 
                             erroResponse?.title || 
                             "Erro ao cadastrar produto (status " + resposta.status + ")";
        throw new Error(mensagemErro);
      }

      const produtoCadastrado = await resposta.json();
      console.log("Produto cadastrado", produtoCadastrado);
      alert("Produto cadastrado com sucesso!");
      
      // Limpa o formulário
      setNome("");
      setQtdMinima("");
      setQtdMaxima("");
      setQtdAtual("");
    } catch (erro) {
      console.error("Erro completo ao cadastrar produto:", erro);
      const mensagem = erro instanceof Error ? erro.message : "Erro desconhecido ao cadastrar";
      setErro(mensagem);
      alert(`Erro: ${mensagem}`);
    }
  }

  return (
    <div className="form-container" style={{ width: '400px'}}>
      <div className="form-header">
        <h2>Cadastro de Produto</h2>
      </div>
      {erro && (
        <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>
          {erro}
        </div>
      )}
      <form className="form-content" onSubmit={enviarProduto}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Produto</label>
          <input
            placeholder="Ex: Arroz, Feijão, etc."
            type="text"
            id="nome"
            name="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="qtdMinima">Quantidade Mínima</label>
          <input
            placeholder="Quantidade mínima em estoque"
            type="number"
            id="qtdMinima"
            name="qtdMinima"
            required
            min="0"
            value={qtdMinima}
            onChange={(e) => setQtdMinima(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="qtdMaxima">Quantidade Máxima</label>
          <input
            placeholder="Quantidade máxima em estoque"
            type="number"
            id="qtdMaxima"
            name="qtdMaxima"
            required
            min="0"
            value={qtdMaxima}
            onChange={(e) => setQtdMaxima(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="qtdAtual">Quantidade Atual</label>
          <input
            placeholder="Quantidade atual em estoque"
            type="number"
            id="qtdAtual"
            name="qtdAtual"
            required
            min="0"
            value={qtdAtual}
            onChange={(e) => setQtdAtual(e.target.value)}
          />
        </div>
        <button type="submit" className="form-submit-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroProduto;