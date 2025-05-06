using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Context;
using SistemaRestaurante.Models;
using SistemaRestaurante.Models.Pessoa;

namespace SistemaRestaurante.Controllers
{

    [ApiController]
    [Route("api/funcionarios")]
    public class FuncionarioController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public FuncionarioController (AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task <IActionResult> AddFuncionario([FromBody] Funcionario funcionario)
        {
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            await _appDbContext.Funcionarios.AddAsync(funcionario);
            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, funcionario);
        }

        [HttpGet]
        public async Task <ActionResult<IEnumerable<Funcionario>>> GetFuncionario()
        {
            var funcionarios = await _appDbContext.Funcionarios.ToListAsync();

            return StatusCode(201, funcionarios);
        }

        [HttpGet("{id}")]
        public async Task <ActionResult<IEnumerable<Funcionario>>> GetFuncionarioId(int id)
        {
            var buscarFuncionario = await _appDbContext.Funcionarios.FindAsync(id);

            if(buscarFuncionario == null)
            {
                return NotFound("Funcionario não encontrado");
            }

            return StatusCode(201, buscarFuncionario);
        }

        [HttpPut("{id}")]
        public async Task <ActionResult> UpdateFuncionarioId (int id, [FromBody] Funcionario funcionarioAtualizado)
        {
            var buscarFuncionario = await _appDbContext.Funcionarios.FindAsync(id);

            if(buscarFuncionario == null)
            {
                return NotFound("Funcionario não encontrado");
            }

            _appDbContext.Entry(buscarFuncionario).CurrentValues.SetValues(funcionarioAtualizado);

            await _appDbContext.SaveChangesAsync();
            return Ok("Funcionario atualizado com sucesso");
        }

        [HttpDelete("{id}")]
        public async Task <ActionResult> DeleteFuncionarioId (int id, [FromBody] Funcionario funcionario)
        {
            var buscarFuncionario = await _appDbContext.Funcionarios.FindAsync(id);

            if(buscarFuncionario == null)
            {
                return NotFound("Funcionario não encontrado");
            }

            _appDbContext.Remove(buscarFuncionario);

            await _appDbContext.SaveChangesAsync();

            return Ok(buscarFuncionario);
        }


}
}