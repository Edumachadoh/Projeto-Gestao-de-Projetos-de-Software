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
    public StatusPreparo StatusPreparo { get; set; }
    public DateTime Data { get; set; }

    // Não necessariamente um pedido precisa estar vinculado a um cliente
    public Cliente? Cliente { get; set; }
    [Required]
    public List<Item> Itens { get; set; } = []; 
}