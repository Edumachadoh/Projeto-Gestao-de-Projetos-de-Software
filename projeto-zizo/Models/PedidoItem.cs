using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Xablau.Models

{

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