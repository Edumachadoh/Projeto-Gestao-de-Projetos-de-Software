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

    public class ItemPedido
    {
        [Key]
        public int IdItem{get;set;}

        [Required]
        public string NomeItem{get;set;}

        [Required]
        public string DescricaoItem{get;set;}
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


    public class Funcionario
    {
        [Key]
        public int IdFuncionario{get;set;}

        [Required]
        public int StatusFuncionario{get;set;}

        [Required]
        public string NomeFuncionario{get;set;}

        [Required]
        public string Cargo{get;set;}

        [Required]
        public float Salario{get;set;}


    }

    public class ProdutosEstoque
    {
        [Key]
        public int IdProduto{get;set;}

        [Required]
        public string NomeProduto{get;set;}

        [Required]
        public string TipoProduto{get;set;}
        
        [Required]
        public float QuantidadeProduto{get;set;}

        [Required]
        public float ValorProduto{get;set;}
    }

    public class Gasto
    {
        [Key]
        public int ContaGasto{get;set;}

        [Required]
        public float ValorGasto{get;set;}

        [Required]
        public string DescricaoGasto{get;set;}

    }

    
}