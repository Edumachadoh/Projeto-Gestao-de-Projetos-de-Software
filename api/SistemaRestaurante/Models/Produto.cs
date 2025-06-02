using System.ComponentModel.DataAnnotations;

namespace SistemaRestaurante.Models;

public class Produto
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Nome { get; set; } = null!;
    [Required]
    public int QtdMinima { get; set; }
    [Required]
    public int QtdMaxima { get; set; }
    [Required]
    public int QtdAtual { get; set; } 
}