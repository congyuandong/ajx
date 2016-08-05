$(document).ready(function() {
    $('.i_more').on('click', function(){
        if($(this).hasClass('hide')) {
            $(this).removeClass('hide');
            $(this).siblings('.normal').removeClass('normal').addClass('hidden');
            $(this).children('a').text('更多>>');
        } else {
            $(this).addClass('hide');
            $(this).siblings('.hidden').removeClass('hidden').addClass('normal');
            $(this).children('a').text('收起>>');
        }
    });
});