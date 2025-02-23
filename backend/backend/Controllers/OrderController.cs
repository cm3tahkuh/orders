using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{

    [Route("[controller]")]
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

    }
}
