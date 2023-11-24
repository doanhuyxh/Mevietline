using MevietLine.Models;

namespace MevietLine.Models.RutTienViewModel
{
    public class RutTienCRUDViewModels
    {
        public int Id { get; set; }
        public string? TenBankUser { get; set; }
        public string? STKBankUser { get; set; }
        public decimal SoTienRut { get; set; }
        public int UserId { get; set; }
        public DateTime? ThoiGianRut { get; set; }
        public bool TrangThaiGiaoDich { get; set; }
        public string? TenUser { get; set; }

        public string? TenChuTK { get; set; }





        public static implicit operator RutTienCRUDViewModels(RutTien _rutTien)
        {
            return new RutTienCRUDViewModels
            {
                Id = _rutTien.Id,
                TenBankUser = _rutTien.TenBankUser,
                STKBankUser = _rutTien.STKBankUser,
                SoTienRut = _rutTien.SoTienRut,
                UserId = _rutTien.UserId,
                ThoiGianRut = _rutTien.ThoiGianRut,
                TrangThaiGiaoDich = _rutTien.TrangThaiGiaoDich,
                TenChuTK = _rutTien.TenChuTK


            };
        }

        public static implicit operator RutTien(RutTienCRUDViewModels vm)
        {
            return new RutTien
            {
                Id = vm.Id,
                TenBankUser = vm.TenBankUser,
                STKBankUser = vm.STKBankUser,
                SoTienRut = vm.SoTienRut,
                UserId = vm.UserId,
                ThoiGianRut = vm.ThoiGianRut,
                TrangThaiGiaoDich = vm.TrangThaiGiaoDich,
                TenChuTK = vm.TenChuTK




            };
        }
    }
}
