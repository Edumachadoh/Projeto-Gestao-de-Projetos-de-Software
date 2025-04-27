using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Xablau.Models

{
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
}