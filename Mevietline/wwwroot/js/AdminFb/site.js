// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var elementPosition = $('#nav-menu').offset();

$(window).scroll(function () {
    if ($(window).scrollTop() > elementPosition.top) {
        $('#nav-menu').css('position', 'fixed').css('top', '0').css('z-index', '9').css('width', '100%');
    } else {
        $('#nav-menu').css('position', 'static');
    }
});

$(window).scroll(function () {
    if ($(window).scrollTop() > elementPosition.top) {
        $('#side-bar').css('position', 'sticky').css('top', '40px').css('z-index', '9').css('width', '100%');
    } else {
        $('#side-bar').css('position', 'static');
    }
});

$("#btn-mua").on("click", function () {
    $("#table-mua").css("display", "block");
    $("#table-ban").css("display", "none");
    $("#btn-mua").addClass("active1");
    $("#btn-ban").removeClass("active1");
});

$("#btn-ban").on("click", function () {
    $("#table-mua").css("display", "none");
    $("#table-ban").css("display", "block");
    $("#btn-ban").addClass("active1");
    $("#btn-mua").removeClass(" active1");
});

$("#btn-nap").on("click", function () {
    $("#table-nap").css("display", "block");
    $("#table-rut").css("display", "none");
    $("#btn-nap").addClass("active1");
    $("#btn-rut").removeClass("active1");
});

$("#btn-rut").on("click", function () {
    $("#table-nap").css("display", "none");
    $("#table-rut").css("display", "block");
    $("#btn-rut").addClass("active1");
    $("#btn-nap").removeClass(" active1");
});