using backend.Context;
using backend.Models;
using backend.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{

    [Route("[controller]")]
    public class FormController : ControllerBase
    {
        private ApplicationContext _context;

        public FormController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<List<Form>> GetFormsAsync()
        {
            var result = await _context.Forms.ToListAsync();
            return result;
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
                CreatedAt = DateTime.Now
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            return Ok("Заявка была успешно отправлена!");

            
        }


        [HttpDelete]

        public async Task<IActionResult> DeleteAllAsync()
        {
            var result = await _context.Forms.ToListAsync();
            _context.Forms.RemoveRange(result); 
            await _context.SaveChangesAsync();
            return Ok("Поздравляю. Вы всё удалили...");
        }
    }
}
