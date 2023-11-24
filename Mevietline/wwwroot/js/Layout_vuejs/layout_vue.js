Vue_Layout = new Vue({
    el: '#Vue_Layout',
    data: {
        anhLogo: null,
        userId: null,
        soTienNap: "",
        randomCode: '',
        selectedBank: null,
        tenNganHang: '',
        soTaiKhoan: '',
        tenTaiKhoan: '',
        soTienRut: 0,
        checkUserId: false,
        bankData: [],
        NameUser: "",
        tienDangCo: null,
        check: false,
        tenChuTK: '',
        QrIdVue: null,

        
    },
    mounted() {
        this.getApiName();
        this.getApi();
        this.getDataBank();
        axios.get("/AdminFb/GetLogo")
            .then((response) => {
                this.anhLogo = response.data.pathLogo;
                this.QrIdVue = response.data.pathQr;
                return Promise.resolve();
            });
        

    },
    methods: {
        async getDataBank() {
            try {
                const res = await axios.get('/Home/GetBankApi');
                this.bankData = res.data;
            } catch (error) {
                console.log(error);
            }
        },
        async NapTien() {
            curentThis = this;
            const formData = new FormData();
            if (curentThis.selectedBank) {
                formData.append('ID', 0);
                formData.append('UserIDInfo', curentThis.userId);
                formData.append('ThoiGianGiaoDich', new Date().toISOString());
                formData.append('TrangThaiGiaoDich', false);
                formData.append('MoTa', 'Đang chờ');
                formData.append('SoTienNap', curentThis.soTienNap);
                formData.append('CodeLenh', curentThis.NameUser);
                formData.append('BankId', curentThis.selectedBank.id);

            }

            axios.post('/Home/LenhGiaoDich', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Đã gửi mã thành công',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });

            })


        },
        async RutTien() {
            curentThis = this;
            if (curentThis.soTienRut > curentThis.tienDangCo) {
                this.check = true;
                return;
            }
            const formData = new FormData();
            formData.append('Id', 0);
            formData.append('TenBankUser', curentThis.tenNganHang);
            formData.append('STKBankUser', curentThis.soTaiKhoan);
            formData.append('SoTienRut', curentThis.soTienRut);
            formData.append('ThoiGianRut', new Date().toISOString());
            formData.append('UserId', curentThis.userId);
            formData.append('TenChuTK', curentThis.tenChuTK);
            formData.append('TrangThaiGiaoDich', false);


            axios.post('/Home/LenhGiaoDichRutTien', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Đã gửi mã thành công',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });

            })


        },
        async getApi() {
            try {
                const res = await axios.get('/Home/GetUserDataId');
                this.userId = res.data;
                if (this.userId != 0) {
                    this.checkUserId = true;
                }
            } catch (error) {
                console.log(error);
                this.checkUserId = false;
            }
        },
        async getApiName() {
            try {
                const res = await axios.get('/Home/GetDataProfileMainTien');
                this.NameUser = res.data[0].userName;
                this.tienDangCo = res.data[0].tienDangCo;
                console.log(this.NameUser);
                if (this.userId != 0) {
                    this.checkUserId = true;
                }
            } catch (error) {
                console.log(error);
                this.checkUserId = false;
            }
        },

    },
});
fotter_Vue = new Vue({
    el: '#fotter_Vue',
    data: {
        diaChi: null,
        soDienThoai: null,
        gmail: null,
    },
    mounted() {
        axios.get("/AdminFb/GetLogo")
            .then((response) => {
                this.diaChi = response.data.diaChi;
                this.soDienThoai = response.data.soDienThoai;
                this.gmail = response.data.gmail;
                return Promise.resolve();
            });
    },
    methods: {
        


    },
});