using backend.Context;
using backend.Models;
using backend.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class FormController : ControllerBase
    {
        private ApplicationContext _context;

        public FormController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpPost]
        
        public async Task<IActionResult> SendFormAsync([FromBody] Form form)
        {

            var order = new Order
            {
                Id = Guid.NewGuid(),
                Name = form.Name,
                Phone = form.Phone,
                Description = form.Description,
                Status = OrderStatus.Новая,
                CreatedAt = DateTimeOffset.Now,
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            return Ok("Заявка была успешно отправлена!");

            
        }


    }
}
