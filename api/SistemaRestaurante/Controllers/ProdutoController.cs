using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Context;
using SistemaRestaurante.Models;

namespace SistemaRestaurante.Controllers;

[ApiController]
[Route("api/produtos")]
public class ProdutoController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public ProdutoController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddProduto([FromBody] Produto produto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _appDbContext.Produtos.Add(produto);
        await _appDbContext.SaveChangesAsync();

        return Created("Produto criado com sucesso!", produto);
    }

    [HttpGet]
    public async Task<ActionResult <IEnumerable<Produto>>> GetProduto()
    {
        var produtos = await _appDbContext.Produtos.ToListAsync();

        return Ok(produtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Produto>> GetProduto(int id)
    {
        var produto = await _appDbContext.Produtos.FirstOrDefaultAsync(x => x.Id == id);
        if (produto is null) 
            return NotFound("Produto não encontrado.");

        return Ok(produto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQtdProduto(int id, [FromBody] int produtoQtdUpdateDTO)
    {
        var produto = await _appDbContext.Produtos.FirstOrDefaultAsync(x => x.Id == id);
        if (produto is null)
            return NotFound("Produto não encontrado.");

        produto.QtdAtual = produtoQtdUpdateDTO;

        await _appDbContext.SaveChangesAsync();

        return StatusCode(201, produto);
    }

    [HttpPut("att/{id}")]
    public async Task<IActionResult> UpdateProduto(int id, [FromBody] Produto produtoAtualizado)
    {
        var produto = await _appDbContext.Produtos.FirstOrDefaultAsync(x => x.Id == id);
        if (produto is null)
            return NotFound("Produto não encontrado.");

        _appDbContext.Entry(produto).CurrentValues.SetValues(produtoAtualizado);
        await _appDbContext.SaveChangesAsync();

        return StatusCode(201, produto);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProduto(int id)
    {
        var produto = await _appDbContext.Produtos.FirstOrDefaultAsync(x => x.Id == id);
        if (produto is null)
            return NotFound("Produto não encontrado.");

        _appDbContext.Remove(produto);
        await _appDbContext.SaveChangesAsync();

        return Ok("Produto deletado.");
    }
}