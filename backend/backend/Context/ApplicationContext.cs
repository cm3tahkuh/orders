using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Models.Enums;
using System;

namespace backend.Context
{
    public class ApplicationContext : DbContext
    {

        public DbSet<Form> Forms { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            if (Database.EnsureCreated())
            {

                if (!Users.Any())
                {
                    var adminUser = new User
                    {
                        Id = Guid.NewGuid(),
                        UserName = "admin",
                        Password = "admin",
                        Role = RoleType.ГлавныйАдминистратор
                    };


                    Users.Add(adminUser);

                    SaveChanges();
                }
            }
        }

   
    }
}
