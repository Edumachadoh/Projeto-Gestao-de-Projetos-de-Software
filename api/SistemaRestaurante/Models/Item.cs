using System.ComponentModel.DataAnnotations;
using SistemaRestaurante.Enums;

namespace SistemaRestaurante.Models;

public class Item
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Nome { get; set; } = null!;
    public decimal Valor { get; set; }
}