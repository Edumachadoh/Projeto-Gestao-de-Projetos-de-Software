export const DeletarCliente = async (id: number) => {
  if (!window.confirm("Tem certeza que deseja deletar este funcionário?"))
    return;

  try {
    const resposta = await fetch(`http://localhost:5190/api/clientes/${id}`, {
      method: "DELETE",
    });

    if (!resposta.ok) throw new Error("Erro ao deletar funcionário");

    window.alert("Funcionário deletado com sucesso!");
    window.location.reload();
  } catch (erro) {
    console.error("Erro ao deletar funcionário:", erro);
    alert("Erro ao deletar funcionário");
  }
};
