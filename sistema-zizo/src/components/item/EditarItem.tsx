import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { Item } from "../../models/interfaces/Item";

const EditarItem = () => {
  const { id } = useParams();
  const [nome, setNome] = useState<string>("");
  const [valor, setValor] = useState<number>(0);

  const [item, setItem] = useState<Item | null>(null);

  const navigate = useNavigate();

  function enviarItem(e: React.FormEvent) {
    e.preventDefault();
    salvarEdicao();
  }

  useEffect(() => {
    const carregarItem = async () => {
      try {
        const resposta = await fetch(`http://localhost:5190/api/itens/${id}`);
        if (!resposta.ok) throw new Error("Erro ao carregar item");
        const dados: Item = await resposta.json();
        setItem(dados);

        setNome(dados.nome);
        setValor(dados.valor);
      } catch (erro: any) {
        console.error("Erro ao carregar item:", erro);
        alert("Erro ao carregar item");
      }
    };

    carregarItem();
  }, []);

  const salvarEdicao = async () => {
    if (id === null) return;

    try {
      const itemEditado: Item = {
        id: item?.id ?? Number(id),
        nome,
        valor,
      };

      const resposta = await fetch(`http://localhost:5190/api/itens/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemEditado),
      });

      if (!resposta.ok) {
        const errorData = await resposta.json().catch(() => null);
        throw new Error(errorData?.message || "Erro ao atualizar item");
      }

      alert("Item atualizado com sucesso!");
      navigate("/listar/item");
      window.location.reload();
    } catch (erro) {
      console.error("Erro ao editar item:", erro);
      alert(
        erro instanceof Error ? erro.message : "Erro desconhecido ao atualizar",
      );
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Editar Item</h2>
      </div>
      <form className="form-content" onSubmit={enviarItem}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            placeholder="Suco de Laranja"
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
        <button type="submit" className="save-btn">
          Salvar
        </button>
        <Link to={"/listar/item"} className="cancel-btn">
          Cancelar
        </Link>
      </form>
    </div>
  );
};

export default EditarItem;
