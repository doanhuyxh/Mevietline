Edit_Vue_img = new Vue({
    el: '#Edit_Vue_img',
    data: {
        imageFile: null,
        imageFile1: null,
        imageFile2: null,
        imageFile3: null,
        imageFile4: null,
        previewImage: null,
        previewImage1: null,
        previewImage2: null,
        previewImage3: null,
        previewImage4: null,
        uploadedImage: null,
        uploadedImage1: null,
        uploadedImage2: null,
        uploadedImage3: null,
        uploadedImage4: null,
        Logo: null,
        anhSl1: null,
        anhSl2: null,
        anhSl3: null,
        chayNgang: null,
        diaChi: null,
        soDienThoai: null,
        gmail: null,
        tieuDe: null,
        thead1: null,
        thead2: null,
        thead3: null,
        thead4: null,
        pathQr: null,
        dataBank: "",
        bankName: null,
        taiKhoanBank: null,
        tokenBank: null,
        tenTaiKhoan: null,
        idBank: null,
        LuuY: null,

        
        
    },
    mounted() {
        axios.get("/AdminFb/GetLogo")
            .then((response) => {
                this.Logo = response.data.pathLogo;
                this.anhSl1 = response.data.pathSlider1;
                this.anhSl2 = response.data.pathSlider2;
                this.anhSl3 = response.data.pathSlider3;
                this.chayNgang = response.data.chuNgang;
                this.diaChi = response.data.diaChi;
                this.soDienThoai = response.data.soDienThoai;
                this.gmail = response.data.gmail;
                this.tieuDe = response.data.headerBang;
                this.thead1 = response.data.thead1;
                this.thead2 = response.data.thead2;
                this.thead3 = response.data.thead3;
                this.thead4 = response.data.thead4;
                this.pathQr = response.data.pathQr;
                this.LuuY = response.data.luuY;
                return Promise.resolve();
            });
        axios.get("/AdminFb/GetBankInfo")
            .then((response) => {
                this.dataBank = response.data;
                return Promise.resolve();
            })
            .then(() => {
                $("#data_Bank").DataTable({
                    'columnDefs': [{
                        'targets': [-1],
                        'orderable': false,
                    }],
                    searching: true,
                    iDisplayLength: 10,
                    "ordering": false,
                    lengthChange: false,
                    aaSorting: [[0, "desc"]],
                    aLengthMenu: [
                        [5, 10, 25, 50, 100, -1],

                        ["5 dòng", "10 dòng", "25 dòng", "50 dòng", "100 dòng", "Tất cả"],
                    ],
                    language: {
                        "processing": "Đang xử lý...",
                        "aria": {
                            "sortAscending": ": Sắp xếp thứ tự tăng dần",
                            "sortDescending": ": Sắp xếp thứ tự giảm dần"
                        },
                        "autoFill": {
                            "cancel": "Hủy",
                            "fill": "Điền tất cả ô với <i>%d<\/i>",
                            "fillHorizontal": "Điền theo hàng ngang",
                            "fillVertical": "Điền theo hàng dọc"
                        },
                        "buttons": {
                            "collection": "Chọn lọc <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
                            "colvis": "Hiển thị theo cột",
                            "colvisRestore": "Khôi phục hiển thị",
                            "copy": "Sao chép",
                            "copyKeys": "Nhấn Ctrl hoặc u2318 + C để sao chép bảng dữ liệu vào clipboard.<br \/><br \/>Để hủy, click vào thông báo này hoặc nhấn ESC",
                            "copySuccess": {
                                "1": "Đã sao chép 1 dòng dữ liệu vào clipboard",
                                "_": "Đã sao chép %d dòng vào clipboard"
                            },
                            "copyTitle": "Sao chép vào clipboard",
                            "pageLength": {
                                "-1": "Xem tất cả các dòng",
                                "_": "Hiển thị %d dòng",
                                "1": "Hiển thị 1 dòng"
                            },
                            "print": "In ấn",
                            "createState": "Tạo trạng thái",
                            "csv": "CSV",
                            "excel": "Excel",
                            "pdf": "PDF",
                            "removeAllStates": "Xóa hết trạng thái",
                            "removeState": "Xóa",
                            "renameState": "Đổi tên",
                            "savedStates": "Trạng thái đã lưu",
                            "stateRestore": "Trạng thái %d",
                            "updateState": "Cập nhật"
                        },
                        "select": {
                            "cells": {
                                "1": "1 ô đang được chọn",
                                "_": "%d ô đang được chọn"
                            },
                            "columns": {
                                "1": "1 cột đang được chọn",
                                "_": "%d cột đang được được chọn"
                            },
                            "rows": {
                                "1": "1 dòng đang được chọn",
                                "_": "%d dòng đang được chọn"
                            }
                        },
                        "searchBuilder": {
                            "title": {
                                "_": "Thiết lập tìm kiếm (%d)",
                                "0": "Thiết lập tìm kiếm"
                            },
                            "button": {
                                "0": "Thiết lập tìm kiếm",
                                "_": "Thiết lập tìm kiếm (%d)"
                            },
                            "value": "Giá trị",
                            "clearAll": "Xóa hết",
                            "condition": "Điều kiện",
                            "conditions": {
                                "date": {
                                    "after": "Sau",
                                    "before": "Trước",
                                    "between": "Nằm giữa",
                                    "empty": "Rỗng",
                                    "equals": "Bằng với",
                                    "not": "Không phải",
                                    "notBetween": "Không nằm giữa",
                                    "notEmpty": "Không rỗng"
                                },
                                "number": {
                                    "between": "Nằm giữa",
                                    "empty": "Rỗng",
                                    "equals": "Bằng với",
                                    "gt": "Lớn hơn",
                                    "gte": "Lớn hơn hoặc bằng",
                                    "lt": "Nhỏ hơn",
                                    "lte": "Nhỏ hơn hoặc bằng",
                                    "not": "Không phải",
                                    "notBetween": "Không nằm giữa",
                                    "notEmpty": "Không rỗng"
                                },
                                "string": {
                                    "contains": "Chứa",
                                    "empty": "Rỗng",
                                    "endsWith": "Kết thúc bằng",
                                    "equals": "Bằng",
                                    "not": "Không phải",
                                    "notEmpty": "Không rỗng",
                                    "startsWith": "Bắt đầu với",
                                    "notContains": "Không chứa",
                                    "notEndsWith": "Không kết thúc với",
                                    "notStartsWith": "Không bắt đầu với"
                                },
                                "array": {
                                    "equals": "Bằng",
                                    "empty": "Trống",
                                    "contains": "Chứa",
                                    "not": "Không",
                                    "notEmpty": "Không được rỗng",
                                    "without": "không chứa"
                                }
                            },
                            "logicAnd": "Và",
                            "logicOr": "Hoặc",
                            "add": "Thêm điều kiện",
                            "data": "Dữ liệu",
                            "deleteTitle": "Xóa quy tắc lọc",
                            "leftTitle": "Giảm thụt lề",
                            "rightTitle": "Tăng thụt lề"
                        },
                        "searchPanes": {
                            "countFiltered": "{shown} ({total})",
                            "emptyPanes": "Không có phần tìm kiếm",
                            "clearMessage": "Xóa hết",
                            "loadMessage": "Đang load phần tìm kiếm",
                            "collapse": {
                                "0": "Phần tìm kiếm",
                                "_": "Phần tìm kiếm (%d)"
                            },
                            "title": "Bộ lọc đang hoạt động - %d",
                            "count": "{total}",
                            "collapseMessage": "Thu gọn tất cả",
                            "showMessage": "Hiện tất cả"
                        },
                        "datetime": {
                            "hours": "Giờ",
                            "minutes": "Phút",
                            "next": "Sau",
                            "previous": "Trước",
                            "seconds": "Giây",
                            "amPm": [
                                "am",
                                "pm"
                            ],
                            "unknown": "-",
                            "weekdays": [
                                "Chủ nhật"
                            ],
                            "months": [
                                "Tháng Một",
                                "Tháng Hai",
                                "Tháng Ba",
                                "Tháng Tư",
                                "Tháng Năm",
                                "Tháng Sáu",
                                "Tháng Bảy",
                                "Tháng Tám",
                                "Tháng Chín",
                                "Tháng Mười",
                                "Tháng Mười Một",
                                "Tháng Mười Hai"
                            ]
                        },
                        "emptyTable": "Không có dữ liệu",
                        "info": "Hiển thị _START_ tới _END_ của _TOTAL_ dữ liệu",
                        "infoEmpty": "Hiển thị 0 tới 0 của 0 dữ liệu",
                        "lengthMenu": "Hiển thị _MENU_ dữ liệu",
                        "loadingRecords": "Đang tải...",
                        "paginate": {
                            "first": "Đầu tiên",
                            "last": "Cuối cùng",
                            "next": "Sau",
                            "previous": "Trước"
                        },
                        "search": "Tìm kiếm:",
                        "zeroRecords": "Không tìm thấy kết quả",
                        "decimal": ",",
                        "editor": {
                            "close": "Đóng",
                            "create": {
                                "button": "Thêm",
                                "submit": "Thêm",
                                "title": "Thêm mục mới"
                            },
                            "edit": {
                                "button": "Sửa",
                                "submit": "Cập nhật",
                                "title": "Sửa mục"
                            },
                            "error": {
                                "system": "Đã xảy ra lỗi hệ thống (&lt;a target=\"\\\" rel=\"nofollow\" href=\"\\\"&gt;Thêm thông tin&lt;\/a&gt;)."
                            },
                            "multi": {
                                "info": "Các mục đã chọn chứa các giá trị khác nhau cho đầu vào này. Để chỉnh sửa và đặt tất cả các mục cho đầu vào này thành cùng một giá trị, hãy nhấp hoặc nhấn vào đây, nếu không chúng sẽ giữ lại các giá trị riêng lẻ của chúng.",
                                "noMulti": "Đầu vào này có thể được chỉnh sửa riêng lẻ, nhưng không phải là một phần của một nhóm.",
                                "restore": "Hoàn tác thay đổi",
                                "title": "Nhiều giá trị"
                            },
                            "remove": {
                                "button": "Xóa",
                                "confirm": {
                                    "_": "Bạn có chắc chắn muốn xóa %d hàng không?",
                                    "1": "Bạn có chắc chắn muốn xóa 1 hàng không?"
                                },
                                "submit": "Xóa",
                                "title": "Xóa"
                            }
                        },
                        "infoFiltered": "(được lọc từ _MAX_ dữ liệu)",
                        "searchPlaceholder": "Nhập tìm kiếm...",
                        "stateRestore": {
                            "creationModal": {
                                "button": "Thêm",
                                "columns": {
                                    "search": "Tìm kiếm cột",
                                    "visible": "Khả năng hiển thị cột"
                                },
                                "name": "Tên:",
                                "order": "Sắp xếp",
                                "paging": "Phân trang",
                                "scroller": "Cuộn vị trí",
                                "search": "Tìm kiếm",
                                "searchBuilder": "Trình tạo tìm kiếm",
                                "select": "Chọn",
                                "title": "Thêm trạng thái",
                                "toggleLabel": "Bao gồm:"
                            },
                            "duplicateError": "Trạng thái có tên này đã tồn tại.",
                            "emptyError": "Tên không được để trống.",
                            "emptyStates": "Không có trạng thái đã lưu",
                            "removeConfirm": "Bạn có chắc chắn muốn xóa %s không?",
                            "removeError": "Không xóa được trạng thái.",
                            "removeJoiner": "và",
                            "removeSubmit": "Xóa",
                            "removeTitle": "Xóa trạng thái",
                            "renameButton": "Đổi tên",
                            "renameLabel": "Tên mới cho %s:",
                            "renameTitle": "Đổi tên trạng thái"
                        },
                        "infoThousands": ".",
                        "thousands": "."
                    },
                });
            })
            .catch((error) => {
                console.error(error);
            });
    },
    methods: {
        onFileChange(event) {
            this.imageFile = event.target.files[0];
            this.previewImage = URL.createObjectURL(this.imageFile);
            this.uploadedImage = null;
        },
        onFileChangeSlide1(event) {
            this.imageFile1 = event.target.files[0];
            this.previewImage1 = URL.createObjectURL(this.imageFile1);
            this.uploadedImage1 = null;
        },
        onFileChangeSlide2(event) {
            this.imageFile2 = event.target.files[0];
            this.previewImage2 = URL.createObjectURL(this.imageFile2);
            this.uploadedImage2 = null;
        },
        onFileChangeSlide3(event) {
            this.imageFile3 = event.target.files[0];
            this.previewImage3 = URL.createObjectURL(this.imageFile3);
            this.uploadedImage3 = null;
        },
        onFileChangeSlide4(event) {
            this.imageFile4 = event.target.files[0];
            this.previewImage4 = URL.createObjectURL(this.imageFile4);
            this.uploadedImage4 = null;
        },
        async uploadImage() {
            try {
                const formData = new FormData();
                formData.append('pathLogoFile', this.$refs.pathLogoFile.files[0]);

                await axios.post('/AdminFb/EditIndex', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Đã lưu ảnh thành công',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã có lỗi xảy ra khi lưu ảnh',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        },
        async uploadImageQR() {
            try {
                const formData = new FormData();
                formData.append('pathQrFile', this.$refs.pathQrFile.files[0]);

                await axios.post('/AdminFb/EditIndex', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Đã lưu ảnh thành công',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã có lỗi xảy ra khi lưu ảnh',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        },
        async uploadImageSlide() {
            try {
                const formData = new FormData();
                formData.append('pathSlider1File', this.$refs.pathSlider1File.files[0]);
                formData.append('pathSlider2File', this.$refs.pathSlider2File.files[0]);
                formData.append('pathSlider3File', this.$refs.pathSlider3File.files[0]);

                await axios.post('/AdminFb/EditIndex', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Đã lưu ảnh thành công',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã có lỗi xảy ra khi lưu ảnh',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        },
        async DiaChiFooter() {
            try {
                currentThis = this;
                const formData = new FormData();
                formData.append('DiaChi', currentThis.diaChi);
                formData.append('SoDienThoai', currentThis.soDienThoai);
                formData.append('Gmail', currentThis.gmail);

                await axios.post('/AdminFb/EditIndex', formData,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
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
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã có lỗi xảy ra khi lưu',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        },
        async chuChayThongBao() {
            try {
                currentThis = this;
                const formData = new FormData();
                formData.append('ChuNgang', currentThis.chayNgang);

                await axios.post('/AdminFb/EditIndex', formData,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
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
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã có lỗi xảy ra khi lưu',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        },
        async tieuDeBang() {
            try {
                currentThis = this;
                const formData = new FormData();
                formData.append('HeaderBang', currentThis.tieuDe);

                await axios.post('/AdminFb/EditIndex', formData,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
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
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã có lỗi xảy ra khi lưu',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        },
        async tieuDeDauBang() {
            try {
                currentThis = this;
                const formData = new FormData();
                formData.append('thead1', currentThis.thead1);
                formData.append('thead2', currentThis.thead2);
                formData.append('thead3', currentThis.thead3);
                formData.append('thead4', currentThis.thead4);

                await axios.post('/AdminFb/EditIndex', formData,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
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
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã có lỗi xảy ra khi lưu',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        },
        async LuuYBang() {
            try {
                currentThis = this;
                const formData = new FormData();
                formData.append('LuuY', currentThis.LuuY);
              

                await axios.post('/AdminFb/EditIndex', formData,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
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
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã có lỗi xảy ra khi lưu',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        },
        getIdBangBank(id) {
            
            axios.get(`/AdminFb/EditBankData/${id}`)
                .then((response) => {

                    // Xử lý dữ liệu trả về từ API
                    console.log(response)
                    this.idBank = response.data.id;
                    this.bankName = response.data.bankName;
                    this.taiKhoanBank = response.data.taiKhoanBank;
                    this.tenTaiKhoan = response.data.tenTaiKhoan;
                    this.tokenBank = response.data.tokenBank;

                }).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Đã có lỗi xảy ra vui lòng thử lại',
                        confirmButtonText: 'OK'
                    });
                })

        },
        getItemBank() {
            curentThis = this;

            const formData = new FormData();
            
                formData.append('Id', this.idBank);
                formData.append('BankName', this.bankName);
                formData.append('TaiKhoanBank', this.taiKhoanBank);
                formData.append('TokenBank', '1a');
                formData.append('TenTaiKhoan', this.tenTaiKhoan);


            

            axios.post('/AdminFb/EditBankData', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Đã gửi thành công',
                    confirmButtonText: 'OK',

                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã có lỗi xảy ra vui lòng thử lại',
                    confirmButtonText: 'OK'
                });
                console.error(error);
            });


        },
        XoaBangBank() {
            curentThis = this;
            if (this.idBank != null) {
                // Display confirmation message
                Swal.fire({
                    title: 'Xóa sản phẩm',
                    text: 'Bạn có chắc chắn muốn xóa',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không!!!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const formData = new FormData();

                        formData.append('Id', this.idBank);
                        formData.append('BankName', this.bankName);
                        formData.append('TaiKhoanBank', this.taiKhoanBank);
                        formData.append('TokenBank', this.tokenBank);
                        formData.append('TenTaiKhoan', this.tenTaiKhoan);

                        axios.post('/AdminFb/XoaBank', formData, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(response => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Thành công',
                                text: 'Đã gửi thành công',
                                confirmButtonText: 'OK',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });

                        }).catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Lỗi',
                                text: 'Đã có lỗi xảy ra vui lòng thử lại',
                                confirmButtonText: 'OK'
                            });
                        });
                    } else {
                        return;
                    }
                });
            }
        },
    }
});