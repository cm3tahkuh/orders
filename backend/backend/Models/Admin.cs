namespace backend.Models
{
    public class Admin
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public ICollection<Order>? AssignedOrders { get; set; } = new List<Order>();
    }
}
