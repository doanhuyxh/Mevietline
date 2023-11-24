ThayAnh = new Vue({
    el: '#ThayAnh',
    data: {
        anhSl1: null,
        anhSl2: null,
        anhSl3: null,
        chayNgang: "Không có gì mới",

    },
    mounted() {
        axios.get("/AdminFb/GetLogo")
            .then((response) => {
                this.anhSl1 = response.data.pathSlider1;
                this.anhSl2 = response.data.pathSlider2;
                this.anhSl3 = response.data.pathSlider3;
                this.chayNgang = response.data.chuNgang;
                return Promise.resolve();
            });
    }
});