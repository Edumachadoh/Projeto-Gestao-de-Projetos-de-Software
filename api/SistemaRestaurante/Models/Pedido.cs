using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace SistemaRestaurante.Models;

// ana: ... chamaram a classe de um nome e o arquivo de outro se foder mesmo
public class Pedido
{
    [Key]
    public int Id { get; set; } // ana: NumeroPedido e um nome... redundante...

    [ForeignKey("Cliente")]
    public int ClienteId { get; set; } // ana: KKKKKKKKKK repare que e uma FK. na classe cliente Cpf era uma INT. aqui era STRING. pqp 

    [Required]
    public List<ItemPedido> Itens { get; set; } = []; // ana: ? e como esse erro passou

    [Required]
    public decimal Valor { get; set; } // ana: dinheiro, por convencao, usa decimal 
}