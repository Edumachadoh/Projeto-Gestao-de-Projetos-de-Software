using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Context;
using SistemaRestaurante.Models.Pessoa;

namespace SistemaRestaurante.Controllers;

[ApiController]
[Route("api/funcionarios")]
public class FuncionarioController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public FuncionarioController (AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost("cadastrar")]
    public async Task <IActionResult> AddFuncionario([FromBody] Funcionario funcionario)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _appDbContext.Funcionarios.AddAsync(funcionario);
        await _appDbContext.SaveChangesAsync();

        return StatusCode(201, funcionario);
    }

    [HttpGet]
    public async Task <ActionResult<IEnumerable<Funcionario>>> GetFuncionarios()
    {
        var funcionarios = await _appDbContext.Funcionarios.ToListAsync();

        return StatusCode(200, funcionarios);
    }

    [HttpGet("{id}")]
    public async Task <ActionResult<IEnumerable<Funcionario>>> GetFuncionarioId(int id)
    {
        var buscarFuncionario = await _appDbContext.Funcionarios.FindAsync(id);

        if(buscarFuncionario is null)
        {
            return NotFound("Funcionario não encontrado.");
        }

        return StatusCode(200, buscarFuncionario);
    }

    [HttpPut("{id}")]
    public async Task <ActionResult> UpdateFuncionario(int id, [FromBody] Funcionario funcionarioAtualizado)
    {
        var buscarFuncionario = await _appDbContext.Funcionarios.FindAsync(id);

        if(buscarFuncionario is null)
        {
            return NotFound("Funcionario não encontrado.");
        }

        _appDbContext.Entry(buscarFuncionario).CurrentValues.SetValues(funcionarioAtualizado);
        await _appDbContext.SaveChangesAsync();

        return Ok("Funcionario atualizado com sucesso.");
    }

    // ana: a lei não deixa você deletar funcionário... provavelmente vamos deixar um booleano EstaAtivo e setar como falso aqui. dai no GetFuncionarios a gente puxa um .Where(x => x.EstaAtivo == true) ou algo asi
    [HttpDelete("{id}")]
    public async Task <ActionResult> DeleteFuncionario(int id)
    {
        var buscarFuncionario = await _appDbContext.Funcionarios.FindAsync(id);
        if(buscarFuncionario is null)
        {
            return NotFound("Funcionario não encontrado.");
        }

        _appDbContext.Remove(buscarFuncionario);
        await _appDbContext.SaveChangesAsync();

        return Ok("Funcionário deletado.");
    }
}