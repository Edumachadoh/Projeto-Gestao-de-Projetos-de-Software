using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Xablau.Models

{

    public class PedidoCliente
    {
        [Key]
        public int NumeroPedido{get;set;}

        [ForeignKey("Cliente")]
        public string CpfCliente{get;set;}

        [Required]
        public ItemPedido Itens{get;set;}

        [Required]
        public float ValorPedido{get;set;}
    }

}