var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

$(document).ready(function() {
	var reduceAdult = $(".reduce")[0],
		textAdult = $(".text")[0],
		addAdult = $(".add")[0],
		reduceKid = $(".reduce")[1],
		textKid = $(".text")[1],
		addKid = $(".add")[1],

		countAdult = 1,
		countKid = 0;

	start = function(reduce, text, add, count) {
		less = function() {
				if (parseInt(text.value) > 0) {
					count -= 1;
					text.value = count;

				}
			},
			increase = function() {
				count += 1;
				text.value = count;
			};

		reduce.onclick = increase;
		add.onclick = less;
	};

	start(reduceAdult, textAdult, addAdult, countAdult);
	start(reduceKid, textKid, addKid, countKid);

	//月份增减
	$(".prev-month").on("click", function() {
		loadCalendar(-1);
	});

	$(".next-month").on("click", function() {
		loadCalendar(1);
	});

	//产品分类
	$(".pro-select-type li").on("click", function() {
		$(this).addClass("current").siblings().removeClass("current");
		$("input[name=data-classid]").val($(this).data("classid"));
		loadCalendar(0);
	});

	//日历点击事件
	$(".has-data").on("click", clickCalendar);

	//滚动事件
	scrollListener();
});

function clickCalendar() {
	var startDate = $(this).data("date");
	$(".start-date-date").text(startDate);
	$("input[name=select-date]").val(startDate);
	startDate = new Date(startDate);
	$(".start-date-week").text(weeks[startDate.getDay()]);
}

function loadCalendar(act) {
	var calendar = $("#calendar-body"),
		year = parseInt($("input[name=data-year]").val()),
		month = parseInt($("input[name=data-month]").val()),
		classid = parseInt($("input[name=data-classid]").val());

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
		success: function(result) {
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
							content += "<td class=\"has-data\" data-date=\"" + day.date + "\"><span class=\"date-num\">" + day.day + "</span><span class=\"txt-notice\">余位:" + day.left + "</span><span class=\"txt-notice\">￥" + day.price + "</span></td>";
						}
					}
					content += "</tr>";
				}
				$("#calendar-body").html(content);
				$(".has-data").on("click", clickCalendar);
			}
		},
		error: function() {}
	});
}

function scrollListener() {
	var gundong1_top = $("#gundong1").offset().top; /***定义要滚动的栏目相对于顶部的偏移***/
	var gundong2_top = $("#gundong2").offset().top;
	var gundong3_top = $("#gundong3").offset().top;
	var gundong4_top = $("#gundong4").offset().top;
	var gundong5_top = $("#gundong5").offset().top;
	var gundong6_top = $("#gundong6").offset().top;
	var gundong7_top = $("#gundong7").offset().top;
	var gundong8_top = $("#gundong8").offset().top;
	var gundong9_top = $("#gundong9").offset().top;
	var gundong10_top = $("#gundong10").offset().top;
	var gundong11_top = $("#gundong11").offset().top;
	var foot = $("#footer").height();
	/***滚动判断***/
	$(window).scroll(function() {
		var scroH = $(this).scrollTop();
		if (scroH >= gundong11_top) {
			set_cur(".gundong11");
		} else if (scroH >= gundong10_top) {
			set_cur(".gundong10");
		} else if (scroH >= gundong9_top) {
			set_cur(".gundong9");
		} else if (scroH >= gundong8_top) {
			set_cur(".gundong8");
		} else if (scroH >= gundong7_top) {
			set_cur(".gundong7");
		} else if (scroH >= gundong6_top) {
			set_cur(".gundong6");
		} else if (scroH >= gundong5_top) {
			set_cur(".gundong5");
		} else if (scroH >= gundong4_top) {
			set_cur(".gundong4");
		} else if (scroH >= gundong3_top) {
			set_cur(".gundong3");
		} else if (scroH >= gundong2_top) {
			set_cur(".gundong2");
		} else if (scroH >= gundong1_top) {
			set_cur(".gundong1");
		}
	});
	$(".gensuigundong_daohagn li a").click(
		function() {
			var el = $(this).attr('class');
			$('html,body').animate({
				scrollTop: $("#" + el).offset().top
			}, {
				easing: 'easeOutSine',
				duration: 300,
				complete: function() {}
			});
		}
	);

	$(window).scroll(
		function() {
			mm = $(".overall").height() - foot - 400;
			if (($(window).scrollTop()) < 200) {
				$(".gensuigundong_daohagn").removeClass("aa");
				$(".gensuigundong_daohagn").removeClass("bb");
			} else
			if (($(window).scrollTop()) >= 200 && ($(window).scrollTop()) <= mm) {
				$(".gensuigundong_daohagn").removeClass("bb");
				$(".gensuigundong_daohagn").addClass("aa");
				$(".gensuigundong_daohagn").css("top", "0")

			} else if (($(window).scrollTop()) > mm) {
				$(".gensuigundong_daohagn").addClass("bb");
				$(".gensuigundong_daohagn").css("top", mm)
			}
		}
	);
}

function set_cur(n) {
	$(".gensuigundong_daohagn li a").removeClass("cur");
	$(".gensuigundong_daohagn li a" + n).addClass("cur");
}