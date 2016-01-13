$(document).ready(function() {

	$(function() {
		$(window).scroll(function() {

		});
		//当点击跳转链接后，回到页面顶部位置
		$("#back-to-top").click(function() {
			$("body,html").animate({
				scrollTop: 0
			}, 1000);
			return false;
		});
	});


	$(".cha").click(function() {
		$(".sidebar").hide()
		$(".ycl_dd").hide()
		$(".xs").slideDown();
	})

	$(".xs").click(function() {
		$(".sidebar").show()
		$(".ycl_dd").show()
		$(".xs").slideUp();
	})

	var title = "在旅行-专注于东北旅游服务！";
	var pic = "http://www.i-xing.com/Public/page/images/logo_03.png";

	$('body').xuanfengSnsShare({
		tsina: {
			url: encodeURIComponent(window.location.href),
			title: title,
			pic: pic
		},
		tqq: {
			url: encodeURIComponent(window.location.href),
			title: title,
			pic: pic
		},
		tqzone: {
			url: encodeURIComponent(window.location.href),
			title: title,
			pic: pic
		}
	});

	// 微信分享    
	$(".share_weixin").mouseover(function() {
		$("#ewmimg").remove();
		var thisURL = window.location.href,
			strwrite = "<img id='ewmimg' class='ewmimg' src='http://qr.liantu.com/api.php?text=" + thisURL + "' width='85' height='85' alt='在旅行 二维码分享' />";
		$("#ewm").prepend(strwrite);
		$("#wemcn").show();
	});
	// 微信分享    
	$(".share_weixin").mouseleave(function() {
		$("#wemcn").hide();
	});
});