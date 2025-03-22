using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public EmployeeController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpPost]

        public async Task<IActionResult> RegisterEmployeeAsync([FromBody] Employee employee)
        {

            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return Ok("Сотрудник успешно зарегестрирован!");

        }

        [HttpGet]

        public async Task<IActionResult> GetAllEmployeesAsync()
        {
            var result = await _context.Employees.Include(x => x.User).ToListAsync();

            return Ok(result);
        }


    }
}
