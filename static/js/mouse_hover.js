// JavaScript Document

$(function(){
	
	
	$(".con_1_c_1").hover(function(){
		$(this).find(".con_1_c_1_hide").show();
		$(this).addClass("text");
		$(this).children(".con_1_c_1_right").addClass("b");
	},
	function(){
	    $(".con_1_c_1_hide").hide();
		$(this).removeClass("b");
		$(this).children(".con_1_c_1_right").removeClass("b");
		});
		

	
$(function(){
    function tabs(tabTit,on,tabCon){
	$(tabCon).each(function(){
	  $(this).children().eq(0).show();
	  });
	// $(tabTit).each(function(){
	//   $(this).children().eq(0).addClass(on);
	//   });
    //  $(tabTit).children().click(function(){
    //     $(this).addClass(on).siblings().removeClass(on);
    //      var index = $(tabTit).children().index(this);
    //      $(tabCon).children().eq(index).show().siblings().hide();
    // });
     }
  tabs(".tab-hd","active",".tab-bd");
   });
	
	
	
	
	
	
	$(".price_tip").hover(function(){
		$(this).children(".popup_tip").show();
		$(this).addClass("popup_tip_text");
	},
	function(){
		$(this).children(".popup_tip").hide();
		$(this).removeClass("popup_tip_text");
		});
	
	
	
	
	
	$(".dest_tab_con_ul li").hover(function(){
		$(this).find(".dest_tab_ul_pic_t").show();
		
		$(this).addClass("dest_text");
		;
	},
	function(){
	    $(".dest_tab_ul_pic_t").hide();
		$(this).removeClass("dest_text");
		;
		});
	
	
	
	
	
	$(".sidebar_list").hover(function(){
		$(this).children(".sidebar-box").show();
		$(this).addClass("");
	},
	function(){
		$(this).children(".sidebar-box").hide();
		$(this).removeClass("");
		});
	
	$(".index_nav_thgc_show").hover(function(){
		$(this).children(".index_nav_ztxl").show();
		$(this).addClass("dq_mou");
	},
	function(){
		$(this).children(".index_nav_ztxl").hide();
		$(this).removeClass("dq_mou");
		});	

	$(".pay_way_icon").hover(function(){
		$(this).children(".confirm_show").show();
		$(this).addClass("");
	},
	function(){
		$(this).children(".confirm_show").hide();
		$(this).removeClass("");
		});

	$(".special_con_1_r_3").hover(function(){
		$(this).children(".erciqueren_special").show();
		$(this).addClass("");
	},
	function(){
		$(this).children(".erciqueren_special").hide();
		$(this).removeClass("");
		});

		
});