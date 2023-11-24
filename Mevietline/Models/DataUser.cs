using System.ComponentModel.DataAnnotations;

namespace MevietLine.Models
{
    public class DataUser
    {
        public int? Id { get; set; }
        public decimal? TienDangCo { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public decimal SoDiem { get; set; }

	}
}
