using System.ComponentModel.DataAnnotations;

namespace SistemaRestaurante.Models;

// ana: nossa nao entendi onde e como isso vai ser utilizado. se for para relatorio financeiro, acho
// que existem formas melhores de desenvolver a logica. conversar depois.
 public class Gasto
{
    [Key]
    public int Conta { get; set; }

    [Required]
    public float Valor { get; set; }

    [Required]
    public string Descricao { get; set; }
}