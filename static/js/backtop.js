function setCss() {
    var a = [];
    a.push(".back_to_top{display:none;width:195px;height:107px;overflow:hidden;left:50%; margin-left:-480px;position:fixed;bottom:500px;_position:absolute;_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-134));}\n");
    a.push(".back_to_top a{display:inline-block;width:195px;height:107px;overflow:hidden;background:../images/index_l_pic_03.jpg) 0px 0px no-repeat; opacity:1;}\n");
    a.push(".back_to_top a:hover{background-position:0px 0px}");
    try {
        var b = document.createStyleSheet();
        b.cssText = a.join("");
    } catch(c) {
        var b = document.createElement("style");
        b.type = "text/css";
        b.textContent = a.join("");
        document.getElementsByTagName("HEAD").item(0).appendChild(b);
    }
}
function createLink() {
    var a = document.createElement("div");
    a.id = "JS_back_to_top";
    a.className = "back_to_top";
    a.innerHTML = '<a href="#" title="返回顶部"></a>';
    document.body.appendChild(a);
}
function GetPageScroll() {
    var b,
    a;
    if (window.pageYOffset) {
        a = window.pageYOffset;
        b = window.pageXOffset;
    } else {
        if (document.documentElement && document.documentElement.scrollTop) {
            a = document.documentElement.scrollTop;
            b = document.documentElement.scrollLeft;
        } else {
            if (document.body) {
                a = document.body.scrollTop;
                b = document.body.scrollLeft;
            }
        }
    }
    return {
        x: b,
        y: a
    };
}
if (window.attachEvent) {
    window.attachEvent("onscroll", backToTop);
} else {
    window.addEventListener("scroll", backToTop, false);
}
function backToTop() {
    if(GetPageScroll().y <= 700){
		document.getElementById("JS_back_to_top").style.display = "none";
		document.getElementById("JS_back_to_top").style.position = "fixed";
		document.getElementById("JS_back_to_top").style.bottom = 100+"px";
	}else if(GetPageScroll().y > 700 && GetPageScroll().y < 1700) {
        document.getElementById("JS_back_to_top").style.display = "block";
		document.getElementById("JS_back_to_top").style.position = "fixed"; 
		document.getElementById("JS_back_to_top").style.bottom = 100+"px";
    }else if(GetPageScroll().y > 1700){
        document.getElementById("JS_back_to_top").style.display = "block";
		document.getElementById("JS_back_to_top").style.position = "absolute";
		document.getElementById("JS_back_to_top").style.bottom = -1700+"px";
    }
}
createLink();
setCss();