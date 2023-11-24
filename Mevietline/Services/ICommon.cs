using Microsoft.AspNetCore.Identity;
using System.Drawing;
using System.Collections;
using MevietLine.Models;
namespace MevietLine.Services
{
    public interface ICommon
    {
        Task<string> UploadedFile(IFormFile ProfilePicture);
        string GetMD5(string str);

        void SendEmail(DataUser request);
        string GenerateToken();
        void ChangePassword(string newPassword);
    }
}
