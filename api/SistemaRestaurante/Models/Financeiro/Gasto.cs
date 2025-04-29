using System.ComponentModel.DataAnnotations;
using SistemaRestaurante.Enums;

namespace SistemaRestaurante.Models.Financeiro;

 public class Gasto
{
    [Key]
    public int Id { get; set; }
    [Required]
    public Categoria Categoria { get; set; }
    public decimal Valor { get; set; }
    public DateTime Data { get; set; }
}