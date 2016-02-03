$(document).ready(function() {

	$("#jcImg").jcImg({
		speed: 400, // 动画速度
		height: 60, // 缩略图高度设置
		width: 100, // 缩略图宽度设置
		textBg: .8, // 文本透明度设置
		page: 4 // 每页缩略图显示个数
	});

	//设置增加减少按钮
	setClickBtns();
	//设置滚动
	setScrollListener();

});

function setScrollListener() {
	var s1_top = $("#s1").offset().top;
	var s2_top = $("#s2").offset().top;
	var s3_top = $("#s3").offset().top;
	var s4_top = $("#s4").offset().top;
	var s5_top = $("#s5").offset().top;
	var s6_top = $("#s6").offset().top;

	//alert(tops);
	$(window).scroll(function() {
		var scroH = $(this).scrollTop();
		if (scroH >= s6_top - 90) {
			set_cur(".s6");
		} else if (scroH >= s5_top - 90) {
			set_cur(".s5");
		} else if (scroH >= s4_top - 90) {
			set_cur(".s4");
		} else if (scroH >= s3_top - 90) {
			set_cur(".s3");
		} else if (scroH >= s2_top - 90) {
			set_cur(".s2");
		} else if (scroH >= s1_top - 90) {
			set_cur(".s1");
		}

		if (($(window).scrollTop()) >= 625) {
			$(".xianlumoban_ul").addClass("ab");
		} else {
			$(".xianlumoban_ul").removeClass("ab");
		}
	});

	$(".xianlumoban_ul li a").click(function() {
		if (!$(this).hasClass('cur')) {
			var el = $(this).attr('class');
			$('html, body').animate({
				scrollTop: $("#" + el).offset().top - 45
			}, {
				easing: 'easeOutSine',
				duration: 900,
				complete: function() {}
			});
		}
	});

}

function setClickBtns() {
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
				reduce.style.backgroundColor = "#EAEAEA";
				if (count === 1) {
					reduce.style.backgroundColor = "gray";
				}
			}
		};
		increase = function() {
			count += 1;
			text.value = count;
			reduce.style.backgroundColor = "#EAEAEA";
		};

		reduce.onclick = less;
		add.onclick = increase;
	};

	start(reduceAdult, textAdult, addAdult, countAdult);
	start(reduceKid, textKid, addKid, countKid);
}

function set_cur(n) {
	$(".xianlumoban_ul a").removeClass("cur");
	$(".xianlumoban_ul a" + n).addClass("cur");
}