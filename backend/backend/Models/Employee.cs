namespace backend.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public ICollection<Order>? Orders { get; set; } = new List<Order>();
    }
}
