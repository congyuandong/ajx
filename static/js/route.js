var weeks = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");

$(document).ready(function() {
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

});

function clickCalendar() {
	var startDate = $(this).data("date");
	$(".start-date-date").text(startDate);
	$("input[name=select-date]").val(startDate);
	startDate = new Date(startDate);
	$(".start-date-week").text(weeks[startDate.getDay()]);
}

function loadCalendar(act){
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
	}else if (act == 1) {
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
				for(var indexOfWeek in calendars) {
					content += "<tr>";
					for(var indexOfDay in calendars[indexOfWeek]) {
						var day = calendars[indexOfWeek][indexOfDay];
						if (day.has == 0) {
							content += "<td><span class=\"date-num\">"+ day.day +"</span></td>"
						} else {
							content += "<td class=\"has-data\" data-date=\""+ day.date +"\"><span class=\"date-num\">"+day.day+"</span><span class=\"txt-notice\">余位:"+day.left+"</span><span class=\"txt-notice\">￥"+day.price+"</span></td>";
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