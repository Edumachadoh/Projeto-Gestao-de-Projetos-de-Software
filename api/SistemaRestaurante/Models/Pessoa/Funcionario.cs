using System.ComponentModel.DataAnnotations;
using SistemaRestaurante.Enums;

namespace SistemaRestaurante.Models.Pessoa;

public class Funcionario
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Cpf { get; set; } = null!;
    [Required]
    public string Senha { get; set; } = null!;
    [Required]
    public Cargo Cargo { get; set; }
    [Required]
    public string Nome { get; set; } = null!;
    public bool EstaAtivo { get; set; }
    [Required]
    public decimal Salario { get; set; } 
    public string? Telefone { get; set; }
    
    [Required]
    public int Status { get; set; } // ana: e o que isso quer dizer?
}