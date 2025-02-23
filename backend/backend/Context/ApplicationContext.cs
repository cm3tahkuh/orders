using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Context
{
    public class ApplicationContext : DbContext
    {

        public DbSet<Form> Forms { get; set; }
        public DbSet<Order> Orders { get; set; }


        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

    }
}
