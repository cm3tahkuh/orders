using backend.Context;
using backend.Models;
using backend.Models.Dtos.User;
using backend.Services;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationContext _context;

        private readonly AuthService _service;
        
        
        public AuthController(ApplicationContext context, AuthService service)
        {
            _context = context;

            _service = service;

        }

        [HttpPost("register")]

        public async Task<IActionResult> RegisterUserAsync(UserRegisterDto userRegisterDto)
        {
            var entity = userRegisterDto.Adapt<User>();

            await _context.Users.AddAsync(entity);
            await _context.SaveChangesAsync();

            return Ok(entity);
        }

        [HttpPost("login")]

        public async Task<IActionResult> LoginUserAsync(UserLoginDto userLoginDto)
        {

            if (_service.Check(userLoginDto))
            {
                return Ok($"Вы уже вошли в систему под именем - {userLoginDto.UserName}");
            } 

            var result = await _context.Users.FirstOrDefaultAsync(user => user.UserName == userLoginDto.UserName && user.Password == userLoginDto.Password);

            if (result != null)
            {
                _service.Add(userLoginDto);
                return Ok($"{userLoginDto.UserName} Пользователь успешно авторизирован");
            }
            else
            {
                return BadRequest("Пользователя не существует");
            }

        }

        [HttpPost("logout")]

        public async Task<IActionResult> LogoutUserAsync(string name)
        {
            _service.Remove(name);

            return Ok("Вы успешно вышли из системы");
        }
    }
}
