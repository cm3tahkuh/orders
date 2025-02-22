using backend.Context;
using backend.Models;
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
        
        public async Task<Form> SendFormAsync(Form form)
        {
            await _context.Forms.AddAsync(form);
            await _context.SaveChangesAsync();
            return form;
        }

    }
}
