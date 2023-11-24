using System.Data;

namespace MevietLine.Models.LuuTruBanViewModel
{
    public class LuuTruBanCRUDViewModels
    {
        public int Id { get; set; }
        public int? UserId { get; set; }

        public decimal GiaBan { get; set; }
        public string BanChoAi { get; set; }
        public decimal SoLuongBan { get; set; }
        public decimal SoTienThanhToanBan { get; set; }
        public string MaCodeBan { get; set; }



        public static implicit operator LuuTruBanCRUDViewModels(LuuTruBan _luuTru)
        {
            return new LuuTruBanCRUDViewModels
            {
                Id = _luuTru.Id,
                UserId = _luuTru.UserId,
                GiaBan = _luuTru.GiaBan,
                BanChoAi = _luuTru.BanChoAi,
                SoLuongBan = _luuTru.SoLuongBan,
                SoTienThanhToanBan = _luuTru.SoTienThanhToanBan,
                MaCodeBan = _luuTru.MaCodeBan
            };
        }

        public static implicit operator LuuTruBan(LuuTruBanCRUDViewModels vm)
        {
            return new LuuTruBan
            {
                Id = vm.Id,
                UserId = vm.UserId,
                GiaBan = vm.GiaBan,
                BanChoAi = vm.BanChoAi,
                SoLuongBan = vm.SoLuongBan,
                SoTienThanhToanBan = vm.SoTienThanhToanBan,
                MaCodeBan = vm.MaCodeBan


            };
        }
    }
}
