using System.ComponentModel.DataAnnotations;

namespace SistemaRestaurante.Models.Financeiro;

public class RegistroFinanceiro
{
    [Key]
    public int Id { get; set; }
    public DateTime DataRegistrada { get; set; } = DateTime.Now;

    public decimal Gas { get; set; } // ana: ?? rever depois
    public decimal Luz { get; set; }
    public decimal Agua { get; set; }
    public decimal Funcionarios { get; set; }

    // CATEGORIAS: O que há no ENUM de Categorias, aparece aqui!
    public decimal Estoque { get; set; }
    public decimal Itens { get; set; }
}