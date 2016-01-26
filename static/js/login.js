$(document).ready(function() {
    $('.popup').on('click', function() {
        var $layer = '';
        if ($('#J-layer').size() == 0) {
            $layer = $('<div id="J-layer"></div>');
        } else {
            $layer = $('#J-layer');
        }
        $layer.css({
            "backgroundColor": '#000',
            "display": 'block',
            "height": $(document).outerHeight(),
            "left": 0,
            "opacity": 0.4,
            "position": 'absolute',
            "top": 0,
            "width": '100%',
            "zIndex": 99
        });
        var $div = $('.detail_t').clone(true);
        $('body').append($layer);
        $('body').append($div.show());
        $div.attr('id', 'J-picBox').on('click', '.detail_close,.detail_x', function() {
            $layer.hide();
            $div.remove();
        });

        if ($(this).attr('data') == 'login') {
            tabs(".tab-father", "active", ".tab-children", 1);
        } else if ($(this).attr('data') == 'reg') {
            tabs(".tab-father", "active", ".tab-children", 2);
        }

    });

    $('.tab_popup_bd_dl1_4 img').on('click', function() {
        $(this).attr('src', "/Home/View/Public/Script/checkcode.php?" + Math.random());
    });

    $('#btn_reg').on('click', function() {
        var form = $(this).parent().parent().parent();
        var user_account = form.find('#user_account').val();
        var user_password = form.find('#user_password').val();
        var reuser_password = form.find('#reuser_password').val();
        var verify = form.find('#verify').val();
        var checked = form.find('#cc_read').get(0).checked;

        if (checkAccount(user_account)) {
            if (user_password == reuser_password && user_password != '') {
                if (checked == true) {
                    $.ajax({
                        type: 'POST',
                        url: '/index.php/Home/Register/register',
                        data: {
                            active_code: verify,
                            user_account: user_account,
                            user_password: user_password
                        },
                        success: function(data) {
                            if(data.code == -1) {
                                $('.error_tip').text('验证码错误');
                            }else if(data.code == -2) {
                                $('.error_tip').text('账户已存在');
                            }else if(data.code == 1) {
                                location.reload(true);   
                            }
                        }
                    });
                } else {
                    $('.error_tip').text('请阅读并同意服务协议');
                }
            } else {
                $('.error_tip').text('两次密码不一样');
            }
        } else {
            $('.error_tip').text('账户格式不正确');
        }
    });

    $('#btn_login').on('click', function() {
        var form = $(this).parent().parent().parent();
        var user_account = form.find('#user_account').val();
        var user_password = form.find('#user_password').val();
        var checked = form.find('#cc_remember').get(0).checked;

        $.ajax({
            type: 'POST',
            url: '/w/login/',
            data: {
                account: user_account,
                password: user_password,
                remember: checked
            },
            success: function(data) {
                if(data.code == 1){
                    location.reload(true);
                }else{
                    $('.error_tip').text('用户名或者密码错误');
                }
            }
        });
    });

});

function checkAccount(account) {
    var mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return (/^1[0-9]{10}$/).test(account) || mail.test(account);
}

function tabs(tabTit, on, tabCon, tabIndex) {
    $(tabTit).children().removeClass(on);
    $(tabCon).children().hide();

    $(tabCon).each(function() {
        $(this).children().eq(tabIndex).show();
    });
    $(tabTit).each(function() {
        $(this).children().eq(tabIndex).addClass(on);
    });
    $(tabTit).children().click(function() {
        $(this).addClass(on).siblings().removeClass(on);
        var index = $(tabTit).children().index(this);
        $(tabCon).children().eq(index).show().siblings().hide();
    });
}