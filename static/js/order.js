$(document).ready(function () {
    $('.checkBox').on('click', function() {
        var price = parseFloat($(this).data('price'));
        var amount = parseFloat($('#total_money').text());
        if($(this).get(0).checked) {
            //add
            $('#total_money').text(amount + price);
        }else{
            //plus
            $('#total_money').text(amount - price);
        }
    });

    $('#buy_button').on('click', function () {
        var name = $('#contact_name').val();
        var tel = $('#contact_tel').val();
        var email = $('#contact_email').val();
        var info = $('#od_lv_info').val();
        var amount = parseFloat($('#total_money').text());
        var additions = getAddition();

        if (name == null || name == ''){
            $('.errorTip').hide();
            $('.Nerr').show();
            return;
        }
        if (!checkTel(tel)){
            $('.errorTip').hide();
            $('.Terr').show();
            return;
        }
        if (!checkMail(email)){
            $('.errorTip').hide();
            $('.Eerr').show();
            return;
        }
        $.ajax({
            type: 'POST',
            url: '/w/order/',
            traditional :true,
            data: {
                name : name,
                tel : tel,
                email : email,
                comment : info,
                code : getOrderCode(),
                rid: $(this).data('rid'),
                cid: $(this).data('cid'),
                gid: $(this).data('gid'),
                adult: $(this).data('adult'),
                child: $(this).data('child'),
                single: $(this).data('single'),
                amount: amount,
                adds: additions,
                t: $(this).data('t')
            },
            success: function(data) {
                if(data.code == 1) {
                    location.href = data.href;
                }
            },
            error: function(err) {
                // console.log(err.responseText);
            }
        });
    });
    
    $('#signCheck').on('click', function () {
        if($(this).get(0).checked) {
            $('#buy_button').removeClass('disabled');
            $('#buy_button').removeAttr('disabled');
        }else{
            $('#buy_button').addClass('disabled');
            $('#buy_button').attr('disabled','true');
        }
    });
});

function checkTel(account) {
    return (/^1[0-9]{10}$/).test(account);
}

function checkMail(account) {
    var mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return mail.test(account);
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function getOrderCode(){
    return (new Date()).Format('yyyyMMddhhmmssS');
}

function getAddition() {
    additionList = $('.checkBox');
    result = [];
    additionList.each(function() {
       if($(this).get(0).checked) {
           result.push($(this).data('aid'))
       }
    });
    return result
}