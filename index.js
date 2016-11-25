
$(document).ready(function() {
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 280) {
        $('#topbar').addClass('fixed');
    } else {
        $('#topbar').removeClass('fixed');
    }
});
});
