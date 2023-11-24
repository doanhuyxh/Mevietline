﻿using MevietLine.Data;
using MevietLine.Models;
using MevietLine.Models.RoomViewModel;
using MevietLine.Models.MessageViewModel;
using MevietLine.Models.DataUserViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.IdentityModel.Tokens;

namespace MevietLine.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _context;

        public ChatHub(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SendMessage(string user, string message)
        {
            int fromUser = 0;
            if (!string.IsNullOrEmpty(user))
            {
                int userId = _context.DataUser.FirstOrDefault(x => x.UserName == user).Id ?? 0;
                Message messages = new();
                messages.Timestamp = DateTime.Now;
                messages.ToRoomId = userId;
                messages.Content = message;
                messages.FromUser = userId;
                await _context.AddAsync(messages);
                await _context.SaveChangesAsync();
                fromUser = userId;
            }

            await Clients.All.SendAsync("ReceiveMessage", user, message, fromUser);
        }


        public async Task HistoryChat(string user)
        {
            int roomcreateId = _context.DataUser.FirstOrDefault(x => x.UserName.Contains(user))!.Id ?? 0;
            var history = await _context.Message.Where(x => x.ToRoomId == roomcreateId).ToListAsync();
            await Clients.All.SendAsync("ReceiveMessageHistory", user, history);
        }


        //phần của admin
        public async Task SendMessageAdmin(string user_nguoiDung, string mesage)
        {
            if (!string.IsNullOrEmpty(user_nguoiDung))
            {
                int userId = _context.DataUser.FirstOrDefault(x => x.UserName == user_nguoiDung)!.Id ?? 0;
                Message messages = new();
                messages.Timestamp = DateTime.Now;
                messages.ToRoomId = userId;
                messages.Content = mesage;
                messages.FromUser = 9;
                await _context.AddAsync(messages);
                await _context.SaveChangesAsync();
            }
            await Clients.All.SendAsync("ReceiveMessageAdmin", user_nguoiDung, mesage);

        }

        public async Task HistoryChatAdmin()
        {
            var allHistory = (from _mess in _context.Message
                              select new MessageViewModel
                              {
                                  UserName = "admin",
                                  ToRoomId = _mess.ToRoomId,
                                  Content = _mess.Content,
                                  FromUser = _mess.FromUser,
                                  Timestamp = _mess.Timestamp,
                                  Id = _mess.Id
                              }).ToList();
            foreach (var item in allHistory)
            {
                var dataUser = await _context.DataUser.FirstOrDefaultAsync(x => x.Id == item.ToRoomId);
                if (dataUser != null)
                {
                    item.UserName = dataUser.UserName;
                }
            }

            var history = allHistory.GroupBy(x => x.ToRoomId);
            await Clients.All.SendAsync("ReceiveMessageHistoryAdmin", history);
        }
    }


    public class SignalRReconnectMiddleware
    {
        private readonly RequestDelegate _next;

        public SignalRReconnectMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            var token = httpContext.RequestAborted;
            while (true)
            {
                try
                {
                    await _next(httpContext);
                    return;
                }
                catch (OperationCanceledException ex)
                {
                    if (ex.CancellationToken == token)
                    {
                        throw;
                    }
                    // Reconnect on cancelation exception
                    await Task.Delay(TimeSpan.FromSeconds(1));
                }
            }
        }
    }

}
