"use strict";
//đặt cở check khi nào xong
$('#preloader').fadeIn();


var flagLoadedChat = false;
var currentUser = "";
var prevUser = '';
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();


connection.start().then(function () {
    connection.invoke("HistoryChatAdmin")
        .catch(function (err) {

        });
}).catch(function (err) {
    return;
});


//lịch roomchat có design
connection.on("ReceiveMessageHistoryAdmin", function (history) {
    let ul_dsChart = document.getElementById("DanhSachChart");
    if (history.length == 0) {
        $('#preloader').fadeOut();
        return;
    }
    //người dùng vô danh
    let liEmPtyUser = document.createElement("li");
    liEmPtyUser.classList.add("p-2", "border-bottom", "userID0");
    liEmPtyUser.innerHTML = `
    <a href="#!" class="d-flex justify-content-between" onclick="ChooseUserNameByUser(0)">
                                                    <div class="d-flex flex-row">
                                                        <div>
                                                            <img src="/user.png"
                                                                 alt="avatar" class="d-flex align-self-center me-3" width="60">
                                                            <span class="badge bg-warning badge-dot"></span>
                                                        </div>
                                                        <div class="pt-1">
                                                            <p class="fw-bold mb-0">Khách lạ</p>
                                                        </div>
                                                    </div>
                                                    <div class="pt-1">
                                                        <span class="badge bg-danger rounded-pill float-end notification_Js"></span>
                                                    </div>
                                                </a>
    `
    //ul_dsChart.appendChild(liEmPtyUser);

    // người dùng đăng nhập
    history.forEach(item => {
        let li = document.createElement("li");
        li.classList.add("p-2", "border-bottom", `userID${item[0].fromUser}`);
        li.innerHTML = `
            <a href="#!" class="d-flex justify-content-between" onclick="ChooseUserNameByUser(${item[0].toRoomId})">
                                                    <div class="d-flex flex-row">
                                                        <div>
                                                            <img src="/user.png"
                                                                 alt="avatar" class="d-flex align-self-center me-3" width="60">
                                                            <span class="badge bg-warning badge-dot"></span>
                                                        </div>
                                                        <div class="pt-1">
                                                            <p class="fw-bold mb-0">${item[0].userName}</p>
                                                        </div>
                                                    </div>
                                                    <div class="pt-1">
                                                        
                                                        <span class="badge bg-danger rounded-pill float-end notification_Js" ></span>
                                                    </div>
                                                </a>
            `;
        ul_dsChart.appendChild(li);
        $('#preloader').fadeOut();
    });

})

connection.on("ReceiveMessage", function (user, message, userid) {

    if (userid != 0) {
        //thêm vào danh sách nếu chưa tồn tại đối với tài khoản có tồn tại trong hệ thống
        if (document.getElementById("DanhSachChart").querySelector(`.userID${userid}`) == null) {
            let ul_dsChart2 = document.getElementById("DanhSachChart");
            //người dùng vô danh
            let liEmPtyUser1 = document.createElement("li");
            liEmPtyUser1.classList.add("p-2", "border-bottom", `userID${userid}`);
            liEmPtyUser1.innerHTML = `
    <a href="#!" class="d-flex justify-content-between text-decoration-none" onclick="ChooseUserNameByUser(${userid})">
                                                    <div class="d-flex flex-row">
                                                        <div>
                                                            <img src="/user.png"
                                                                 alt="avatar" class="d-flex align-self-center me-3" width="60">
                                                            <span class="badge bg-warning badge-dot"></span>
                                                        </div>
                                                        <div class="pt-1">
                                                            <p class="fw-bold mb-0">${user}</p>
                                                        </div>
                                                    </div>
                                                    <div class="pt-1">
                                                        <span class="badge bg-danger rounded-pill float-end notification_Js"></span>
                                                    </div>
                                                </a>
    `
            ul_dsChart2.appendChild(liEmPtyUser1);

        };
    }

    if (user != currentUser) {
        document.getElementById(`DanhSachChart`).querySelector(`.userID${userid}`).querySelector(".notification_Js").innerHTML = "1";
        document.getElementById(`DanhSachChart`).insertBefore(document.getElementById(`DanhSachChart`).querySelector(`.userID${userid}`), document.getElementById(`DanhSachChart`).firstChild)
        return;
    }

    var div = document.createElement("div");
    div.innerHTML = `
    <div class="d-flex flex-row justify-content-start">
                                        <img src="/user.png"
                                             alt="avatar 1" style="width: 45px; height: 100%;">
                                        <div>
                                            <p class="small p-2 ms-3 mb-1 rounded-3 text-dark" style="background-color: #f5f6f7;">
                                                ${message}
                                            </p>
                                            <p class="small ms-3 mb-3 rounded-3 text-muted float-end">${(new Date(Date.now())).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>
    `;
    document.getElementById("Chat_Message_Box").appendChild(div);
    document.getElementById("Chat_Message_Box").scrollTop = document.getElementById("Chat_Message_Box").scrollHeight;

});

connection.on("ReceiveMessageAdmin", function (user, message) {
    var div = document.createElement("div");
    div.innerHTML = `
     <div class="d-flex flex-row justify-content-end">
                                        <img src="/adminaa.jpg"
                                             alt="avatar 1" style="width: 45px; height: 100%;">
                                        <div>
                                            <p class="small p-2 ms-3 mb-1 text-white rounded-3 bg-primary">
                                                ${message}
                                            </p>
                                            <p class="small ms-3 mb-3 rounded-3 text-muted float-end">${(new Date(Date.now())).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>
    `;
    document.getElementById("Chat_Message_Box").appendChild(div);
    document.getElementById("Chat_Message_Box").scrollTop = document.getElementById("Chat_Message_Box").scrollHeight;

});

//hiển thị lịch sử chát cũng như giao diện chat
function ChangeChatMessageBox(listChatHistory) {
    const boxChat = document.getElementById("Chat_Message_Box");
    var html = '';
    listChatHistory.forEach(item => {
        html += item.userName == "admin" ? `
            <div class="d-flex flex-row justify-content-end">
                                        <img src="/adminaa.jpg"
                                             alt="avatar 1" style="width: 45px; height: 100%;">
                                        <div>
                                            <p class="small p-2 ms-3 mb-1 text-white rounded-3 bg-primary">
                                                ${item.content}
                                            </p>
                                            <p class="small ms-3 mb-3 rounded-3 text-muted float-end">${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>
        `: `
        <div class="d-flex flex-row justify-content-start">
                                        <img src="/user.png"
                                             alt="avatar 1" style="width: 45px; height: 100%;">
                                        <div>
                                            <p class="small p-2 ms-3 mb-1 rounded-3 text-dark" style="background-color: #f5f6f7;">
                                                ${item.content}
                                            </p>
                                            <p class="small ms-3 mb-3 rounded-3 text-muted float-end">${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>
        `
    });
    boxChat.innerHTML = html;
    document.getElementById("Chat_Message_Box").scrollTop = document.getElementById("Chat_Message_Box").scrollHeight;
    document.getElementById("BoxTextChat").style.visibility = "unset";
}

function ChooseUserNameByUser(user) {
    document.getElementById(`DanhSachChart`).querySelector(`.userID${user}`).querySelector(".notification_Js").innerHTML = ""
    if (prevUser) {
        document.getElementById(`DanhSachChart`).querySelector(`.userID${prevUser}`).classList.remove("activeChat");
    }
    document.getElementById(`DanhSachChart`).querySelector(`.userID${user}`).classList.add("activeChat");
    prevUser = user;
    if (user == 0) {
        document.getElementById("Chat_Message_Box").innerHTML = "";
        document.getElementById("BoxTextChat").style.visibility = "unset";
        flagLoadedChat = true;
        currentUser = "";
        return;
    }

    fetch(`/AdminFb/GetMessageByUser?room=${user}`).then(res => res.json()).then(data => {
        ChangeChatMessageBox(data);
        //document.getElementById("Chat_Message_Box").scrollTop = document.getElementById("Chat_Message_Box").scrollHeight;
        flagLoadedChat = true;
        currentUser = data[0].userName;
    })

}

var addEven = setInterval(function () {
    if (flagLoadedChat) {

        let con2 = connection;
        document.getElementById("btnsend").addEventListener("click", function (event) {

            let user = currentUser;
            let message = document.getElementById("ValueSend").value;
            if (!(!message.trim())) {
                con2.invoke("SendMessageAdmin", user, message).then(data => { document.getElementById("ValueSend").value = ""; return data })
                    .catch(function (err) {
                        return console.error(err.toString());
                    });
            }
            event.preventDefault();
        });

        clearInterval(addEven);
        flagLoadedChat = false

    }
}, 1000);


connection.onclose(function (error) {
    console.log('Connection closed due to error: ' + error);
    connection.start().then(function () {
        console.log('reconnected');
    }).catch(function (error) {
        console.error(error);
    });

});



window.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter

        document.getElementById("btnsend").click(); // Kích hoạt sự kiện click cho nút btnsend
    }
});
function XoaDuLieu() {
    axios.get("/Home/clearDataChat")
        .then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Đã lưu  thành công',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                    
                }
            });
        })
}
// hàm sử lý file ảnh
function compressImage(file) {
    const maxSize = 4320;
    const outputType = "image/jpeg";
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            let img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");


                let newWidth = img.width;
                let newHeight = img.height;
                if (newWidth > maxSize || newHeight > maxSize) {
                    let scale = Math.min(maxSize / newWidth, maxSize / newHeight);
                    newWidth *= scale;
                    newHeight *= scale;
                }
;


                canvas.width = newWidth;
                canvas.height = newHeight;


                ctx.drawImage(img, 0, 0, newWidth, newHeight);


                let outputDataUrl = canvas.toDataURL(outputType);


                resolve(outputDataUrl);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}


let fileInput = document.getElementById("img_send");
fileInput.addEventListener("change", async () => {
    let file = fileInput.files[0];
    if (file.size > 3840 * 2440) {
        alert("ảnh giới hạn dưới 10MB");
        return;
    }
    let compressedDataUrl = await compressImage(file);
    let message = `
              <img src="${compressedDataUrl}" onclick="openImage('${compressedDataUrl}')" style="width: 80px; height: auto;" />
            `;
    console.log("gui", message.length);

    connection.invoke("SendMessageAdmin", currentUser, message.trim()).then(data => { document.getElementById("img_send").value = ""; return data })
        .catch(function (err) {
            return console.error(err.toString());
        });
});

function openImage(base64) {
    console.log("nhan", base64.length);
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}