export const DeletarCliente = async (id: number) => {
  if (!window.confirm("Tem certeza que deseja deletar este cliente?")) return;

  try {
    const resposta = await fetch(`http://localhost:5190/api/clientes/${id}`, {
      method: "DELETE",
    });

    if (!resposta.ok) throw new Error("Erro ao deletar cliente");

    window.alert("cliente deletado com sucesso!");
    window.location.reload();
  } catch (erro) {
    console.error("Erro ao deletar cliente:", erro);
    alert("Erro ao deletar cliente");
  }
};
