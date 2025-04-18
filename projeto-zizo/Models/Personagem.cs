using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Xablau.Models

{

    public class Cliente
    {
        [Key]
        public int CpfCliente{get;set;}

        public string NomeCliente{get;set;}

        public string MetodoPagamentoCliente{get;set;}

    }

    public class PedidoCliente
    {
        [Key]
        public int NumeroPedido{get;set;}

        [ForeignKey("Cliente")]
        public string CpfCliente{get;set;}

        public List<string> ItemPedido{get;set;}

        public float ValorPedido{get;set;}
    }

    public class Funcionario
    {
        [Key]
        public int IdFuncionario{get;set;}

        public string NomeFuncionario{get;set;}

        public string Cargo{get;set;}

        public float Salario{get;set;}
    }

    public class ProdutosEstoque
    {
        [Key]
        public int IdProduto{get;set;}

        public string NomeProduto{get;set;}

        public float QuantidadeProduto{get;set;}

        public float ValorProduto{get;set;}
    }

    public class Saldo
    {
        [Key]
        public int ContaSaldo{get;set;}
        public float ValorSaldo{get;set;}
        
    }

    
}