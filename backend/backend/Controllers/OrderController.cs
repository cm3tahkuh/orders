using backend.Context;
using backend.Models;
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

        public async Task<List<Order>> GetOrdersAsync()
        {
            return await _context.Orders.ToListAsync();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Order>> GetOrderByIdAsync(Guid id)
        {
            var result = await _context.Orders.FirstOrDefaultAsync(item => item.Id == id);

            
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

    }
}
