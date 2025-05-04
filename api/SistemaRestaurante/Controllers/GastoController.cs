using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Context;
using SistemaRestaurante.Enums;
using SistemaRestaurante.Models.Financeiro;

namespace SistemaRestaurante.Controllers;

// ana: a absencia de um PUT e proposital. nao faz sentido.
[ApiController]
[Route("api/gastos")]
public class GastoController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public GastoController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddGasto([FromBody] Gasto gasto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _appDbContext.Gastos.AddAsync(gasto);
        await _appDbContext.SaveChangesAsync();

        return Created();
    }

    [HttpGet]
    public async Task<ActionResult <IEnumerable<Gasto>>> GetGastos()
    {
        var gastos = await _appDbContext.Gastos.ToListAsync();

        return Ok(gastos);
    }

    [HttpGet]
    public async Task<ActionResult <IEnumerable<Gasto>>> GetGastosCategoria([FromBody] Categoria categoria)
    {
        var gastos = await _appDbContext.Gastos.Where(x => x.Categoria == categoria).ToListAsync();

        return Ok(gastos);
    }

    // ana: ? acho meio sem sentido, mas deixei, sei lá, por segurança
    [HttpGet("{id}")]
    public async Task<ActionResult<Gasto>> GetGasto(int id)
    {
        var gasto = await _appDbContext.Gastos.FirstOrDefaultAsync(x => x.Id == id);

        if (gasto is null)
            return NotFound("Gasto não encontrado.");

        return Ok(gasto);
    }

    // ana: sei lá vai que cadastra errado e quer deletar
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteGasto(int id)
    {
        var gasto = await _appDbContext.Gastos.FirstOrDefaultAsync(x => x.Id == id);

        if (gasto is null)
            return NotFound("Gasto não encontrado.");

        _appDbContext.Remove(gasto);
        await _appDbContext.SaveChangesAsync();

        return Ok("Gasto deletado.");
    }
}