using Microsoft.AspNetCore.Mvc;
using SistemaRestaurante.Context;
using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Models.Pessoa;

namespace SistemaRestaurante.Controllers;

[ApiController]
[Route("api/clientes")]
public class ClienteController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public ClienteController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddCliente([FromBody] Cliente cliente)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _appDbContext.Clientes.AddAsync(cliente);
        await _appDbContext.SaveChangesAsync();

        return StatusCode(201, cliente);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
    {

        var clientes = await _appDbContext.Clientes.ToListAsync();

        return StatusCode(200, clientes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Cliente>>> GetClienteId(int id)
    {
        var buscarCliente = await _appDbContext.Clientes.FindAsync(id);

        if(buscarCliente is null)
        {
            return NotFound("Cliente não encontrado.");
        }

        return StatusCode(200, buscarCliente);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCliente(int id, [FromBody] Cliente clienteAtualizado)
    {
        var buscarCliente = await _appDbContext.Clientes.FindAsync(id);

        if(buscarCliente is null)
        {
            return NotFound("Cliente não encontrado.");
        }

        _appDbContext.Entry(buscarCliente).CurrentValues.SetValues(clienteAtualizado);
        await _appDbContext.SaveChangesAsync();

        return Ok("Cliente atualizado com sucesso.");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCliente(int id)
    {
        var buscarCliente = await _appDbContext.Clientes.FindAsync(id);
        if(buscarCliente is null)
        {
            return NotFound("Cliente não encontrado.");
        }

        _appDbContext.Remove(buscarCliente);
        await _appDbContext.SaveChangesAsync();

        return Ok("Cliente deletado.");
    }
}