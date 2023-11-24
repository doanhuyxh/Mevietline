using MevietLine.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace MevietLine.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<BangMain> BangMain { get; set; }
        public DbSet<LuuTruMua> LuuTruMua { get; set; }
        public DbSet<DataUser> DataUser { get; set; }
        public DbSet<BankData> BankData { get; set; }
        public DbSet<HoSoGiaoDich> HoSoGiaoDich { get; set; }
        public DbSet<LuuTruBan> LuuTruBan { get; set; }
        public DbSet<RutTien> RutTien { get; set; }
        public DbSet<EditIndex> EditIndex { get; set; }
        public DbSet<Room> Room { get; set; }
        public DbSet<Message> Message { get; set; }


    }
}
