DanhSach = new Vue({
    el: '#DanhSach',
    data: {
        listProducts: "",
        idItems: null,
        giaCa: null,
        nguoiBan: null,
        soLuong: null,
        maCode: null,
    },
    mounted() {
        axios.get("/AdminFb/DanhSachSanPhamList")
            .then((response) => {
                this.listProducts = response.data;
                return Promise.resolve();
            })
            .then(() => {
                $("#DanhSach_SP").DataTable({
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
            });
    },
    methods: {
        getIdBang(id) {
            currentThis = this;

            axios.get(`/Home/muaFb/${id}`)
                .then((response) => {
                    // Xử lý dữ liệu trả về từ API
                    console.log(response)
                    this.idItems = response.data.id;
                    this.giaCa = response.data.giaCa;
                    this.nguoiBan = response.data.nguoiBan;
                    this.soLuong = response.data.soLuongTaiKhoan;
                    this.maCode = response.data.maCode;
                    //this.price = this.GiaCa * this.quantity;

                }).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Đã có lỗi xảy ra vui lòng thử lại',
                        confirmButtonText: 'OK'
                    });
                })

        },
        suaBang() {
            curentThis = this;
            const formData = new FormData();
            if (curentThis.idItems != null) {
                formData.append('Id', curentThis.idItems);
                formData.append('GiaCa', curentThis.giaCa);
                formData.append('SoLuongTaiKhoan', curentThis.soLuong);
                formData.append('NguoiBan', curentThis.nguoiBan);
                formData.append('UserId', 1);
                formData.append('MaCode', curentThis.maCode);

            }
            axios.post('/AdminFb/CapNhatBangMain', formData, {
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
        XoaBang() {
            curentThis = this;
            if (curentThis.idItems != null) {
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
                        formData.append('Id', curentThis.idItems);
                        formData.append('GiaCa', curentThis.giaCa);
                        formData.append('SoLuongTaiKhoan', curentThis.soLuong);
                        formData.append('NguoiBan', curentThis.nguoiBan);
                        formData.append('UserId', 1);
                        formData.append('MaCode', curentThis.maCode);

                        axios.post('/AdminFb/XoaBangMain', formData, {
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
        async AddNewItems() {
            const { value: formValues } = await Swal.fire({
                title: 'Thêm mới sản phẩm',
                html:
                    '<div>' +
                    '<label class="form-label"> Nhập mã code</label>' +
                    '<input v-model="macode" name="MaCode" id="MaCode" class="form-control mb-3" type="text" placeholder="Nhập mã">' +
                    '</div>' +
                    '<div>' +
                    '<label class="form-label"> Nhập tên người bán </label>' +
                    '<input v-model="NguoiBan" name="NguoiBan" id="NguoiBan" class="form-control mb-3" placeholder="Nhập tên">' +
                    '</div>' +
                    '<div>' +
                    '<label class="form-label"> Nhập giá bán</label>' +
                    '<input v-model="giaCa" name="GiaCa" id="GiaCa" class="form-control mb-3" type="number" placeholder="Nhập giá">' +
                    '</div>' +
                    '<div>' +
                    '<label class="form-label"> Số lượng tài khoản</label>' +
                    '<input v-model="SoLuongTaiKhoan" name="SoLuongTaiKhoan" id="SoLuongTaiKhoan" class="form-control" type="number" placeholder="Nhập số lượng">' +
                    '</div>',

                focusConfirm: false,
                allowOutsideClick: false,
                showCloseButton: true,
                preConfirm: () => {
                    return [
                        document.getElementById('MaCode').value,
                        document.getElementById('NguoiBan').value,
                        document.getElementById('GiaCa').value,
                        document.getElementById('SoLuongTaiKhoan').value
                    ]
                }
            })
            if (formValues) {
                const [MaCode,NguoiBan, GiaCa, SoLuongTaiKhoan] = formValues;
                currentThis = this;
                const formData = new FormData();
                formData.append('Id', 0);
                formData.append('NguoiBan', NguoiBan);
                formData.append('GiaCa', GiaCa);
                formData.append('Cancel', false);
                formData.append('UserId', 1);
                formData.append('SoLuongTaiKhoan', SoLuongTaiKhoan);
                formData.append('MaCode', MaCode);

                axios.post('/AdminFb/DepositAndWithdrawalOrders', formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {
                    Swal.fire({
                        title: 'Đang thêm mới...',
                        allowOutsideClick: false,
                        onBeforeOpen: () => {
                            Swal.showLoading();
                        },
                        showConfirmButton: false
                    });
                })
                    .then(response => {
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
            }
        }
    },
    computed: {

    },
    watch: {


    },
});