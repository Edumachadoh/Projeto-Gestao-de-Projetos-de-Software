using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Context;
using SistemaRestaurante.Models;
using SistemaRestaurante.Models.Pessoa;

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

        await _appDbContext.Pedidos.AddAsync(pedido);
        await _appDbContext.SaveChangesAsync();

        return StatusCode(201, pedido);
    }

[HttpGet]
public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetPedidos()
{
    var pedidos = await _appDbContext.Pedidos
        .Include(x => x.Cliente)
        .Include(x => x.Itens)
        .ToListAsync();

    var pedidosDto = pedidos.Select(p => new PedidoDTO
    {
        Id = p.Id,
        ClienteId = p.ClienteId,
        ValorTotal = p.ValorTotal,
        EstaAtivo = p.EstaAtivo,
        EstaPago = p.EstaPago,
        Data = p.Data,
        Cliente = p.Cliente == null ? null : new ClienteDTO
        {
            Id = p.Cliente.Id,
            Nome = p.Cliente.Nome,
            Cpf = p.Cliente.Cpf,
            DataNascimento = p.Cliente.DataNascimento,
            Telefone = p.Cliente.Telefone,
            PontosFidelidade = p.Cliente.PontosFidelidade
        },
        Itens = _appDbContext.ItensPedido
            .Where(ip => ip.PedidoId == p.Id)
            .Select(ip => new ItemPedidoDTO
            {
                Id = ip.Id,
                ItemId = ip.ItemId,
                Quantidade = ip.Quantidade,
                Item = _appDbContext.Itens.FirstOrDefault(i => i.Id == ip.ItemId)!
            }).ToList()
    }).ToList();

    return Ok(pedidosDto);
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