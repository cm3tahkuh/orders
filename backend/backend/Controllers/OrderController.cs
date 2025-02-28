using backend.Context;
using backend.Models;
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

    }
}
