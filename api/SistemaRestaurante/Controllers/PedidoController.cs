using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Context;
using SistemaRestaurante.Models;

namespace SistemaRestaurante.Controllers;

[ApiController]
[Route("api/pedidos")]
public class PedidoController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public PedidoController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddPedido([FromBody] Pedido pedido)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // ana: meio feio if dentro de if mas é um workaround
        if (pedido.ClienteId is not null)
        {
            var cliente = await _appDbContext.Clientes.FirstOrDefaultAsync(x => x.Id == pedido.ClienteId);

            if (cliente is not null)
            {
                cliente.Pedidos.Add(pedido);
            }
        }

        foreach (Item item in pedido.Itens)
        {
            pedido.ValorTotal += item.Valor;
        }

        await _appDbContext.Pedidos.AddAsync(pedido);
        await _appDbContext.SaveChangesAsync();

        return StatusCode(201, pedido);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidos()
    {
        var pedidos = await _appDbContext.Pedidos.ToListAsync();

        return StatusCode(200, pedidos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidoId(int id)
    {
        var buscarPedido = await _appDbContext.Pedidos.FindAsync(id);
        if (buscarPedido is null)
        {
            return NotFound("Pedido não encontrado.");
        }

        return StatusCode(200, buscarPedido);
    }

    [HttpGet("cliente/{idCliente}")]
    public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidosCliente(int idCliente)
    {
        var pedidos = await _appDbContext.Pedidos.Where(x => x.ClienteId == idCliente).ToListAsync();

        return StatusCode(200, pedidos);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdatePedido(int id, [FromBody] Pedido pedido)
    {
        var buscarPedido = await _appDbContext.Pedidos.FindAsync(id);
        if (buscarPedido is null)
        {
            return NotFound("Pedido não encontrado.");
        }

        _appDbContext.Entry(buscarPedido).CurrentValues.SetValues(pedido);
        await _appDbContext.SaveChangesAsync();

        return Ok("O pedido foi atualizado com sucesso.");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePedido(int id)
    {
        var buscarPedido = await _appDbContext.Pedidos.FindAsync(id);
        if(buscarPedido is null)
        {
            return NotFound("Pedido não encontrado.");
        }

        _appDbContext.Remove(buscarPedido);
        await _appDbContext.SaveChangesAsync();

        return Ok("Pedido deletado.");
    }
}