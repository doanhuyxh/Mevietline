
using MevietLine.Models;
using System.ComponentModel.DataAnnotations;
namespace MevietLine.Models.DataUserViewModel
{
    public class DataUserCRUDViewModels
    {
        public int? Id { get; set; }
        public decimal? TienDangCo { get; set; }
        [Required(ErrorMessage = "Vui lòng không để trống")]
        [RegularExpression(@"^[A-Za-z0-9]+$", ErrorMessage = "Không được chứa khoảng trắng hoặc ký tự tiếng Việt có dấu")]
        public string? UserName { get; set; }
		[Required(ErrorMessage ="Vui lòng không để trống")]
        [DataType(DataType.Password)]
        [RegularExpression(@"^[A-Za-z0-9]+$", ErrorMessage = "Không được chứa khoảng trắng hoặc ký tự tiếng Việt có dấu")]

        public string? Password { get; set; }

        [Required(ErrorMessage = "Vui lòng không để trống")]
        [Compare("Password", ErrorMessage = "Mật khẩu không giống")]
		[DataType(DataType.Password)]
		public string? ConfirmPassword { get; set; }
		public decimal SoDiem { get; set; }


        public static implicit operator DataUserCRUDViewModels(DataUser _UserData)
        {
            return new DataUserCRUDViewModels
            {
                Id = _UserData.Id,
                TienDangCo = _UserData.TienDangCo,
                UserName = _UserData.UserName,
                Password = _UserData.Password,
                SoDiem = _UserData.SoDiem


			};
        }

        public static implicit operator DataUser(DataUserCRUDViewModels vm)
        {
            return new DataUser
            {
                Id = vm.Id,
                TienDangCo = vm.TienDangCo,
                UserName = vm.UserName ?? string.Empty,
                Password = vm.Password ?? string.Empty,
                SoDiem = vm.SoDiem


        };
        }
    }
}
