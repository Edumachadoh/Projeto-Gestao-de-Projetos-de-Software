export async function DeletarItem(id: number) {
  const confirmar = window.confirm(
    "Você tem certeza que deseja deletar este pedido?",
  );
  if (!confirmar) return;

  try {
    const response = await fetch(`http://localhost:5190/api/itens/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Erro ao deletar pedido");

    const message = await response.text(); // trata como texto
    alert(message || "Pedido deletado com sucesso!");
    window.location.reload();
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    alert("Erro ao deletar pedido.");
  }
}
