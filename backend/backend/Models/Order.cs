using backend.Models.Enums;

namespace backend.Models
{
    public class Order
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public OrderStatus Status { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? CompletedAt { get; set; }
        public Guid? EmployeeId { get; set; }
        public Employee? Employee { get; set; }
    }
}
