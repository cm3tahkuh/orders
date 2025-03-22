using backend.Context;
using backend.Models;
using backend.Models.Dtos.User;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{

    [Route("api/[controller]")]

    public class UserController : ControllerBase
    {

        private readonly ApplicationContext _context;

        public UserController(ApplicationContext context)
        {
            _context = context;   
        }

        [HttpGet]

        public async Task<IActionResult> GetAllUsersAsync()
        {
            var result = await _context.Users.ToListAsync();

            return Ok(result);
        }


    }
}
