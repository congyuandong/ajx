$(document).ready(function() {
	$(".dest_mdd_dl_qb").click(function() {
		$(this).find("a").addClass("active");
		$(".dest_mdd_bd").children("li").hide();
		$(".dest_mdd_hd li").removeClass("active");;
	});

	tabs(".tab-hd", "active", ".tab-bd");

	$('#destination_banner1').delay(5000).hide(0);
});

function tabs(tabTit, on, tabCon) {
	// $(tabCon).each(function(){
	//   $(this).children().eq(0).show();
	//   });
	// $(tabTit).each(function(){
	//   $(this).children().eq(0).addClass(on);
	//   });
	$(tabTit).children().click(function() {
		$(".dest_mdd_dl_qb").find("a").removeClass("active");

		$(this).addClass(on).siblings().removeClass(on);
		var index = $(tabTit).children().index(this);
		$(tabCon).children().eq(index).show().siblings().hide();
	});
}