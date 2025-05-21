export const DeletarPedido = async (id: number) => {
  const confirmar = window.confirm(
    "Você tem certeza que deseja deletar este pedido?",
  );

  if (!confirmar) return;

  try {
    const response = await fetch(`http://localhost:5190/api/pedidos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Erro ao deletar pedido");

    // Se o back-end retorna algum JSON com mensagem
    const data = await response.json();
    alert(data.message || "Pedido deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    alert("Erro ao deletar pedido.");
  }
};
