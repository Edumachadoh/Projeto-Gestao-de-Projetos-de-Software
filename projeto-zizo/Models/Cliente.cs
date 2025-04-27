using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Xablau.Models

{

    public class Cliente
    {
        [Key]
        public int CpfCliente{get;set;}

        [Required]
        public string NomeCliente{get;set;}

        [Required]
        public string MetodoPagamentoCliente{get;set;}

    }


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

    public class ItemPedido
    {
        [Key]
        public int IdItem{get;set;}

        [Required]
        public string NomeItem{get;set;}

        [Required]
        public string DescricaoItem{get;set;}
    }
    
}