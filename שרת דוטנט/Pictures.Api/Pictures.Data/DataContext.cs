using Microsoft.EntityFrameworkCore;
using Pictures.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(
               @"Server=bqgqdjwg9jfhcnndf24c-mysql.services.clever-cloud.com;Port=3306;Database=bqgqdjwg9jfhcnndf24c;User=uv3rtofdgyyvygzt;Password=lnTicPcA6V5ooSkynolX",
                new MySqlServerVersion(new Version(9, 0, 0))
            );
        }
        //public int SaveChanges()
        //{
        //    return base.SaveChanges();
        //}
    }
}
