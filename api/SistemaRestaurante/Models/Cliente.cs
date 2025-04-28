using System.ComponentModel.DataAnnotations;

namespace SistemaRestaurante.Models; // ana: LKKKKKKKKKKKKKKKKKKKK VSF XABLAU.MODELS 

// ana: CpfCliente = ma pratica de nomeacao (a parte do Cliente). tipo.
// a gente ja ta na classe Cliente. nao precisa lembrar. tambem limpei um pouco
// e nao entendi como funciona MetodoPagamento. e, como provavelmente existem opcoes
// limitadas de pagamento, nao e melhor trocar pra um enum?
public class Cliente
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string Cpf { get; set; } = null!;

    [Required]
    public string Nome { get; set; } = null!;

    // [Required]
    // public string MetodoPagamento { get; set; } = null!;
    // ana: ???????????????????????????????????????????????????????????????????????
}
