using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Context;
using SistemaRestaurante.Models;
using SistemaRestaurante.Models.Financeiro;

namespace SistemaRestaurante.Controllers;

// ana: registros so podem ser gerados e consultados. nao podem ser atualizados nem deletados.
[ApiController]
[Route("api/registros-financeiros")]
public class RegistroFinanceiroController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public RegistroFinanceiroController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddRegistroFinanceiro([FromBody] RFConfig rfConfig)
    {
        RegistroFinanceiro registroFinanceiro = new() 
        {
            Gas = rfConfig.Gas,
            Luz = rfConfig.Luz,
            Agua = rfConfig.Agua,
            Funcionarios = _appDbContext.Funcionarios.Sum(x => x.Salario),
            Estoque = _appDbContext.Gastos.Where(x => x.Categoria == Enums.Categoria.ProdutoEstoque).Sum(x => x.Valor),
            Itens = _appDbContext.Gastos.Where(x => x.Categoria == Enums.Categoria.Item).Sum(x => x.Valor),
        };

        await _appDbContext.RegistrosFinanceiros.AddAsync(registroFinanceiro);
        await _appDbContext.SaveChangesAsync();

        return Created("Registro financeiro adicionado.", registroFinanceiro);
    }

    [HttpGet]
    public async Task<ActionResult <IEnumerable<RegistroFinanceiro>>> GetRegistrosFinanceiros()
    {
        var registroFinanceiros = await _appDbContext.RegistrosFinanceiros.ToListAsync();

        return Ok(registroFinanceiros);
    }

    [HttpGet("id/{id}")]
    public async Task<ActionResult<RegistroFinanceiro>> GetRegistroFinanceiro(int id)
    {
        var estoque = await _appDbContext.RegistrosFinanceiros.FirstOrDefaultAsync(x => x.Id == id);

        if (estoque is null)
            return NotFound("Registro Financeiro não encontrado.");

        return Ok(estoque);
    }

    [HttpGet("mes/{mes}")]
    public async Task<ActionResult<RegistroFinanceiro>> GetRegistroFinanceiroMes(int mes)
    {
        var estoque = await _appDbContext.RegistrosFinanceiros.FirstOrDefaultAsync(x => x.DataRegistrada.Month == mes);

        if (estoque is null)
            return NotFound("Registro Financeiro não encontrado.");

        return Ok(estoque);
    }
}