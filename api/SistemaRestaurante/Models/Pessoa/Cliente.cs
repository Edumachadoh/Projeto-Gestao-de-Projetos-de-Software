using System.ComponentModel.DataAnnotations;

namespace SistemaRestaurante.Models.Pessoa; 

public class Cliente
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Nome { get; set; } = null!;
    [Required]
    public string Cpf { get; set; } = null!;
    public DateTime DataNascimento { get; set; }
    public string? Telefone { get; set; }
    public int PontosFidelidade { get; set; } = 0;
    public List<Pedido> Pedidos { get; set; } = [];
}
