namespace MevietLine.Models
{
    public class RutTien
    {
        public int Id { get;set; }
        public string? TenBankUser { get;set; }
        public string? STKBankUser { get;set; }
        public decimal SoTienRut { get;set; }
        public int UserId { get; set; }
        public DateTime? ThoiGianRut { get; set; }
        public bool TrangThaiGiaoDich { get; set; }
        public string? TenChuTK { get; set; }

    }
}
