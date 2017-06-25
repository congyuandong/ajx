var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

$(document).ready(function () {
    var reduceAdult = $(".reduce")[0],
        textAdult = $(".text")[0],
        addAdult = $(".add")[0],
        reduceKid = $(".reduce")[1],
        textKid = $(".text")[1],
        addKid = $(".add")[1],

        countAdult = 1,
        countKid = 0;

    start = function (reduce, text, add, count) {
        less = function () {
            if (parseInt(text.value) > 0) {
                count -= 1;
                text.value = count;

            }
        },
            increase = function () {
                count += 1;
                text.value = count;
            };

        reduce.onclick = increase;
        add.onclick = less;
    };

    start(reduceAdult, textAdult, addAdult, countAdult);
    start(reduceKid, textKid, addKid, countKid);

    //月份增减
    $(".prev-month").on("click", function () {
        loadCalendar(-1);
    });

    $(".next-month").on("click", function () {
        loadCalendar(1);
    });

    //产品分类
    $(".pro-select-type li").on("click", function () {
        $(this).addClass("current").siblings().removeClass("current");
        $("input[name=cid]").val($(this).data("classid"));
        loadCalendar(0);
    });

    //日历点击事件
    $(".has-data").on("click", clickCalendar);

    //提交订单
    $(".submit_left").on("click", function () {
        $(".submit_right").click();
    });

    //滚动事件
    scrollListener();
});

function clickCalendar() {
    var startDate = $(this).data("date");
    $(".start-date-date").text(startDate);
    $("input[name=dateid]").val($(this).data("dateid"));
    startDate = new Date(startDate);
    $(".start-date-week").text(weeks[startDate.getDay()]);
}

function loadCalendar(act) {
    var calendar = $("#calendar-body"),
        year = parseInt($("input[name=data-year]").val()),
        month = parseInt($("input[name=data-month]").val()),
        classid = parseInt($("input[name=cid]").val());

    if (act == -1) {
        if (month == 1) {
            month = 12;
            year -= 1;
        } else {
            month -= 1;
        }
    } else if (act == 1) {
        if (month == 12) {
            month = 1;
            year += 1;
        } else {
            month += 1;
        }
    }

    $("input[name=data-year]").val(year);
    $("input[name=data-month]").val(month);
    $("em.year").text(year);
    $("em.month").text(month);

    $.ajax({
        url: "/w/calendar/y" + year + "m" + month + "c" + classid,
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.code == 1) {
                var content = "";
                calendars = result.calendars;
                for (var indexOfWeek in calendars) {
                    content += "<tr>";
                    for (var indexOfDay in calendars[indexOfWeek]) {
                        var day = calendars[indexOfWeek][indexOfDay];
                        if (day.has == 0) {
                            content += "<td><span class=\"date-num\">" + day.day + "</span></td>"
                        } else {
                            content += "<td class=\"has-data\" data-date=\"" + day.date + "\" data-dateid=\"" + day.dateid + "\"><span class=\"date-num\">" + day.day + "</span><span class=\"txt-notice\">余位:" + day.left + "</span><span class=\"txt-notice\">￥" + day.price + "</span></td>";
                        }
                    }
                    content += "</tr>";
                }
                $("#calendar-body").html(content);
                $(".has-data").on("click", clickCalendar);
            }
        },
        error: function () {
        }
    });
}

function scrollListener() {

    $(document).scroll(function () {
        $(".dr_title2").each(function (index) {
            if ($(this).offset().top > $(window).scrollTop()) {
                if (index > 0) {
                    $(".sidemenu li:eq(" + (index - 1) + ")").addClass("cur").siblings().removeClass("cur");
                }
                return false;
            }
        });
    });

    $(".gensuigundong_daohagn li").click(
        function () {
            var index = $(this).index();
            $('html,body').animate({
                scrollTop: $(".dr_title2:eq(" + index + ")").offset().top
            }, {
                easing: 'easeOutSine',
                duration: 300,
                complete: function () {
                }
            });
        }
    );

    fixSidebar();
    $(window).scroll(fixSidebar);
}

function fixSidebar() {
    var foot = $("#footer").height();
    mm = $(".overall").height() - foot - 400;
    if (($(window).scrollTop()) < 200) {
        $(".gensuigundong_daohagn").removeClass("aa");
        $(".gensuigundong_daohagn").removeClass("bb");
    } else if (($(window).scrollTop()) >= 200 && ($(window).scrollTop()) <= mm) {
        $(".gensuigundong_daohagn").removeClass("bb");
        $(".gensuigundong_daohagn").addClass("aa");
        $(".gensuigundong_daohagn").css("top", "0")

    } else if (($(window).scrollTop()) > mm) {
        $(".gensuigundong_daohagn").addClass("bb");
        $(".gensuigundong_daohagn").css("top", mm)
    }
}

function set_cur(n) {
    $(".gensuigundong_daohagn li a").removeClass("cur");
    $(".gensuigundong_daohagn li a" + n).addClass("cur");
}