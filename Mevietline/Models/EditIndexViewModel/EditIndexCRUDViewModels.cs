using System.Data;

namespace MevietLine.Models.EditIndexViewModel
{
    public class EditIndexCRUDViewModels
    {
        public int Id { get; set; }

        public string? pathLogo { get; set; }
        public string? pathSlider1 { get; set; }
        public string? pathSlider2 { get; set; }
        public string? pathSlider3 { get; set; }
        public string? ChuNgang { get; set; }
        public string? DiaChi { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Gmail { get; set; }
        public string? HeaderBang { get; set; }
        public string? thead1 { get; set; }
        public string? thead2 { get; set; }
        public string? thead3 { get; set; }
        public string? thead4 { get; set; }
        public string? pathQr { get; set; }
        public string? LuuY { get; set; }


        public IFormFile? pathLogoFile { get; set; }
        public IFormFile? pathSlider1File { get; set; }
        public IFormFile? pathSlider2File { get; set; }
        public IFormFile? pathSlider3File { get; set; }
        public IFormFile? pathQrFile { get; set; }


        public static implicit operator EditIndexCRUDViewModels(EditIndex _luuTru)
        {
            return new EditIndexCRUDViewModels
            {
                Id = _luuTru.Id,
                pathLogo = _luuTru.pathLogo,
                pathSlider1 = _luuTru.pathSlider1,
                pathSlider2 = _luuTru.pathSlider2,
                pathSlider3 = _luuTru.pathSlider3,
                ChuNgang = _luuTru.ChuNgang,
                DiaChi = _luuTru.DiaChi,
                SoDienThoai = _luuTru.SoDienThoai,
                Gmail = _luuTru.Gmail,
                HeaderBang = _luuTru.HeaderBang,
                thead1 = _luuTru.thead1,
                thead2 = _luuTru.thead2,
                thead3 = _luuTru.thead3,
                thead4 = _luuTru.thead4,
                pathQr = _luuTru.pathQr,
                LuuY = _luuTru.LuuY,
            };
        }

        public static implicit operator EditIndex(EditIndexCRUDViewModels vm)
        {
            return new EditIndex
            {
                Id = vm.Id, 
                pathLogo = vm.pathLogo ?? string.Empty,
                pathSlider1 = vm.pathSlider1 ?? string.Empty,
                pathSlider2 = vm.pathSlider2 ?? string.Empty,
                pathSlider3 = vm.pathSlider3 ?? string.Empty,
                ChuNgang = vm.ChuNgang ?? string.Empty,
                DiaChi = vm.DiaChi ?? string.Empty,
                SoDienThoai = vm.SoDienThoai ?? string.Empty,
                Gmail = vm.Gmail ?? string.Empty,
                HeaderBang = vm.HeaderBang ?? string.Empty,
                thead1 = vm.thead1 ?? string.Empty,
                thead2 = vm.thead2 ?? string.Empty,
                thead3 = vm.thead3 ?? string.Empty,
                thead4 = vm.thead4 ?? string.Empty,
                pathQr = vm.pathQr ?? string.Empty,
                LuuY = vm.LuuY ?? string.Empty,



            };
        }
    }
}
