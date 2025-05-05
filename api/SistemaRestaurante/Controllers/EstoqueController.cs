using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Context;
using SistemaRestaurante.Models;

namespace SistemaRestaurante.Controllers;

// ana: estoques so podem ser gerados e consultados. nao podem ser atualizados nem deletados.
[ApiController]
[Route("api/estoques")]
public class EstoqueController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public EstoqueController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddEstoque()
    {
        Estoque estoque = new() 
        {
            Produtos = await _appDbContext.Produtos.ToListAsync(),
        };

        await _appDbContext.Estoques.AddAsync(estoque);
        await _appDbContext.SaveChangesAsync();

        return Created("Estoque adicionado.", estoque);
    }

    [HttpGet]
    public async Task<ActionResult <IEnumerable<Estoque>>> GetEstoques()
    {
        var estoques = await _appDbContext.Estoques.ToListAsync();

        return Ok(estoques);
    }

    [HttpGet("id/{id}")]
    public async Task<ActionResult<Estoque>> GetEstoque(int id)
    {
        var estoque = await _appDbContext.Estoques.FirstOrDefaultAsync(x => x.Id == id);

        if (estoque is null)
            return NotFound("Estoque não encontrado.");

        return Ok(estoque);
    }

    [HttpGet("mes/{mes}")]
    public async Task<ActionResult<Estoque>> GetEstoqueMes(int mes)
    {
        var estoque = await _appDbContext.Estoques.FirstOrDefaultAsync(x => x.DataRegistrada.Month == mes);

        if (estoque is null)
            return NotFound("Estoque não encontrado.");

        return Ok(estoque);
    }
}