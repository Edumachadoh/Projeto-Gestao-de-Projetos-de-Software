using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SistemaRestaurante.Enums;
using SistemaRestaurante.Models.Pessoa;
namespace SistemaRestaurante.Models;

public class Pedido
{
    [Key]
    public int Id { get; set; }
    [ForeignKey("Cliente")]
    public int? ClienteId { get; set; }
    [Required]
    public decimal ValorTotal { get; set; }
    public bool EstaAtivo { get; set; }
    public bool EstaPago { get; set; }
    public DateTime Data { get; set; } = DateTime.Now;

    // Não necessariamente um pedido precisa estar vinculado a um cliente
    public Cliente? Cliente { get; set; }
    public List<ItemPedido> Itens { get; set; } = [];
}

public class PedidoDTO
{
    [Key]
    public int Id { get; set; }
    [ForeignKey("Cliente")]
    public int? ClienteId { get; set; }  
    [Required]
    public decimal ValorTotal { get; set; }
    public bool EstaAtivo { get; set; }
    public bool EstaPago { get; set; }
    public DateTime Data { get; set; } = DateTime.Now;

    // Não necessariamente um pedido precisa estar vinculado a um cliente
    public ClienteDTO? Cliente { get; set; }
    public List<ItemPedidoDTO> Itens { get; set; } = []; 
}