using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Context;
using SistemaRestaurante.Models;

namespace SistemaRestaurante.Controllers;

[ApiController]
[Route("api/itens")]
public class ItemController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public ItemController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddItem([FromBody] Item item)
    {
        if (!ModelState.IsValid)
        {
         return BadRequest(ModelState);
        }

        await _appDbContext.Itens.AddAsync(item);
        await _appDbContext.SaveChangesAsync();

        return StatusCode(201, item);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Item>>> GetItens()
    {
        var itens = await _appDbContext.Itens.ToListAsync();

        return StatusCode(200, itens);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Item>>> GetItemId(int id)
    {
        var buscarItem = await _appDbContext.Itens.FindAsync(id);

        if (buscarItem is null)
        {
            return NotFound("Item não encontrado.");
        }

        return StatusCode(200, buscarItem);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateItem(int id, [FromBody] Item item)
    {
        var buscarItem = await _appDbContext.Itens.FindAsync(id);

        if (buscarItem is null)
        {
            return NotFound("Item não encontrado.");
        }

        _appDbContext.Entry(buscarItem).CurrentValues.SetValues(item);
        await _appDbContext.SaveChangesAsync();

        return Ok("Item atualizado com sucesso.");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteItem(int id)
    {
        var buscarItem = await _appDbContext.Itens.FindAsync(id);
        if (buscarItem is null)
        {
            return NotFound("Item não encontrado");
        }

        _appDbContext.Remove(buscarItem);
        await _appDbContext.SaveChangesAsync();

        return Ok("Item deletado.");
    }
}