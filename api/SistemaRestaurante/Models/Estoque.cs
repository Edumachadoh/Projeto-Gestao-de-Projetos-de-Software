using System.ComponentModel.DataAnnotations;

namespace SistemaRestaurante.Models;

public class Estoque
{
    [Required]
    public List<Produto> Produtos { get; set; } = [];
    [Required]
    public DateTime DataRegistrada { get; set; } = DateTime.Now;
}