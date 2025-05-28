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
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            funcionario.Telefone = string.IsNullOrWhiteSpace(funcionario.Telefone) ? null : funcionario.Telefone;

            await _appDbContext.Funcionarios.AddAsync(funcionario);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFuncionarioId), new { id = funcionario.Id }, funcionario);
        }
        catch (DbUpdateException ex)
        {
            // Log do erro (adicione isso no seu programa)
            Console.WriteLine($"Erro ao salvar no banco: {ex.InnerException?.Message}");
            return StatusCode(500, new { 
                success = false, 
                message = "Erro ao cadastrar funcionário",
                error = ex.InnerException?.Message 
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { 
                success = false, 
                message = "Erro interno no servidor",
                error = ex.Message 
            });
        }
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