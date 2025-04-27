using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Xablau.Models

{


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