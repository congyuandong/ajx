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
        if (name == null || name == ''){
            $('.errorTip').hide();
            $('.Nerr').show();
            return;
        }
        if (tel == null || tel == ''){
            $('.errorTip').hide();
            $('.Terr').show();
            return;
        }
        if (email == null || email == ''){
            $('.errorTip').hide();
            $('.Eerr').show();
            return;
        }

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