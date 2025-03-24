using System.Formats.Asn1;
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
            return Ok(new {message = $"Сотрудник ${employee.User.UserName} успешно зарегестрирован!" });

        }

        [HttpGet]

        public async Task<IActionResult> GetAllEmployeesAsync()
        {
            var result = await _context.Employees.Include(x => x.User).ToListAsync();

            return Ok(result);
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditUserByIdAsync(Guid id, [FromBody] Employee employee)
        {


            var existingEmployee = await _context.Employees.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == id);

            existingEmployee.FirstName = employee.FirstName;
            existingEmployee.LastName = employee.LastName;
            existingEmployee.Phone = employee.Phone;

       
            if (existingEmployee.User != null)
            {
                existingEmployee.User.UserName = employee.User.UserName;
                existingEmployee.User.Password = employee.User.Password;
                existingEmployee.User.Role = employee.User.Role;
            }

            _context.Entry(existingEmployee).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new {message = $"Данные пользователя {existingEmployee.User.UserName} успешно обновлены!"});
        }

        [HttpDelete]

        public async Task<IActionResult> DeleteEmployeeByIdAsync([FromBody] Guid id)
        {
            var result = await _context.Employees.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == id);

            _context.Employees.Remove(result);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Пользователь {result.User.UserName} удален из системы" });
        }


        [HttpPost("{orderId}/assign")]
        public async Task<IActionResult> AssignEmployeesToOrder(Guid orderId, [FromBody] List<Guid> employeeIds)
        {
            var order = await _context.Orders.Include(o => o.Employee).FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            var employees = await _context.Employees.Where(e => employeeIds.Contains(e.Id)).ToListAsync();

            if (employees.Count != employeeIds.Count)
            {
                return NotFound("Some employees not found");
            }

            
            foreach (var employee in employees)
            {
                order.EmployeeId = employee.Id; 
                employee.Orders.Add(order); 
            }

            await _context.SaveChangesAsync();

            return Ok("Employees assigned to order successfully");
        }


        [HttpGet("{orderId}/employees")]
        public async Task<IActionResult> GetEmployeesForOrder(Guid orderId)
        {
            var order = await _context.Orders
                .Include(o => o.Employee)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            var employees = await _context.Employees
                .Where(e => e.Orders.Any(o => o.Id == orderId))
                .ToListAsync();

            return Ok(employees);
        }

    }
}
