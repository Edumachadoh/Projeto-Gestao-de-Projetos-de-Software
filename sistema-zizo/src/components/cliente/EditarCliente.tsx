import { useEffect, useState } from "react";
import type { Cliente } from "../../models/interfaces/Cliente";
import { Link, useNavigate, useParams } from "react-router";

const EditarCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const navigate = useNavigate();

  const [nome, setNome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<Date>();
  const [telefone, setTelefone] = useState<string>("");
  const [pontosFidelidade, setPontosFidelidade] = useState<number>(0);

  function enviarCliente(e: React.FormEvent) {
    e.preventDefault();
    salvarEdicao();
  }

  useEffect(() => {
    const carregarCliente = async () => {
      try {
        const resposta = await fetch(
          `http://localhost:5190/api/clientes/${id}`,
        );
        if (!resposta.ok) throw new Error("Erro ao carregar cliente");
        const dados: Cliente = await resposta.json();
        setCliente(dados);

        setNome(dados.nome);
        setCpf(dados.cpf);
        setDataNascimento(new Date(dados.dataNascimento));
        setTelefone(dados.telefone);
        setPontosFidelidade(dados.pontosFidelidade);
      } catch (erro: any) {
        console.error("Erro ao carregar cliente:", erro);
        alert("Erro ao carregar cliente");
      }
    };

    carregarCliente();
  }, []);

  const salvarEdicao = async () => {
    if (id === null) return;

    try {
      const clienteEditado: Cliente = {
        id: cliente?.id ?? Number(id),
        nome,
        cpf,
        dataNascimento: dataNascimento as Date,
        telefone,
        pontosFidelidade: pontosFidelidade ?? 0,
        pedidos: cliente?.pedidos ?? [],
      };

      const resposta = await fetch(`http://localhost:5190/api/clientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteEditado),
      });

      if (!resposta.ok) {
        const errorData = await resposta.json().catch(() => null);
        throw new Error(errorData?.message || "Erro ao atualizar cliente");
      }

      alert("Cliente atualizado com sucesso!");
      navigate("/listar/cliente");
      window.location.reload();
    } catch (erro) {
      console.error("Erro ao editar cliente:", erro);
      alert(
        erro instanceof Error ? erro.message : "Erro desconhecido ao atualizar",
      );
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Editar Cliente</h2>
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
        <button type="submit" className="save-btn">
          Salvar
        </button>
        <Link to={"/listar/cliente"} className="cancel-btn">
          Cancelar
        </Link>
      </form>
    </div>
  );
};

export default EditarCliente;
