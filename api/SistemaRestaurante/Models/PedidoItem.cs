using System.ComponentModel.DataAnnotations;

namespace SistemaRestaurante.Models;

public class ItemPedido
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Nome { get; set; } = null!;

    public decimal Valor { get; set; }
}