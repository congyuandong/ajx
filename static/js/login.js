//验证码倒计时长
var codeTime = 60,
    lastTime = codeTime;

$(document).ready(function () {
    $('.search_but').on('click', function () {
        search($('.search_in input').val());
    });

    $('.search_in').bind('keydown', function (e) {
        if (e.keyCode == '13') {
            search($('.search_in input').val());
            e.preventDefault();
        }
    });

    $('.popup').on('click', function () {
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
        $div.attr('id', 'J-picBox').on('click', '.detail_close,.detail_x', function () {
            $layer.hide();
            $div.remove();
        });

        if ($(this).attr('data') == 'login') {
            tabs(".tab-father", "active", ".tab-children", 1);
        } else if ($(this).attr('data') == 'reg') {
            tabs(".tab-father", "active", ".tab-children", 2);
        }

    });

    //快速登录
    $('#btn_quick_login').on('click', function () {
        var form = $(this).parentsUntil('li');
        var account = form.find('#account').val();
        var code = form.find('#code').val();
        var checked = form.find('#checked').get(0).checked;
        var errorTip = form.find('.error_tip');
        var successTip = form.find('.success_tip');

        if (checkTel(account)) {
            $.ajax({
                type: 'POST',
                url: '/w/qlogin/',
                data: {
                    account: account,
                    code: code,
                    remember: checked
                },
                success: function (data) {
                    if (data.code == 1) {
                        location.reload(true);
                    } else {
                        successTip.text('');
                        errorTip.text('验证码错误');
                    }
                }
            });
        } else {
            successTip.text('');
            errorTip.text('手机号码格式不正确');
        }

    });

    //注册逻辑
    $('#btn_reg').on('click', function () {
        var form = $(this).parentsUntil('li');
        var user_account = form.find('#account').val();
        var user_password = form.find('#user_password').val();
        var reuser_password = form.find('#reuser_password').val();
        var verify = form.find('#verify').val();
        var checked = form.find('#cc_read').get(0).checked;
        var errorTip = form.find('.error_tip');
        var successTip = form.find('.success_tip');

        if (checkAccount(user_account)) {
            if (user_password == reuser_password && user_password != '') {
                if (verify != '') {
                    if (checked == true) {
                        var regType = 'tel';
                        if (checkMail(user_account)) {
                            regType = 'mail';
                        }
                        $.ajax({
                            type: 'POST',
                            url: '/w/reg/',
                            data: {
                                code: verify,
                                account: user_account,
                                password: user_password,
                                type: regType
                            },
                            success: function (data) {
                                if (data.code == -1) {
                                    successTip.text('');
                                    errorTip.text('验证码错误');
                                } else if (data.code == -2) {
                                    successTip.text('');
                                    errorTip.text('账户已存在');
                                } else if (data.code == 1) {
                                    location.reload(true);
                                }
                            }
                        });
                    } else {
                        successTip.text('');
                        errorTip.text('请阅读并同意服务协议');
                    }
                } else {
                    successTip.text('');
                    errorTip.text('请输入验证码');
                }
            } else {
                successTip.text('');
                errorTip.text('两次密码不一样');
            }
        } else {
            successTip.text('');
            errorTip.text('账户格式不正确');
        }
    });

    //登录逻辑
    $('#btn_login').on('click', function () {
        var form = $(this).parentsUntil('li');
        var account = form.find('#user_account').val();
        var password = form.find('#user_password').val();
        var checked = form.find('#cc_remember').get(0).checked;
        var errorTip = form.find('.error_tip');

        $.ajax({
            type: 'POST',
            url: '/w/login/',
            data: {
                account: account,
                password: password,
                remember: checked
            },
            success: function (data) {
                if (data.code == 1) {
                    location.reload(true);
                } else {
                    errorTip.text('用户名或者密码错误');
                }
            }
        });
    });

    //获取短信或者邮件验证码
    $('.getLoginCode').on('click', function () {
        $(this).addClass('disabled');
        disable_getcode();
        var form = $(this).parentsUntil('li');
        var account = form.find('#account').val();
        var accountType = form.find('#account').attr('data');
        var errorTip = form.find('.error_tip');
        var successTip = form.find('.success_tip');

        if (accountType == 'tel') {
            if (checkTel(account)) {
                $.ajax({
                    type: 'GET',
                    url: '/w/code/?tel=' + account,
                    success: function (data) {
                        if (data.code == 1) {
                            errorTip.text('');
                            successTip.text('发送成功,请注意查收');
                        } else if (data.code == 2) {
                            errorTip.text('');
                            successTip.text('验证码未失效,请稍后再试');
                        } else {
                            errorTip.text('发送失败,请联系客服');
                        }
                    }
                });
            } else {
                errorTip.text('手机号码格式不正确');
            }
        } else if (accountType == 'account') {
            if (checkAccount(account)) {
                if (checkTel(account)) {
                    $.ajax({
                        type: 'GET',
                        url: '/w/code/?tel=' + account,
                        success: function (data) {
                            if (data.code == 1) {
                                errorTip.text('');
                                successTip.text('发送成功，请注意查收');
                            } else {
                                errorTip.text('发送失败，请联系客服');
                            }
                        }
                    });
                } else {
                    $.ajax({
                        type: 'GET',
                        url: '/w/mcode/?mail=' + account,
                        success: function (data) {
                            if (data.code == 1) {
                                errorTip.text('');
                                successTip.text('发送成功，请注意查收');
                            } else {
                                errorTip.text('发送失败，请联系客服');
                            }
                        }
                    });
                }
            } else {
                errorTip.text('账户格式不正确');
            }
        }
    });

});

//禁止获取验证码
function disable_getcode() {
    if (lastTime > 0) {
        lastTime -= 1;
        $('.getLoginCode').text(lastTime + 's');
        setTimeout("disable_getcode()", 1000);
    } else {
        $('.getLoginCode').removeClass('disabled');
        lastTime = codeTime;
        $('.getLoginCode').text('获取验证码');
    }
}

function checkTel(account) {
    return (/^1[0-9]{10}$/).test(account);
}

function checkMail(account) {
    var mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return mail.test(account);
}

function checkAccount(account) {
    return checkTel(account) || checkMail(account);
}

function tabs(tabTit, on, tabCon, tabIndex) {
    $(tabTit).children().removeClass(on);
    $(tabCon).children().hide();

    $(tabCon).each(function () {
        $(this).children().eq(tabIndex).show();
    });
    $(tabTit).each(function () {
        $(this).children().eq(tabIndex).addClass(on);
    });
    $(tabTit).children().click(function () {
        $(this).addClass(on).siblings().removeClass(on);
        var index = $(tabTit).children().index(this);
        $(tabCon).children().eq(index).show().siblings().hide();
    });
}

function search(dest) {
    $.ajax({
        url: '/w/search/',
        type: 'POST',
        data: {
            d: dest
        },
        success: function (response) {
            location.href = response.redirect_to;
        }
    });
}
