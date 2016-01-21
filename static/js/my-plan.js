$(document).ready(function () {
    var oDialogue = $("#J_myPlanDialogue")[0];

    dialogueScroll();

    CalendarFun();

    itemsA();

    regionTab();

    dialogTips();

    num_box();

    schemes();

    buttonFun0();
    buttonFun1();
    buttonFun2();
    buttonFun3();
    buttonFun4();
    buttonFun5();
    buttonFun6();
    buttonFun7();
    buttonFun8();

    $('input, textarea').removeAttr('disabled');

    $('#cboxClose').on('click', function () {
        $('#dialogueComplete').hide();
    });

    tabs(".tab-hd", "active", ".tab-bd");

    $(".dest_mdd_dl_qb").click(function () {
        $(this).find("a").addClass("active");
        $(".dest_mdd_bd").children("li").hide();
        $(".dest_mdd_hd li").removeClass("active");
        ;
    });

    function tabs(tabTit, on, tabCon) {
        $(tabCon).each(function () {
            $(this).children().eq(0).show();
        });
        $(tabTit).each(function () {
            $(this).children().eq(0).addClass(on);
        });
        $(tabTit).children().click(function () {
            $(".dest_mdd_dl_qb").find("a").removeClass("active");

            $(this).addClass(on).siblings().removeClass(on);
            var index = $(tabTit).children().index(this);
            $(tabCon).children().eq(index).show().siblings().hide();
        });
    }

    function buttonFun0() {
        $('.destination').on('click', 'a', function () {
            var $this = $(this);
            var _type = $this.data('type');
            var text = '';
            var question_id = $this.closest('.dialogue-ask-box').data('question-id');

            text = _type == 0 ? '我有想去的目的地。' : '我没有确定的目的地';

            $this.addClass('active').siblings().removeClass('active');
            $('#talkAnswer' + question_id).show().find('p').text(text);

            $('#talkQuestion1, #talkQuestion2, #talkQuestion3, #talkQuestion4, #talkQuestion5, #talkQuestion6, #talkQuestion7').find('.button-edit').trigger('click')
            $('#talkQuestion1, #talkQuestion2, #talkQuestion3, #talkQuestion5, #talkQuestion6, #talkQuestion7, #talkQuestion8').hide();

            if (_type == 0) {
                $('#talkQuestion1').show();
            } else {
                $('#talkQuestion4').show();
            }

            animScroll(oDialogue, oDialogue.scrollHeight);
        });
    }

    function buttonFun1() {
        var $talkQuestion = $('#talkQuestion1');
        var $dialogueBtn = $('#dialogueBtn1');
        var $talkAnswer = $('#talkAnswer1');
        var $dialogTips = $talkQuestion.find('.dialog-tips');

        $dialogueBtn.on('click', '.button', function () {
            var $this = $(this);
            var end = $talkQuestion.data('end-edit');

            if (end == 1) return ;

            var $active = $talkQuestion.find('.region-content .active');
            var len = $active.length;
            var inputText = $.trim($talkQuestion.find('.input-text').val());
            if (len != 0 || inputText != '') {
                var arr = '';
                $active.each(function () {
                    arr += $(this).text() + '、';
                });
                if (inputText != '') {
                    arr += inputText + '、';
                }
                arr = arr.substring(0, arr.length - 1);
                $talkAnswer.show().find('p').text('我想去' + arr + '玩！');

                $this.hide().next('.button-p').show();
                $talkQuestion.data('end-edit', 1);
                $talkQuestion.find('.input-text').attr('disabled', true);

                $('#talkQuestion2').show();

                $('[data-rel="#talkQuestion1"]').find('.even').text(arr);

                animScroll(oDialogue, oDialogue.scrollHeight);
            } else {
                $dialogTips.show();
            }
        }).on('click', '.button-edit', function () {
            var $this = $(this);
            $talkQuestion.data('end-edit', 0);
            $talkQuestion.find('.input-text').removeAttr('disabled').val('');
            $talkQuestion.find('.items-a a').removeClass('active');
            $talkQuestion.find('.region-tab li:eq(0)').trigger('click');
            $this.parent().hide();
            $this.parent().prev().show();
            $talkAnswer.hide();

            $('#talkQuestion2').hide();

            $('[data-rel="#talkQuestion1"]').find('.even').text('');

            $('#talkQuestion2, #talkQuestion3, #talkQuestion4, #talkQuestion5, #talkQuestion6, #talkQuestion7').find('.button-edit').trigger('click');

            animScroll(oDialogue, oDialogue.scrollHeight);
        });

        $talkQuestion.find('.input-text').on('keyup', function () {
            $talkQuestion.find('.region-content .active').removeClass('active');
        });

        $talkQuestion.find('.region-content .items-a a').on('click', function () {
            if ($talkQuestion.data('end-edit') == 1) return ;
            $talkQuestion.find('.input-text').val('');
        });
    }

    function buttonFun2() {
        var $talkQuestion = $('#talkQuestion2');
        var $dialogueBtn = $('#dialogueBtn2');
        var $talkAnswer = $('#talkAnswer2');
        var $dialogTips = $talkQuestion.find('.dialog-tips');

        $dialogueBtn.on('click', '.button', function () {
            var $this = $(this);
            var end = $talkQuestion.data('end-edit');

            if (end == 1) return ;

            var $active = $talkQuestion.find('.region-content .active');
            var len = $active.length;
            var inputText = $.trim($talkQuestion.find('.input-text').val());
            if (len != 0 || inputText != '') {
                var arr = '';
                $active.each(function () {
                    arr += $(this).text() + '、';
                });
                if (inputText != '') {
                    arr += inputText + '、';
                }
                arr = arr.substring(0, arr.length - 1);
                $talkAnswer.show().find('p').text('我想从' + arr + '出发！');

                $this.hide().next('.button-p').show();
                $talkQuestion.data('end-edit', 1);
                $talkQuestion.find('.input-text').attr('disabled', true);

                $('#talkQuestion3').show();

                $('[data-rel="#talkQuestion2"]').find('.even').text(arr);

                animScroll(oDialogue, oDialogue.scrollHeight);
            } else {
                $dialogTips.show();
            }
        }).on('click', '.button-edit', function () {
            var $this = $(this);
            $talkQuestion.data('end-edit', 0);
            $talkQuestion.find('.input-text').removeAttr('disabled').val('');
            $talkQuestion.find('.items-a a').removeClass('active');
            $talkQuestion.find('.region-tab li:eq(0)').trigger('click');
            $this.parent().hide();
            $this.parent().prev().show();
            $talkAnswer.hide();

            $('#talkQuestion3').hide();

            $('[data-rel="#talkQuestion2"]').find('.even').text('');

            $('#talkQuestion3, #talkQuestion4, #talkQuestion5, #talkQuestion6, #talkQuestion7').find('.button-edit').trigger('click');

            animScroll(oDialogue, oDialogue.scrollHeight);
        });

        $talkQuestion.find('.input-text').on('keyup', function () {
            $talkQuestion.find('.region-content .active').removeClass('active');
        });

        $talkQuestion.find('.region-content .items-a a').on('click', function () {
            if ($talkQuestion.data('end-edit') == 1) return ;
            $talkQuestion.find('.input-text').val('');
        });
    }

    function buttonFun3() {
        var $talkQuestion = $('#talkQuestion3');
        var $dialogueBtn = $('#dialogueBtn3');
        var $talkAnswer = $('#talkAnswer3');
        var $dialogTips = $talkQuestion.find('.dialog-tips');

        $dialogueBtn.on('click', '.button', function () {
            var $this = $(this);
            var end = $talkQuestion.data('end-edit');

            if (end == 1) return ;

            var $active = $talkQuestion.find('.items-a .active');
            var len = $active.length;
            if (len != 0) {
                var arr = $active.text();
                var text = '我喜欢' + arr + '的旅游方式！';

                if (arr == '我不确定') {
                    text = ' 我不确定旅游方式！';
                }
                $talkAnswer.show().find('p').text(text);

                $this.hide().next('.button-p').show();
                $talkQuestion.data('end-edit', 1);

                $('#talkQuestion4').show();

                $('[data-rel="#talkQuestion3"]').find('.even').text(arr);

                animScroll(oDialogue, oDialogue.scrollHeight);
            } else {
                $dialogTips.show();
            }
        }).on('click', '.button-edit', function () {
            var $this = $(this);
            $talkQuestion.data('end-edit', 0);
            $talkQuestion.find('.items-a a').removeClass('active');
            $this.parent().hide();
            $this.parent().prev().show();
            $talkAnswer.hide();

            $('#talkQuestion4').hide();

            $('[data-rel="#talkQuestion3"]').find('.even').text('');

            $('#talkQuestion4, #talkQuestion5, #talkQuestion6, #talkQuestion7').find('.button-edit').trigger('click');

            animScroll(oDialogue, oDialogue.scrollHeight);
        });
    }

    function buttonFun4() {
        var $talkQuestion = $('#talkQuestion4');
        var $dialogueBtn = $('#dialogueBtn4');
        var $talkAnswer = $('#talkAnswer4');
        var $depatureTime = $('#depatureTime');
        var $dialogTips = $talkQuestion.find('.dialog-tips');

        $dialogueBtn.on('click', '.button', function () {
            var $this = $(this);
            var end = $talkQuestion.data('end-edit');

            if (end == 1) return ;

            var val = $.trim($depatureTime.val());
            if (val != '') {
                var text = '我要在' + val + '日前后出发。';
                $talkAnswer.show().find('p').text(text);

                $this.hide().next('.button-p').show();
                $talkQuestion.data('end-edit', 1);
                $depatureTime.attr('disabled', true);

                $('#talkQuestion5').show();

                $('[data-rel="#talkQuestion4"]').find('.even').text(val);

                animScroll(oDialogue, oDialogue.scrollHeight);
            } else {
                $dialogTips.show();
            }
        }).on('click', '.button-edit', function () {
            var $this = $(this);
            $talkQuestion.data('end-edit', 0);
            $this.parent().hide();
            $this.parent().prev().show();
            $talkAnswer.hide();
            $depatureTime.removeAttr('disabled');

            $('#talkQuestion5').hide();

            $('[data-rel="#talkQuestion4"]').find('.even').text('');

            $('#talkQuestion5, #talkQuestion6, #talkQuestion7').find('.button-edit').trigger('click');

            animScroll(oDialogue, oDialogue.scrollHeight);
        });
    }

    function buttonFun5() {
        var $talkQuestion = $('#talkQuestion5');
        var $dialogueBtn = $('#dialogueBtn5');
        var $talkAnswer = $('#talkAnswer5');
        var $dialogTips = $talkQuestion.find('.dialog-tips');

        $dialogueBtn.on('click', '.button', function () {
            var $this = $(this);
            var end = $talkQuestion.data('end-edit');

            if (end == 1) return ;

            var $active = $talkQuestion.find('.items-a .active em');
            var sel = $talkQuestion.find('.select-txt').val();
            var len = $active.length;
            if (len != 0 || sel != '') {
                var arr = sel != '' ? sel : $active.text();
                var text = '我要游玩' + arr + '天。';
                $talkAnswer.show().find('p').text(text);
                $this.hide().next('.button-p').show();
                $talkQuestion.data('end-edit', 1);
                $talkQuestion.find('.select-txt').attr('disabled', true);

                $('#talkQuestion6').show();

                $('[data-rel="#talkQuestion5"]').find('.even').text(arr);

                $('#talkQuestion6, #talkQuestion7').find('.button-edit').trigger('click');

                animScroll(oDialogue, oDialogue.scrollHeight);
            } else {
                $dialogTips.show();
            }
        }).on('click', '.button-edit', function () {
            var $this = $(this);
            $talkQuestion.data('end-edit', 0);
            $this.parent().hide();
            $this.parent().prev().show();
            $talkAnswer.hide();
            $talkQuestion.find('.select-txt').removeAttr('disabled');

            $('#talkQuestion6').hide();

            $('[data-rel="#talkQuestion5"]').find('.even').text('');

            $('#talkQuestion7').find('.button-edit').trigger('click');

            animScroll(oDialogue, oDialogue.scrollHeight);
        });

        $talkQuestion.find('.items-a a').on('click', function () {
            if ($talkQuestion.data('end-edit') == 1) return ;
            $talkQuestion.find('.select-txt').val('');
        });

        $talkQuestion.on('change', function () {
            $talkQuestion.find('.items-a a').removeClass('active');
        });
    }

    function buttonFun6() {
        var $talkQuestion = $('#talkQuestion6');
        var $dialogueBtn = $('#dialogueBtn6');
        var $talkAnswer = $('#talkAnswer6');
        var $dialogTips = $talkQuestion.find('.dialog-tips');
        var $numBox0 = $('#numBox0');
        var $numBox1 = $('#numBox1');
        var $numBox2 = $('#numBox2');

        $dialogueBtn.on('click', '.button', function () {
            var $this = $(this);
            var end = $talkQuestion.data('end-edit');

            if (end == 1) return ;

            var num0 = $numBox0.val() | 0;
            var num1 = $numBox1.val() | 0;
            var num2 = $numBox2.val() | 0;

            if (num0 != 0 || num1 != 0 || num2 != 0) {
                var arr = num0 + num1 + num2;
                var text = '我们一共' + arr + '个人。';
                $talkAnswer.show().find('p').text(text);
                $this.hide().next('.button-p').show();
                $talkQuestion.data('end-edit', 1);
                $talkQuestion.find('input[type="text"]').attr('disabled', true);

                $('#talkQuestion7').show();

                $('[data-rel="#talkQuestion6"]').find('.even').text(arr);

                animScroll(oDialogue, oDialogue.scrollHeight);
            } else {
                $dialogTips.show();
            }
        }).on('click', '.button-edit', function () {
            var $this = $(this);
            $talkQuestion.data('end-edit', 0);
            $this.parent().hide();
            $this.parent().prev().show();
            $talkAnswer.hide();
            $talkQuestion.find('input[type="text"]').removeAttr('disabled');

            $('#talkQuestion7').hide();

            $('[data-rel="#talkQuestion6"]').find('.even').text('');

            animScroll(oDialogue, oDialogue.scrollHeight);
        });
    }

    function buttonFun7() {
        var $talkQuestion = $('#talkQuestion7');
        var $dialogueBtn = $('#dialogueBtn7');
        var $talkAnswer = $('#talkAnswer7');
        var $dialogTips = $talkQuestion.find('.dialog-tips');

        $dialogueBtn.on('click', '.button', function () {
            var $this = $(this);
            var end = $talkQuestion.data('end-edit');

            if (end == 1) return ;

            var $active = $talkQuestion.find('.items-a .active');
            var len = $active.length;
            if (len != 0) {
                var arr = $active.text();
                var text = '我的旅游预算是' + arr + '。';
                $talkAnswer.show().find('p').text(text);

                $this.hide().next('.button-p').show();
                $talkQuestion.data('end-edit', 1);

                $('#talkQuestion8').show();

                $('[data-rel="#talkQuestion7"]').find('.even').text(arr);

                animScroll(oDialogue, oDialogue.scrollHeight);
            } else {
                $dialogTips.show();
            }
        }).on('click', '.button-edit', function () {
            var $this = $(this);
            $talkQuestion.data('end-edit', 0);
            $talkQuestion.find('.items-a a').removeClass('active');
            $this.parent().hide();
            $this.parent().prev().show();
            $talkAnswer.hide();

            $('#talkQuestion8').hide();

            $('[data-rel="#talkQuestion7"]').find('.even').text('');

            animScroll(oDialogue, oDialogue.scrollHeight);
        });
    }

    function buttonFun8() {
        var $talkQuestion = $('#talkQuestion8');
        var $dialogueBtn = $('#dialogueBtn8');
        var $dialogueComplete = $('#dialogueComplete');
        var $dialogTips = $talkQuestion.find('.dialog-tips');
        var $name = $('[data-target="name"]');
        var $phone = $('[data-target="phone"]');
        var $email = $('[data-target="email"]');
        var $weixin = $('[data-target="weixin"]');
        var $tex = $('[data-target="tex"]');

        $dialogueBtn.on('click', '.button', function () {
            var $this = $(this);
            var name = $.trim($name.val());
            var phone = $.trim($phone.val());
            var email = $.trim($email.val());
            var weixin = $.trim($weixin.val());
            var tex = $.trim($tex.val());
            var time = $talkQuestion.find('.items-a .active').text();

            if (name != '' && phone != '') {
                $dialogueComplete.show();
                $dialogueComplete.find('.name').text(name);
                $dialogueComplete.find('.phone').text(phone);
                $dialogueComplete.find('.email').text(email);
                $dialogueComplete.find('.weixin').text(weixin);
                $dialogueComplete.find('.tex').text(tex);

                // 最后这条是生成订单号放的。目前是写死订单号
                var code = getOrderCode();
                $dialogueComplete.find('.code').text(code);

                animScroll(oDialogue, 0);

                //提交订单数据
                var dest = $('[data-rel="#talkQuestion1"]').find('.even').text();
                var setout = $('[data-rel="#talkQuestion2"]').find('.even').text();
                var traveltype = $('[data-rel="#talkQuestion3"]').find('.even').text();
                var date = $('[data-rel="#talkQuestion4"]').find('.even').text();
                var days = $('[data-rel="#talkQuestion5"]').find('.even').text();
                var persons = $('[data-rel="#talkQuestion6"]').find('.even').text();
                var budget = $('[data-rel="#talkQuestion7"]').find('.even').text();

                $.ajax({
                    url: '/w/made/',
                    type: 'POST',
                    data: {'code':code,'name':name,'tel':phone,'mail':email,
                            'wechat':weixin,'contacttime':time,'special':tex,
                            'dest':dest,'setout':setout,'traveltype':traveltype,
                            'date':date,'days':days,'persons':persons,'budget':budget},
                    dataType: 'json',
                    success: function(result) {
                        //log(result);
                    },
                    error: function(){}
                });
            } else {
                $dialogTips.show();
            }
        });
    }

    function num_box() {
        var $num_box = $('.num_box');
        $num_box.on('click', '.sub_btn', function () {
            var $this = $(this);

            if ($this.closest('.dialogue-ask-box').data('end-edit') == 1) return;

            var $input = $this.next();
            var val = $input.val() | 0;

            val --;

            count($input, val);

        }).on('click', '.add_btn', function () {
            var $this = $(this);

            if ($this.closest('.dialogue-ask-box').data('end-edit') == 1) return;

            var $input = $this.prev();
            var val = $input.val() | 0;

            val ++;

            count($input, val);

        }).on('focus', 'input[type="text"]', function () {
            var $this = $(this);
            var val = $this.val() | 0;

            count($this, val);
        }).on('blur', 'input[type="text"]', function () {
            var $this = $(this);
            var val = $this.val() | 0;

            count($this, val);
        });

        function count(input, _num) {
            if (_num < 0) {
                _num = 0;
            } else if (_num > 10) {
                _num = 10;
            } else if (isNaN(_num) || (_num + '').indexOf('.') >= 0) {
                _num = 0;
            }

            input.val(_num);
        }
    }

    function dialogTips() {
        $('.dialog-tips').on('click', '.button', function () {
            $(this).closest('.dialog-tips').hide();
        });
    }

    function itemsA() {
        $('.items-a').on('click', 'a', function () {
            var $this = $(this);

            if ($this.closest('.dialogue-ask-box').data('end-edit') == 1) return;

            if ($this.hasClass('active')) {
                $this.removeClass('active');
            } else {
                if ($this.closest('.region-content').size() > 0) {
                    $this.closest('.region-content').find('.items-a a').removeClass('active');
                } else {
                    $this.closest('.items-a').find('a').removeClass('active');
                }

                $this.addClass('active');
            }
        });
    }

    function regionTab() {
        var $region = $('[data-target="region"]');

        $region.on('click', '.region-tab li', function () {
            var $this = $(this);

            if ($this.closest('.dialogue-ask-box').data('end-edit') == 1) return;

            var _region = $this.closest('.region');

            var index = $this.index();
            $this.addClass('active').siblings().removeClass('active');
            _region.find('.region-items').hide();
            _region.find('.region-items').eq(index).show();
        });
    }

    function dialogueScroll() {
        //dialogue
        var myPlanDialogueContent = $('.my-plan-dialogue-content');
        var dialogueMaskLayer = $('.dialogue-mask-layer');
        fish.one('.my-plan-dialogue').on('scroll', function () {
            var _h = myPlanDialogueContent.outerHeight();
            dialogueMaskLayer.css('height', _h);

            var cal = fish.all('.calendar-panel');
            if (!cal.length) return;
            cal.css('display:none');
        }).trigger('scroll');
    }

    function CalendarFun() {
        fish.require('Calendar', function () {
            var cal = new fish.Calendar({
                skin: 'green',
                zIndex: 10,
                monthNum: 1
            });
            var endDate = new Date();
            endDate.setMonth(endDate.getMonth() + 3);
            fish.one('#depatureTime').on('focus', function () {
                if ($('#talkQuestion4').data('end-edit') == 1) {
                    fish.one(this).attr('disabled', 'disabled');
                    return
                }

                cal.pick({
                    elem: this,
                    endDate: endDate,
                    startDate: new Date(),
                    mode: 'rangeFrom'
                });
            }).on('blur', function () {
                var $this = fish.one(this);
                var val = $this.val();
                if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(val)) {
                } else {
                    $this.val('');
                }
            });
        });
    }

    //滚动方法
    function animScroll(obj, scroll, callback) {
        var scrollTop = obj.scrollTop;
        var dir = 1;
        var timer = null;
        var speed = 0;
        scrollTop >= scroll && (dir = -1);
        var target = (scroll - scrollTop) * dir;
        timer = window.setInterval(function() {
            speed += 2;
            target -= speed;
            obj.scrollTop = scrollTop + speed * dir;
            scrollTop = obj.scrollTop;

            if (speed >= target) {
                speed = target;
                obj.scrollTop = scrollTop + speed * dir;
                clearInterval(timer)
                callback && callback()
            }
        }, 1)
    }

    function schemes() {
        //右侧
        fish.all('li', fish.one('#schemesDiy')).on('click', function() {
            animScroll(oDialogue, fish.one(fish.one(this).attr('data-rel'))[0].offsetTop - oDialogue.offsetTop + 50);
        });
    }
});

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