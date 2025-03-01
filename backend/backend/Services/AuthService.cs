using backend.Models;
using backend.Models.Dtos.User;

namespace backend.Services
{
    public class AuthService
    {
        private List<UserLoginDto> _users = new List<UserLoginDto>();

        public bool Check(UserLoginDto userLoginDto) 
        {
            var result = _users.FirstOrDefault(x => x.UserName == userLoginDto.UserName && x.Password == userLoginDto.Password);

            if (result == null)
            {
                return false;
            }

            return true;
        }

        public void Add(UserLoginDto userLoginDto)
        {
            _users.Add(userLoginDto);
        }

        public void Remove(string name)
        {
            var result = _users.FirstOrDefault(x => x.UserName == name);
            _users.Remove(result);
        }

    }
}
