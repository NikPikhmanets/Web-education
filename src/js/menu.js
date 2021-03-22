$(document).ready(function () {
    $('.toggle-nav').on('click', function () {
        $('#h-nav').toggleClass('responsive');
        $('.body').toggleClass('lock-scroll');
    });
});
