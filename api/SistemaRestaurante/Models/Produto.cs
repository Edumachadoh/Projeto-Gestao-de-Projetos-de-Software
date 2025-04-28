using System.ComponentModel.DataAnnotations;

namespace SistemaRestaurante.Models;

public class Produto
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Nome { get; set; } = null!;

    [Required]
    public string Tipo { get; set; } // ana: vai virar enum!
    
    [Required]
    public int Quantidade { get; set; } // ana: ?? float pra QUANTIDADE?

    [Required]
    public float Valor { get; set; }
}

