using System;
using System.ComponentModel.DataAnnotations;

namespace MevietLine.Models.MessageViewModel
{
    public class MessageViewModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public int FromUser { get; set; }
        public int ToRoomId { get; set; }
        public string? UserName { get; set; }


        public static implicit operator MessageViewModel(Message ms)
        {
            return new MessageViewModel
            {
                Id = ms.Id,
                Content = ms.Content,
                Timestamp = ms.Timestamp,
                FromUser = ms.FromUser,
                ToRoomId = ms.ToRoomId,
            };
        }

        public static implicit operator Message(MessageViewModel vm)
        {
            return new Message
            {
                Id = vm.Id,
                Content = vm.Content,
                Timestamp = vm.Timestamp,
                FromUser = vm.FromUser,
                ToRoomId = vm.ToRoomId,
            };
        }
    }
}
