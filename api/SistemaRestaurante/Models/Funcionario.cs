using System.ComponentModel.DataAnnotations;

namespace SistemaRestaurante.Models;

public class Funcionario
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string Cpf { get; set; } = null!;

    [Required]
    public string Nome { get; set; } = null!;

    [Required]
    public string Senha { get; set; } = null!; // ana: login

    public bool EstaAtivo { get; set; }

    [Required]
    public string Cargo { get; set; } // ana: vai virar enum! usar pra rbac

    [Required]
    public decimal Salario { get; set; } // ana: ?

    [Required]
    public int Status { get; set; } // ana: e o que isso quer dizer?
}