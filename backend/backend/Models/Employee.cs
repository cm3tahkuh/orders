namespace backend.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Phone { get; set; }
        public User User { get; set; }

        public ICollection<Order>? Orders { get; set; } = new List<Order>();
    }
}
