using MevietLine.Data;
using MevietLine.Models;
using MevietLine.Models.BangMainViewModel;
using MevietLine.Models.LuuTruMuaViewModel;
using MevietLine.Models.RutTienViewModel;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SEMPJ2.Models.HoSoGiaoDichViewModels;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Drawing.Drawing2D;
using MevietLine.Models.EditIndexViewModel;
using MevietLine.Services;
using MevietLine.Models.MessageViewModel;
using MevietLine.Models.BankDataViewModel;
using MevietLine.Models.DataUserViewModel;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json.Linq;

namespace MevietLine.Areas.Admin.Controllers
{
    [Area("Admin")]

    public class AdminFbController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ICommon _iCommon;
        private readonly IWebHostEnvironment _iHostingEnvironment;


        public AdminFbController(ApplicationDbContext context, IConfiguration configuration, ICommon icommon, IWebHostEnvironment iHostingEnvironment)
        {
            _context = context;
            _configuration = configuration;
            _iCommon = icommon;
            _iHostingEnvironment = iHostingEnvironment;
        }
        [Authorize]

        public IActionResult Index()
        {
            ViewBag.checkActive = "trangChu";

            return View();
        }
        [HttpGet]
        public IActionResult ChangePassword()
        {
            ViewBag.checkActive = "mkAdmin";
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                string appSettingsPath = Path.Combine(_iHostingEnvironment.ContentRootPath, "appsettings.json");

                // Đọc nội dung của tệp appsettings vào một đối tượng JObject
                JObject appSettingsJson = JObject.Parse(System.IO.File.ReadAllText(appSettingsPath));

                // Cập nhật mật khẩu mới trong đối tượng appSettingsJson
                appSettingsJson["AdminUser"]["Password"] = model.NewPass;

                // Ghi lại nội dung của đối tượng appSettingsJson vào tệp appsettings
                System.IO.File.WriteAllText(appSettingsPath, appSettingsJson.ToString());

                return RedirectToAction("Index", "Admin");
            }

            return View(model);
        }
        //[HttpPost]
        //public async Task<IActionResult> Index(BangMainCRUDViewModels model)
        //{

        //}
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model.Username == _configuration["AdminUser:Username"] && model.Password == _configuration["AdminUser:Password"])
                {
                    var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, model.Username),
                new Claim(ClaimTypes.Role, "Admin")
            };

                    var claimsIdentity = new ClaimsIdentity(
                        claims, CookieAuthenticationDefaults.AuthenticationScheme);

                    var authProperties = new AuthenticationProperties
                    {
                        IsPersistent = (bool)model.RememberMe
                    };

                    await HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(claimsIdentity),
                        authProperties);

                    return RedirectToAction("Index", "AdminFb");
                }
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            }

            return View(model);
        }
        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return RedirectToAction("Login", "AdminFb");
        }
        [HttpGet]
        public IActionResult GetDataMua()
        {
            var a = from obj in _context.LuuTruMua
                    join _user in _context.DataUser on obj.UserId equals _user.Id
                    where obj.MuonBan == false
                    select new LuuTruMuaCRUDViewModels
                    {
                        Id = obj.Id,
                        UserId = _user.Id,
                        GiaMua = obj.GiaMua,
                        MuonBan = obj.MuonBan,
                        MuaCuaAi = obj.MuaCuaAi,
                        TenUser = _user.UserName,
                        SoLuongMua = obj.SoLuongMua,
                        SoTienThanhToan = obj.SoTienThanhToan
                    };
            return Ok(a.ToList());
        }

        [HttpGet]
        public IActionResult GetDataBan()
        {
            var a = from obj in _context.LuuTruBan
                    join _user in _context.DataUser on obj.UserId equals _user.Id
                    select new LuuTruMuaCRUDViewModels
                    {
                        Id = obj.Id,
                        UserId = _user.Id,
                        GiaMua = obj.GiaBan,
                        MuaCuaAi = obj.BanChoAi,
                        TenUser = _user.UserName,
                        SoLuongMua = obj.SoLuongBan,
                        SoTienThanhToan = obj.SoTienThanhToanBan
                    };
            return Ok(a.ToList());
        }

        // cập nhật số tiền khi có lệnh nạp
        [HttpPost]
        public async Task<IActionResult> CapNhatLenh([FromForm] HoSoGiaoDichCRUDViewModels _lenh)
        {
            try
            {
                var data = await _context.HoSoGiaoDich.FindAsync(_lenh.ID);
                data.TrangThaiGiaoDich = _lenh.TrangThaiGiaoDich;
                _context.Update(data);

                if (_lenh.TrangThaiGiaoDich == true)
                {
                    var dataUser = await _context.DataUser.FirstOrDefaultAsync(u => u.Id == _lenh.UserIDInfo);
                    if (dataUser != null)
                    {
                        dataUser.TienDangCo = dataUser.TienDangCo + _lenh.SoTienNap;

                        _context.Update(dataUser);
                    }
                    await _context.SaveChangesAsync();
                    return Ok(_lenh);
                }
                else
                {
                    return NotFound();
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // cập nhật số tiền khi có lệnh rut

        [HttpPost]
        public async Task<IActionResult> CapNhatLenhRut([FromForm] RutTien _lenh)
        {
            try
            {
                var data = await _context.RutTien.FindAsync(_lenh.Id);
                data.TrangThaiGiaoDich = _lenh.TrangThaiGiaoDich;
                _context.Update(data);

                if (_lenh.TrangThaiGiaoDich == true)
                {
                    //var dataUser = await _context.DataUser.FirstOrDefaultAsync(u => u.Id == _lenh.UserId);
                    //if (dataUser != null)
                    //{
                    //    dataUser.TienDangCo = dataUser.TienDangCo - _lenh.SoTienRut;
                    //    _context.Update(dataUser);
                    //}
                    await _context.SaveChangesAsync();
                    return Ok(_lenh);
                }
                else
                {
                    return NotFound();
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        // cập nhật bảng
        [HttpPost]
        public async Task<IActionResult> CapNhatBangMain([FromForm] BangMainCRUDViewModels _bang)
        {
            try
            {
                var data = await _context.BangMain.FindAsync(_bang.Id);
                if (data == null)
                {
                    return NotFound();

                }
                data.NguoiBan = _bang.NguoiBan;
                data.SoLuongTaiKhoan = _bang.SoLuongTaiKhoan;
                data.GiaCa = _bang.GiaCa;
                data.MaCode = _bang.MaCode;
                _context.Update(data);
                await _context.SaveChangesAsync();
                return Ok(_bang);


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> EditBankData(int id)
        {

            if (id > 0)
            {
                try
                {
                    var vm = await _context.BankData.Where(x => x.Id == id).FirstOrDefaultAsync();
                    if (vm == null)
                    {
                        return BadRequest("Không tìm thấy đối tượng với ID tương ứng");
                    }
                    return Ok(vm);

                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }

            }
            else
            {
                return NotFound();
            }


        }
        // cập nhật bank
        [HttpPost]
        public async Task<IActionResult> EditBankData([FromForm] BankDataCRUDViewModels model)
        {
            try
            {
                var data = await _context.BankData.FindAsync(model.Id);

                if (data == null)
                {
                    BankData vm = new BankData();
                    vm.Id = model.Id;
                    vm.BankName = model.BankName;
                    vm.TaiKhoanBank = model.TaiKhoanBank;
                    vm.TokenBank = model.TokenBank;
                    vm.TenTaiKhoan = model.TenTaiKhoan;
                    _context.Add(vm);
                    await _context.SaveChangesAsync();

                    return Ok(model);

                }
                data.BankName = model.BankName;
                data.TaiKhoanBank = model.TaiKhoanBank;
                data.TenTaiKhoan = model.TenTaiKhoan;
                data.TokenBank = model.TokenBank;
                _context.Update(data);
                await _context.SaveChangesAsync();
                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        // Xóa bank
        [HttpPost]
        public async Task<IActionResult> XoaBank([FromForm] BankDataCRUDViewModels _bang)
        {
            try
            {
                var data = await _context.BankData.FindAsync(_bang.Id);
                if (data == null)
                {
                    return NotFound();

                }
                _context.Remove(data);
                await _context.SaveChangesAsync();
                return Ok(_bang);


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        // Xóa sản phẩm
        [HttpPost]
        public async Task<IActionResult> XoaBangMain([FromForm] BangMainCRUDViewModels _bang)
        {
            try
            {
                var data = await _context.BangMain.FindAsync(_bang.Id);
                if (data == null)
                {
                    return NotFound();

                }
                _context.Remove(data);
                await _context.SaveChangesAsync();
                return Ok(_bang);


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        // Xóa user
        [HttpPost]
        public async Task<IActionResult> XoaUserMain([FromForm] DataUserCRUDViewModels _bang)
        {
            try
            {
                var data = await _context.DataUser.FindAsync(_bang.Id);
                if (data == null)
                {
                    return NotFound();

                }
                _context.Remove(data);
                await _context.SaveChangesAsync();
                return Ok(_bang);


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet]
        // lấy tất cả giao dịch nạp tiền
        // api
        public async Task<IActionResult> HoSoXuLyData()
        {
            var _GetGridItem = GetGridItemNap();

            return Ok(_GetGridItem);

        }
        // lấy tất cả giao dịch nạp tiền
        private IQueryable<HoSoGiaoDichCRUDViewModels> GetGridItemNap()
        {
            try
            {
                return (from hoSo in _context.HoSoGiaoDich
                        join _user in _context.DataUser on hoSo.UserIDInfo equals _user.Id

                        select new HoSoGiaoDichCRUDViewModels
                        {
                            ID = hoSo.ID,
                            UserIDInfo = hoSo.UserIDInfo,
                            ThoiGianGiaoDich = hoSo.ThoiGianGiaoDich,
                            TrangThaiGiaoDich = hoSo.TrangThaiGiaoDich,
                            MoTa = hoSo.MoTa,
                            SoTienNap = hoSo.SoTienNap,
                            TenUserDisplay = _user.UserName,
                            CodeLenh = hoSo.CodeLenh


                        }).OrderByDescending(x => x.ID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public async Task<IActionResult> HoSoXuLyRut()
        {
            var _GetGridItemRut = GetGridItemRut();

            return Ok(_GetGridItemRut);

        }
        // lấy tất cả giao dịch rút tiền

        private IQueryable<RutTienCRUDViewModels> GetGridItemRut()
        {
            try
            {
                return (from hoSo in _context.RutTien
                        join _user in _context.DataUser on hoSo.UserId equals _user.Id
                        select new RutTienCRUDViewModels
                        {
                            Id = hoSo.Id,
                            TenBankUser = hoSo.TenBankUser,
                            STKBankUser = hoSo.STKBankUser,
                            SoTienRut = hoSo.SoTienRut,
                            UserId = hoSo.UserId,
                            ThoiGianRut = hoSo.ThoiGianRut,
                            TrangThaiGiaoDich = hoSo.TrangThaiGiaoDich,
                            TenUser = _user.UserName,
                            TenChuTK = hoSo.TenChuTK

                        }).OrderByDescending(x => x.Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Authorize]

        public IActionResult HistoryTransaction()
        {
            ViewBag.checkActive = "lichSu";
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> HistoryTransaction(BangMainCRUDViewModels model)
        {
            if (ModelState.IsValid)
            {
                model.UserId = 1;
                model.Cancel = false;
                BangMain _bang = new BangMain();
                _bang.Id = model.Id;
                _bang.NguoiBan = model.NguoiBan;
                _bang.GiaCa = model.GiaCa;
                _bang.Cancel = model.Cancel;
                _bang.UserId = model.UserId;
                _context.Add(_bang);
                await _context.SaveChangesAsync();
            }
            return Ok(model);

        }
        [Authorize]
        [HttpGet]

        public IActionResult DanhSachSanPhamList()
        {
            var a = _context.BangMain.OrderByDescending(item => item.Id).ToList();

            return Ok(a);
        }
        public IActionResult DanhSachSanPham()
        {
            ViewBag.checkActive = "sanPham";

            return View();
        }
        [Authorize]

        public IActionResult ChatAdminView()
        {
            ViewBag.checkActive = "chat";

            return View();
        }
        [Authorize]

        public IActionResult DepositAndWithdrawalOrders()
        {
            ViewBag.checkActive = "napRut";

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> DepositAndWithdrawalOrders(BangMainCRUDViewModels model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    model.UserId = 1;
                    model.Cancel = false;
                    BangMain _bang = new BangMain();
                    _bang.Id = model.Id;
                    _bang.NguoiBan = model.NguoiBan;
                    _bang.GiaCa = model.GiaCa;
                    _bang.Cancel = model.Cancel;
                    _bang.UserId = model.UserId;
                    _bang.SoLuongTaiKhoan = model.SoLuongTaiKhoan;
                    _bang.MaCode = model.MaCode;
                    _context.Add(_bang);
                    await _context.SaveChangesAsync();
                    return Ok(model);

                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
        [Authorize]

        public IActionResult EditIndex()
        {
            ViewBag.checkActive = "chinhSua";
            return View();
        }
        [Authorize]

        public IActionResult ControlUser()
        {
            ViewBag.checkActive = "control";
            return View();
        }
        [HttpGet]
        public IActionResult GetBankInfo()
        {
            var a = _context.BankData.ToList();
            return Ok(a);

        }
        [HttpGet]
        public IActionResult GetAllUserInfo()
        {
            var a = _context.DataUser.ToList();
            return Ok(a);

        }

        [HttpPost]
        public async Task<IActionResult> GetAllUserInfoID([FromForm] DataUserCRUDViewModels user)
        {



            try
            {
                var data = await _context.DataUser.FindAsync(user.Id);

                if (data == null)
                {


                    return NotFound();

                }
                data.TienDangCo = user.TienDangCo;
                data.SoDiem = user.SoDiem;


                _context.Update(data);
                await _context.SaveChangesAsync();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }



        }
        [HttpPost]
        public async Task<IActionResult> ChangePass([FromForm] DataUserCRUDViewModels _data)
        {
            try
            {
                var data = await _context.DataUser.FindAsync(_data.Id);

                if (data != null)
                {
                    data.Password = _iCommon.GetMD5(_data.Password);
                    _context.DataUser.Update(data);
                    _context.SaveChanges();
                    return Ok(_data);
                }
                return NotFound();

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
        [HttpGet]
        public async Task<IActionResult> GetAllUserInfoID(int id)
        {

            if (id > 0)
            {
                try
                {
                    var vm = await _context.DataUser.Where(x => x.Id == id).FirstOrDefaultAsync();
                    if (vm == null)
                    {
                        return BadRequest("Không tìm thấy đối tượng với ID tương ứng");
                    }
                    return Ok(vm);

                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }

            }
            else
            {
                return NotFound();
            }


        }


        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetLogo()
        {
            var a = _context.EditIndex.FirstOrDefault();
            return Ok(a);

        }
        [HttpPost]
        public async Task<IActionResult> EditIndex([FromForm] EditIndexCRUDViewModels model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    EditIndex edit = await _context.EditIndex.FirstOrDefaultAsync(u => u.Id == 1);
                    if (edit != null)
                    {
                        if (model.pathSlider1File != null)
                        {
                            var pathSlider1File = await _iCommon.UploadedFile(model.pathSlider1File);
                            edit.pathSlider1 = "/upload/" + pathSlider1File;
                        }
                        if (model.pathLogoFile != null)
                        {
                            var pathLogoFile = await _iCommon.UploadedFile(model.pathLogoFile);
                            edit.pathLogo = "/upload/" + pathLogoFile;
                        }
                        if (model.pathSlider2File != null)
                        {
                            var pathSlider2File = await _iCommon.UploadedFile(model.pathSlider2File);
                            edit.pathSlider2 = "/upload/" + pathSlider2File;
                        }
                        if (model.pathSlider3File != null)
                        {
                            var pathSlider3File = await _iCommon.UploadedFile(model.pathSlider3File);
                            edit.pathSlider3 = "/upload/" + pathSlider3File;
                        }
                        if (model.ChuNgang != null)
                        {
                            edit.ChuNgang = model.ChuNgang;
                        }
                        if (model.SoDienThoai != null && model.DiaChi != null && model.Gmail != null)
                        {
                            edit.SoDienThoai = model.SoDienThoai;
                            edit.DiaChi = model.DiaChi;
                            edit.Gmail = model.Gmail;
                        }
                        if (model.HeaderBang != null)
                        {
                            edit.HeaderBang = model.HeaderBang;
                        }
                        if (model.thead1 != null || model.thead2 != null || model.thead3 != null || model.thead4 != null)
                        {
                            edit.thead1 = model.thead1;
                            edit.thead2 = model.thead2;
                            edit.thead3 = model.thead3;
                            edit.thead4 = model.thead4;
                        }
                        if (model.pathQrFile != null)
                        {
                            var pathQr = await _iCommon.UploadedFile(model.pathQrFile);
                            edit.pathQr = "/upload/" + pathQr;
                        }
                        if(model.LuuY != null)
                        {
                            edit.LuuY = model.LuuY;
                        }
                        _context.Update(edit);

                        await _context.SaveChangesAsync();

                    }
                    return Ok(model);

                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetMessageByUser(string room)
        {
            int romId = int.Parse(room);
            var allHistoryUser = (from _mess in _context.Message
                                  where _mess.ToRoomId == romId
                                  select new MessageViewModel
                                  {
                                      ToRoomId = _mess.ToRoomId,
                                      Content = _mess.Content,
                                      FromUser = _mess.FromUser,
                                      Timestamp = _mess.Timestamp,
                                      Id = _mess.Id,
                                      UserName = _context.DataUser.FirstOrDefault(x => x.Id == _mess.FromUser)!.UserName ?? "admin"
                                  }).ToList();
            return Ok(allHistoryUser);
        }

    }
}
