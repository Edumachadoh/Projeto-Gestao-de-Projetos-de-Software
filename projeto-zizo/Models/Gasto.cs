using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Xablau.Models

{

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