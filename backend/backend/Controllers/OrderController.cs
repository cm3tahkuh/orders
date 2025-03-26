using backend.Context;
using backend.Models;
using backend.Models.Dtos.OrderDto;
using backend.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private ApplicationContext _context;
        public OrderController(ApplicationContext context)
        {
            _context = context;
        }



        [HttpGet]
        public async Task<List<OrderDto>> GetOrdersAsync()
        {
            var orders = await _context.Orders.Include(x => x.Employees).ToListAsync();


            var orderDtos = orders.Select(order => new OrderDto
            {
                Id = order.Id,
                Name = order.Name,
                Phone = order.Phone,
                Description = order.Description,
                Status = order.Status,
                CreatedAt = order.CreatedAt,
                CompletedAt = order.CompletedAt,
                Employees = order.Employees.Select(employee => new EmployeeDto
                {
                    Id = employee.Id,
                    FirstName = employee.FirstName,
                    LastName = employee.LastName,
                    Phone = employee.Phone
                }).ToList()
            }).ToList();

            return orderDtos;
        }


        [HttpGet("getOrdersByEmployeeId/{employeeId}")]
        public async Task<IActionResult> GetOrdersByEmployee(Guid employeeId)
        {

            var orders = await _context.Orders
                .Where(order => order.Employees.Any(e => e.Id == employeeId))
                .ToListAsync();


            if (orders == null || orders.Count == 0)
            {
                return NotFound("No orders found for the specified employee.");
            }

            return Ok(orders);
        }

        [HttpDelete("/deleteEmployeeInOrderId")]
        public async Task<IActionResult> deleteEmployeeInOrderId(Guid orderId, Guid employeeId)
        {

            var order = await _context.Orders
                .Include(o => o.Employees) 
                .FirstOrDefaultAsync(o => o.Id == orderId);


            if (order == null)
            {
                return NotFound("Order not found.");
            }

            var employee = order.Employees.FirstOrDefault(e => e.Id == employeeId);

            if (employee == null)
            {
                return NotFound("Employee not found in this order.");
            }

            order.Employees.Remove(employee);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Employee removed from the order." });
        }

        [HttpGet("getOneOrder/{id}")]

        public async Task<ActionResult<Order>> GetOrderByIdAsync(Guid id)
        {
            var result = await _context.Orders.Include(order => order.Employees).FirstOrDefaultAsync(item => item.Id == id);

            
                return Ok(result);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<Order>> DeleteOrderByIdAsync(Guid id)
        {
            var deleteItem = await _context.Orders.FirstOrDefaultAsync(item => item.Id == id);

            _context.Orders.Remove(deleteItem);
            await _context.SaveChangesAsync();


            return Ok(deleteItem);
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<Order>> UpdateOrderStatusByIdAsync(Guid id, OrderStatus status){

            var order = await _context.Orders.FirstOrDefaultAsync(item => item.Id == id);
 
            if (order == null)
            {
                return NotFound();
            }

            order.Status = status;

            await _context.SaveChangesAsync();

      
            return Ok(order);


        }






        [HttpPost("{orderId}/assign")]
        public async Task<IActionResult> AssignEmployeesToOrder(Guid orderId, [FromBody] List<Guid> employeeIds)
        {
            // Вызываем метод из сервиса (или прямо здесь, если не используете сервис)
            var result = await AssignEmployees(orderId, employeeIds);

            if (result.Success)
            {
                return Ok(result.Message);
            }
            else
            {
                return NotFound(result.Message); // Или BadRequest, в зависимости от типа ошибки
            }
        }

        [HttpGet("{orderId}/employees")]
        public async Task<IActionResult> GetEmployeesForOrder(Guid orderId)
        {
            var order = await _context.Orders
                .Include(o => o.Employees)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                return NotFound("Заявка не найдена");
            }

            // Получаем список сотрудников, связанных с заявкой.  Используем Select, чтобы извлечь только нужные поля.
            var employees = order.Employees
                .Select(e => new
                {
                    e.Id,
                    e.FirstName,
                    e.LastName,
                    e.Phone
                })
                .ToList();

            return Ok(employees);
        }

        //  Метод для назначения сотрудников на заявку.  Этот метод может быть вынесен в сервис.
        private async Task<(bool Success, string Message)> AssignEmployees(Guid orderId, List<Guid> employeeIds)
        {
            var order = await _context.Orders
                .Include(o => o.Employees)  // Загружаем связанных сотрудников
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                return (false, "Заявка не найдена.");
            }

            var employees = await _context.Employees
                .Where(employee => employeeIds.Contains(employee.Id)) // Загружаем сотрудников по их Id
                .ToListAsync();

            if (employees.Count != employeeIds.Count)
            {
                return (false, "Некоторые сотрудники не найдены.");
            }

            // Добавляем каждого сотрудника в коллекцию сотрудников этой заявки
            foreach (var employee in employees)
            {
                if (!order.Employees.Any(e => e.Id == employee.Id))  // Проверяем, чтобы сотрудник не был уже назначен
                {
                    order.Employees.Add(employee);  // Назначаем сотрудника на заявку
                    //employee.Orders.Add(order);  // НЕ НАДО, если вы используете соединительную таблицу
                }
            }

            await _context.SaveChangesAsync(); // Сохраняем изменения в базе данных

            return (true, "Сотрудники успешно назначены на заявку.");
        }

    }

}

