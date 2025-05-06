using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Context;
using SistemaRestaurante.Models;

namespace SistemaRestaurante.Controllers
{
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

    public async Task<IActionResult> AddCliente([FromBody] Pedido pedido)
     {
        if(!ModelState.IsValid){
             return BadRequest(ModelState);
            }

        if (pedido.ClienteId is not null)
        {
            var cliente = await _appDbContext.Clientes.FirstOrDefaultAsync(x => x.Id == pedido.ClienteId);
            ///Ana Senhora, o VS diz que cliete abaixo faz referência a uma variavel local, não sei se instânciamos a model Cliente, ou só um "?" resolve
             cliente.Pedidos.Add(pedido);
        }
        
        await _appDbContext.Pedidos.AddAsync(pedido);
        await _appDbContext.SaveChangesAsync();

        return StatusCode(201,pedido);
    }

    public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
    {
        var produtos = await _appDbContext.Produtos.ToListAsync();

        return StatusCode(201, produtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Produto>>> GetProdutoId(int id)
    {
        var buscarProduto = await _appDbContext.Produtos.FindAsync(id);

        if(buscarProduto == null)
        {
            return NotFound("Produto não encontrado");
        }

        return StatusCode(201, buscarProduto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateProdutoId(int id, [FromBody] Produto produto)
    {
        var buscarProduto = await _appDbContext.Produtos.FindAsync(id);

        if(buscarProduto == null)
        {
            return NotFound("O produto não foi encontrado");
        }

        _appDbContext.Entry(buscarProduto).CurrentValues.SetValues(produto);
        await _appDbContext.SaveChangesAsync();

        return Ok("O Produto foi atualizado com sucesso");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProdutoId(int id, [FromBody] Produto produto)
    {
        var buscarProduto = await _appDbContext.Produtos.FindAsync(id);

        if(buscarProduto == null)
        {
            return NotFound("O Produto não foi encontrado");
        }

        _appDbContext.Remove(buscarProduto);
        await _appDbContext.SaveChangesAsync();

        return Ok(buscarProduto);
    }
    


    }
}