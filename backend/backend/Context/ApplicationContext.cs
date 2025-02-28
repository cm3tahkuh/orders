using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Context
{
    public class ApplicationContext : DbContext
    {

        public DbSet<Form> Forms { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Employee> Employees { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
                
        }
    }
}
