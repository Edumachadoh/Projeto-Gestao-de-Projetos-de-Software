using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaRestaurante.Models;

public class ItemPedido
{
    public int Id { get; set; }
    public int ItemId { get; set; }
    public int Quantidade { get; set; }
    public int PedidoId { get; set; }
    
}

public class ItemPedidoDTO
{
    public int Id { get; set; }
    public int ItemId { get; set; }
    public int Quantidade { get; set; }
    public int PedidoId { get; set; }
    public Item Item { get; set; } = null!;
    
}