﻿using System.ComponentModel.DataAnnotations;

namespace MevietLine.Models
{
    public class BankData
    {
        public int Id { get; set; }
        public string BankName { get; set; }
        public string TaiKhoanBank { get; set; }
        public string TokenBank { get; set; }
        public string TenTaiKhoan { get; set; }
    }
}
