!function() {
    function a(a) {
        fish.browser("ms", 6) && (this.elem = fish.one(a), this.update())
    }
    a.prototype.update = function() {
        if (!this.elem || !this.elem.length) return this;
        var a = this.elem[0].offsetWidth,
            b = this.elem[0].offsetHeight;
        if (b && a && "hidden" !== this.elem.css("visibility")) {
            this.iframe ? this.iframe[0].style.display = "" : (this.iframe = fish.create('<iframe src="javascript:;" frameborder="0" style="border: none; position: absolute; filter: alpha(opacity = 0);"></iframe>'), this.elem.html("before", this.iframe));
            var c = this.elem.getCss("zIndex");
            c && c > 0 && (this.iframe[0].style.zIndex = c), this.iframe.css("width:" + a + "px;height:" + b + "px;");
            var d = this.elem.offset();
            this.iframe.css("left:" + d.left + "px;top:" + d.top + "px;")
        } else this.iframe && (this.iframe[0].style.display = "none");
        return this
    }, a.prototype.destroy = function() {
        this.iframe && (this.iframe.html("remove"), delete this.iframe), delete this.elem
    }, fish.extend({
        IframeCover: a
    })
}(),
    function() {
        function a(a, b) {
            return 1 === a.nodeType && (void 0 === b ? !0 : a.tagName.toLowerCase() === b)
        }
        function b(a) {
            return "string" == typeof a && "" !== a
        }
        function c(a) {
            a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)
        }
        function d(a) {
            return a = a.split("-"), a = new Date(parseInt(a[0], 10), parseInt(a[1], 10) - 1, parseInt(a[2], 10)), isNaN(a.getTime()) ? void 0 : a
        }
        function e(a) {
            return a.getFullYear() + "-" + f(a.getMonth() + 1) + "-" + f(a.getDate())
        }
        function f(a) {
            return (10 > a ? "0" : "") + a
        }
        function g(a, e) {
            for (var f, g = 0, h = e.length; h > g; g++) f = e[g], b(a[f]) ? a[f] = d(a[f]) : y.isDate(a[f]) ? c(a[f]) : a[f] = void 0
        }
        function h(a) {
            g(a, ["startDate", "endDate"]), b(a.currentDate) ? a.currentDate = [d(a.currentDate)] : y.isDate(a.currentDate) ? a.currentDate = [c(a.currentDate)] : y.isArray(a.currentDate) ? g(a.currentDate, [0, 1]) : a.currentDate = []
        }
        function i(b) {
            if (b.elem && a(b.elem, "input")) {
                var c = d(b.elem.value);
                c ? "rangeTo" === b.mode ? b.currentDate[1] = c : b.currentDate[0] = c : "rangeTo" === b.mode ? b.currentDate[1] && (b.elem.value = e(b.currentDate[1])) : b.currentDate[0] && (b.elem.value = e(b.currentDate[0]))
            }
        }
        function j(a) {
            "rangeTo" === a.mode && a.currentDate[0] && a.startDate.getTime() < a.currentDate[0].getTime() && (a.startDate = new Date(a.currentDate[0]))
        }
        function k(a, b, c, d) {
            var e = a.style;
            if (b) {
                var f, g = fish.one(b).offset();
                if (c) f = fish.one(c).offset(), d || (d = {
                    left: 0,
                    top: fish.one(b).height()
                });
                else if (!d) {
                    d = {};
                    var h = fish.one(window).scrollLeft(),
                        i = fish.one(window).scrollTop(),
                        j = fish.one(window).width(),
                        k = fish.one(window).height(),
                        l = fish.one(b).width(),
                        m = fish.one(b).height(),
                        n = fish.one(a).width(),
                        o = fish.one(a).height();
                    d.left = j + h - g.left < n && g.left - h + l >= n ? l - n + (fish.browser("ms", 6) || fish.browser("ms", 7) || fish.browser("ms", 8) || fish.browser("ms", 9) ? 3 : 0) : fish.browser("ms", 6) || fish.browser("ms", 7) || fish.browser("ms", 8) ? -3 : 0, d.top = k + i - g.top - m < o && g.top - i >= o ? -o - (fish.browser("ms", 6) || fish.browser("ms", 7) || fish.browser("ms", 8) || fish.browser("ms", 9) ? 0 : 3) : m
                }
                e.top = g.top - (f ? f.top : 0) + d.top + "px", e.left = g.left - (f ? f.left : 0) + d.left + "px"
            }
            var p = fish.one(a).data("originDisplay");
            e.display = void 0 !== p ? p : "block"
        }
        function l(a) {
            var b = fish.one(a).getCss("display");
            "none" !== b && (fish.one(a).data("originDisplay", b), a.style.display = "none")
        }
        function m(a) {
            if (this._ = {}, a) {
                fish.lang.extend(this._, a);
                for (var b, c = ["startDate", "endDate", "zIndex", "currentDate", "ajaxObj", "fn", "elem", "elems", "mode", "offset", "buildContent", "hoverIn", "hoverOut"], d = 0, e = c.length; e > d; d++) b = c[d], this._[b] = this._[b] || this[b]
            }
        }
        function n(a) {
            fish.lang.extend(this, {
                firstDay: 0,
                monthNum: 2,
                zIndex: "10000",
                startDate: new Date(1900, 0, 1),
                endDate: new Date(2100, 11, 31)
            }), void 0 !== a && (h(a), i(a), j(a), fish.lang.extend(this, a)), "show" === this.style ? (o.call(this), this.wrapper ? (this.wrapper = fish.one(this.wrapper), this.wrapper.length ? (this.wrapper = this.wrapper[0], this.wrapper.appendChild(this.panel)) : delete this.wrapper) : document.body.appendChild(this.panel), m.call(this, a), this.panel.style.position = "relative", this.update(), q.call(this)) : this._elems = []
        }
        function o() {
            this.isBigRange ? (this.headerMonthHtmlStr = '<em class="year-wrapper"><input name="year" value="" maxlength="4" /><i></i></em><i class="year-str">年</i><em class="month-wrapper"><input name="month" value="" maxlength="2" /><i></i></em><i class="month-str">月</i>', this.updateHeaderMonth = function(a, b, c) {
                var d = fish.all("input", a);
                d[0].value = b, d[1].value = c
            }, this.getYearAndMonthStr = function(a) {
                var b = fish.all("input", a);
                return [b[0].value, b[1].value]
            }) : (this.headerMonthHtmlStr = "年月", this.updateHeaderMonth = function(a, b, c) {
                var d = fish.one("h6 span", a);
                d[0].innerHTML = b + "年" + c + "月"
            }, this.getYearAndMonthStr = function(a) {
                var b = fish.one("span", a)[0].innerHTML.split("年");
                return b[1] = b[1].split("月")[0], b
            }), this.wrapperWidth = "number" == typeof this.wrapperWidth ? this.wrapperWidth : 231, this.panelWidth = "number" == typeof this.panelWidth ? this.panelWidth : this.wrapperWidth * this.monthNum;
            var a = document.createElement("div");
            a.className = "calendar-panel" + (this.skin ? " " + this.skin : ""), a.style.width = this.panelWidth + "px";
            for (var b = '<div class="month-nav"><a href="javascript:;" hidefocus="true" class="previous-month"></a><a href="javascript:;" hidefocus="true" class="next-month"></a></div>', c = 0; c < this.monthNum; c++) {
                b += '<div class="calendar-wrapper" style="width:' + this.wrapperWidth + 'px"><h6><span>' + this.headerMonthHtmlStr + '</span></h6><div class="calendar-container"><table>', b += '<tr class="header">';
                for (var d, e = 0; 7 > e; e++) d = (e + this.firstDay) % 7, b += "<th", 0 === d ? b += ' class="sunday"' : 6 === d && (b += ' class="saturday"'), b += ">" + this.dayStrs[d] + "</th>";
                for (b += "</tr>", e = 1; 7 > e; e++) b += "<tr" + (6 == e ? ' class="last-row"' : "") + '><td class="sunday"></td><td></td><td></td><td></td><td></td><td></td><td class="saturday"></td></tr>';
                b += "</table></div></div>"
            }
            if (this.isBigRange) {
                for (b += '<div class="year-panel">', c = 0; 10 > c; c++) b += '<a href="javascript:void(0);"></a>';
                for (b += '<div class="year-nav"><span class="previous"><i></i><em></em></span><span class="next"><i></i><em></em></span></div></div>', b += '<div class="month-panel">', c = 1; 13 > c; c++) b += '<a href="javascript:void(0);">' + c + "</a>";
                b += "</div>"
            }
            a.innerHTML = b, this.panel = a
        }
        function p() {
            var a = this;
            fish.one(document).on("click", function(b) {
                for (var c = fish.getTarget(b); c && document !== c;) {
                    if (-1 !== a._elems.indexOf(c) || c === a.panel) return;
                    c = c.parentNode
                }
                a.hide()
            }), fish.one(window).on("resize", function() {
                var b = fish.one(a.panel).getCss("display");
                "none" !== b && (k(a.panel, a._.elem, a.wrapper, a._.offset), a.iframeCover && a.iframeCover.update())
            })
        }
        function q() {
            var b, c, d, f, g, h, i, j = this,
                m = fish.all(".calendar-wrapper", this.panel);
            fish.one(this.panel).on("click", function(h) {
                for (b = fish.getTarget(h); b !== this;) {
                    b = fish.one(b);
                    var i, n;
                    if ("td" === b[0].tagName.toLowerCase()) {
                        if (b.hasClass("invalid-day")) break;
                        "show" !== j.style && j.hide();
                        var o = j.getYearAndMonthStr(b.parent(".calendar-wrapper"));
                        n = parseInt(o[0], 10);
                        var p = parseInt(o[1], 10) - 1,
                            q = parseInt(b[0].getAttribute("data-date"), 10),
                            r = new Date(n, p, q);
                        b.hasClass("previous-month-day") ? r.setMonth(r.getMonth() - 1) : b.hasClass("next-month-day") && r.setMonth(r.getMonth() + 1), j._.elem && a(j._.elem, "input") && (j._.elem.value = e(r)), "function" == typeof j._.fn && j._.fn(r.getFullYear(), r.getMonth() + 1, r.getDate(), b[0], j._.elem);
                        break
                    }
                    if (b.hasClass("previous-month")) {
                        b.hasClass("previous-month-disabled") || j.previousMonth();
                        break
                    }
                    if (b.hasClass("next-month")) {
                        b.hasClass("next-month-disabled") || j.nextMonth();
                        break
                    }
                    if (b.hasClass("month-wrapper")) return l(j.yearPanel), i = b[0].getElementsByTagName("input")[0], n = parseInt(b[0].parentNode.getElementsByTagName("input")[0].value, 10), i.select(), g = i.value, d = new Date(j._.startDate), c = m.indexOf(b.parent(".calendar-wrapper")[0]), d.setMonth(d.getMonth() + c), x.call(j, n, d), void k(j.monthPanel, b[0], j.panel);
                    if (b.hasClass("year-wrapper")) return l(j.monthPanel), i = b[0].getElementsByTagName("input")[0], n = parseInt(i.value, 10), f = i.value, i.select(), d = new Date(j._.startDate), c = m.indexOf(b.parent(".calendar-wrapper")[0]), d.setMonth(d.getMonth() + c), n -= n % 10, w.call(j, n, d), void k(j.yearPanel, b[0], j.panel);
                    b = b[0].parentNode
                }
                j.isBigRange && (l(j.yearPanel), l(j.monthPanel)), fish.stopBubble(h)
            }).delegate("td", "mouseover", function(a) {
                var b = fish.one(a.delegateTarget);
                if (!b.hasClass("invalid-day")) {
                    if ("rangeTo" !== j._.mode) return void b.addClass("hover-from-day");
                    if (b.addClass("hover-to-day"), !j._.currentDate[0]) return;
                    var c = j.getYearAndMonthStr(b.parent(".calendar-wrapper")),
                        d = new Date(parseInt(c[0], 10), parseInt(c[1], 10) - 1, a.delegateTarget.getAttribute("data-date"));
                    if (b.hasClass("previous-month-day") ? d.setMonth(d.getMonth() - 1) : b.hasClass("next-month-day") && d.setMonth(d.getMonth() + 1), d.getTime() < j._.currentDate[0].getTime()) return;
                    var e, f = fish.one(".from-day"),
                        g = fish.all("td", this.panel),
                        k = 0,
                        l = g.indexOf(a.delegateTarget);
                    for (f.length && (k = g.indexOf(f[0]) + 1); l > k; k++) {
                        if (g[k] === a.delegateTarget) return;
                        e = fish.one(g[k]), e.hasClass("invalid-day") || e.addClass("hover-day")
                    }
                    h = fish.all(".range-day"), h.removeClass("range-day"), i = fish.all(".to-day"), i.removeClass("to-day"), "function" == typeof j._.hoverIn && j._.hoverIn(a.delegateTarget, d)
                }
            }).delegate("td", "mouseout", function(a) {
                var b = fish.one(a.delegateTarget);
                return "rangeTo" !== j._.mode ? void b.removeClass("hover-from-day") : void(b.hasClass("invalid-day") || (b.removeClass("hover-to-day"), fish.all(".hover-day").removeClass("hover-day"), h && (h.addClass("range-day"), h = void 0), i && (i.addClass("to-day"), i = void 0), "function" == typeof j._.hoverOut && j._.hoverOut(a.delegateTarget, date)))
            }), this.isBigRange && (this.yearPanel = fish.dom(".year-panel", this.panel), this.monthPanel = fish.dom(".month-panel", this.panel), fish.one(this.yearPanel).on("click", function(a) {
                for (var d, e, g, h = fish.getTarget(a); h !== this;) {
                    if (d = h.tagName.toLowerCase(), "a" === d) {
                        if (!fish.one(h).hasClass("invalid-year")) {
                            if (h.innerHTML !== f) {
                                var i = new Date(parseInt(h.innerHTML, 10), parseInt(b[0].parentNode.getElementsByTagName("input")[1].value, 10) - 1, 1);
                                i.setMonth(i.getMonth() - c), j.update(i)
                            }
                            l(this)
                        }
                        break
                    }
                    if ("span" === d && !fish.one(h).hasClass("invalid-nav")) {
                        fish.one(h).hasClass("previous") ? (e = this.getElementsByTagName("a"), g = parseInt(e[0].innerHTML, 10) - 10, w.call(j, g, j._.startDate, e)) : fish.one(h).hasClass("next") && (e = this.getElementsByTagName("a"), g = parseInt(e[0].innerHTML, 10) + 10, w.call(j, g, j._.startDate, e));
                        break
                    }
                    h = h.parentNode
                }
                fish.stopBubble(a)
            }), fish.one(this.monthPanel).delegate("a", "click", function(a) {
                if (!fish.one(a.delegateTarget).hasClass("invalid-month")) {
                    if (a.delegateTarget.innerHTML !== g) {
                        var d = new Date(parseInt(b[0].parentNode.getElementsByTagName("input")[0].value, 10), parseInt(a.delegateTarget.innerHTML, 10) - 1, 1);
                        d.setMonth(d.getMonth() - c), j.update(d)
                    }
                    l(this)
                }
                fish.stopBubble(a)
            }), fish.all(j.panel.getElementsByTagName("input")).on("keydown", function(a) {
                var b = fish.getKeyCode(a);
                if (13 === b) {
                    if ("year" === this.name && this.value === f) return void l(j.yearPanel);
                    if ("month" === this.name && this.value === g) return void l(j.monthPanel);
                    fish.one(this).trigger("change")
                }
                9 === b || 8 !== b && 46 !== b && (37 > b || b > 40) && (48 > b || b > 57) && (96 > b || b > 105) && fish.preventDefault(a)
            }).on("change", function() {
                var a, b, e;
                if ("year" === this.name) a = parseInt(this.value, 10), a = isNaN(a) ? 0 : a, a < d.getFullYear() || a > j._.endDate.getFullYear() ? (this.value = f, this.select()) : (f = this.value, b = parseInt(fish.all("input", fish.one(this).parent("calendar-wrapper"))[1].value, 10) - 1, e = new Date(a, b, 1), e.setMonth(e.getMonth() - c), j.update(e), l(j.yearPanel));
                else {
                    if (b = parseInt(this.value, 10), a = parseInt(this.parentNode.parentNode.getElementsByTagName("input")[0].value, 10), b >= 1 && 12 >= b && (b -= 1, !(a === d.getFullYear() && b <= d.getMonth() || a === j._.endDate.getFullYear() && b > j._.endDate.getMonth() || a < d.getFullYear() || a > j._.endDate.getFullYear()))) return g = this.value, e = new Date(a, b - c, 1), j.update(e), void l(j.monthPanel);
                    this.value = g, this.select()
                }
            }))
        }
        function r(a) {
            var b = this.getYearAndMonthStr(fish.all(".calendar-wrapper", this.panel)[0]),
                c = new Date(parseInt(b[0], 10), parseInt(b[1], 10) - 1, 1);
            c.setMonth(a ? c.getMonth() - 1 : c.getMonth() + 1), this.update(c)
        }
        function s(a) {
            var b = a.getFullYear(),
                c = a.getMonth() + 1,
                d = a.getDate(),
                e = z[b + "-" + c + "-" + d];
            return e ? e : (1 === c && 1 === d ? e = "元旦" : 2 === c && 14 === d ? e = "情人" : 5 === c && 1 === d ? e = "五一" : 6 === c && 1 === d ? e = "儿童" : 10 === c && 1 === d ? e = "国庆" : 12 === c && 25 === d && (e = "圣诞"), e)
        }
        function t(a, b, c) {
            var d = fish.one(a);
            (b.getTime() < this._.startDate.getTime() || b.getTime() > this._.endDate.getTime()) && d.addClass("invalid-day");
            var e, f = b.getDate();
            dateStr = s(b), dateStr && (e = "festival"), b.getTime() === this.today.getTime() && (dateStr = "今天", e = "today"), "function" == typeof this._.buildContent ? this._.buildContent(a, b, dateStr, c) : a.innerHTML = '<span class="d">' + (dateStr ? dateStr : f) + "</span>", a.setAttribute("data-date", f), e && d.addClass(e);
            var g = !1;
            this._.currentDate[0] && (b.getTime() > this._.currentDate[0].getTime() ? g = !0 : b.getTime() === this._.currentDate[0].getTime() && d.addClass("from-day")), this._.currentDate[1] && (b.getTime() < this._.currentDate[1].getTime() ? g && d.addClass("range-day") : b.getTime() === this._.currentDate[1].getTime() && d.addClass("to-day"))
        }
        function u(a, b) {
            for (var c = ["sunday", "saturday"], d = 0; d < c.length; d++) if (-1 !== a.className.indexOf(c[d])) return void(a.className = c[d] + " " + b);
            a.className = b
        }
        function v(a, b, c) {
            var d, e, f = fish.dom("table", a),
                g = b.getMonth(),
                h = 1,
                i = new Date(b);
            for (this.updateHeaderMonth(a, b.getFullYear(), g + 1); i.getDay() !== this.firstDay;) i.setDate(i.getDate() - 1), e = f.rows[1].cells[(i.getDay() - this.firstDay + 7) % 7], this.showOtherMonth ? (u(e, "previous-month-day"), t.call(this, e, i, c)) : (e.innerHTML = "", u(e, "invalid-day"));
            for (; b.getMonth() === g;) d = (b.getDay() - this.firstDay + 7) % 7, e = f.rows[h].cells[d], u(e, ""), t.call(this, e, b, c), 6 === d && h++, b.setDate(b.getDate() + 1);
            for (; 7 > h;) d = (b.getDay() - this.firstDay + 7) % 7, e = f.rows[h].cells[d], this.showOtherMonth ? (u(e, "next-month-day"), t.call(this, e, b, c)) : (e.innerHTML = "", u(e, "invalid-day")), 6 === d && h++, b.setDate(b.getDate() + 1)
        }
        function w(a, b, c) {
            var d = this.yearPanel.getElementsByTagName("span");
            c = c || this.yearPanel.getElementsByTagName("a"), a <= b.getFullYear() ? fish.one(d[0]).addClass("invalid-nav") : fish.one(d[0]).removeClass("invalid-nav");
            for (var e = 0, f = c.length; f > e; e++) c[e].innerHTML = a, a < b.getFullYear() || a > this._.endDate.getFullYear() ? fish.one(c[e]).addClass("invalid-year") : fish.one(c[e]).removeClass("invalid-year"), a++;
            a > this._.endDate.getFullYear() ? fish.one(d[1]).addClass("invalid-nav") : fish.one(d[1]).removeClass("invalid-nav")
        }
        function x(a, b) {
            var c, d = this.monthPanel.getElementsByTagName("a");
            for (c = 0; 12 > c; c++) a < b.getFullYear() || a > this._.endDate.getFullYear() || a === b.getFullYear() && c < b.getMonth() || a === this._.endDate.getFullYear() && c > this._.endDate.getMonth() ? fish.one(d[c]).addClass("invalid-month") : fish.one(d[c]).removeClass("invalid-month")
        }
        var y = {};
        ["Date", "Array"].forEach(function(a) {
            y["is" + a] = function(b) {
                return Object.prototype.toString.call(b) === "[object " + a + "]"
            }
        }), n.prototype.dayStrs = ["日", "一", "二", "三", "四", "五", "六"], n.prototype.pick = function(a) {
            if ("show" !== this.style) {
                if (this.panel || (o.call(this), this.wrapper ? this.wrapper.appendChild(this.panel) : document.body.appendChild(this.panel), this.panel.style.position = "absolute", this.panel.style.zIndex = this.zIndex, p.call(this), q.call(this), fish.browser("ms", 6) && (this.iframeCover = new fish.IframeCover(this.panel))), void 0 !== a && (h(a), a.elem && (a.elem = fish.one(a.elem), a.elem.length ? (a.elem = a.elem[0], - 1 === this._elems.indexOf(a.elem) && this._elems.push(a.elem)) : delete a.elem), a.elems)) for (var b = 0, c = a.elems.length; c > b; b++) - 1 === this._elems.indexOf(a.elems[b]) && this._elems.push(a.elems[b]);
                m.call(this, a), i(this._), j(this._), this.update();
                var d = this;
                setTimeout(function() {
                    d.panel.style.zIndex = d._.zIndex, k(d.panel, d._.elem), d.iframeCover && d.iframeCover.update()
                }, 0)
            }
        }, n.prototype.hide = function() {
            this.panel && (this.isBigRange && (l(this.yearPanel), l(this.monthPanel)), l(this.panel), this.iframeCover && this.iframeCover.update())
        }, n.prototype.update = function(a, b) {
            var d, e = fish.all(".calendar-wrapper", this.panel);
            if (this.today = new Date, c(this.today), y.isDate(a)) d = a, b = d.getMonth();
            else if ("undefined" == typeof a) {
                var f = this.today.getTime() > this._.startDate.getTime() ? this.today : this._.startDate;
                d = new Date("rangeTo" === this._.mode ? this._.currentDate[1] ? this._.currentDate[1] : this._.currentDate[0] ? this._.currentDate[0] : f : this._.currentDate[0] ? this._.currentDate[0] : f), d.setDate(1)
            } else d = new Date(a, b - 1, 1);
            if (this._.startDate && (this._.startDate.getFullYear() === d.getFullYear() && this._.startDate.getMonth() === b || this._.startDate.getTime() > d.getTime() ? fish.one(".previous-month", this.panel).addClass("previous-month-disabled") : fish.one(".previous-month", this.panel).removeClass("previous-month-disabled")), this._.ajaxObj) {
                var g = 0,
                    h = fish.one(".loading", this.panel);
                h.length ? h.css("display: block;") : fish.one(this.panel).html("bottom", '<div class="loading"></div>')
            }
            for (var i = 0, j = e.length; j > i; i++) {
                if (this._.ajaxObj) {
                    var k = this;
                    ! function(a, b) {
                        var c = fish.lang.extend({}, k._.ajaxObj);
                        c.url = c.url.replace("{year}", b.getFullYear()).replace("{month}", b.getMonth() + 1);
                        var d = c.fn;
                        c.fn = function(c) {
                            "function" == typeof d && (c = d(c)), v.call(k, a, b, c), g++, g === k.monthNum && fish.one(".loading", k.panel).css("display:none;")
                        }, fish.ajax(c)
                    }(e[i], new Date(d))
                } else v.call(this, e[i], new Date(d));
                d.setMonth(d.getMonth() + 1)
            }
            d.setMonth(d.getMonth() - 1), this._.endDate && (this._.endDate.getFullYear() === d.getFullYear() && this._.endDate.getMonth() === d.getMonth() || this._.endDate.getTime() < d.getTime() ? fish.one(".next-month", this.panel).addClass("next-month-disabled") : fish.one(".next-month", this.panel).removeClass("next-month-disabled"))
        }, n.prototype.previousMonth = function() {
            r.call(this, !0)
        }, n.prototype.nextMonth = function() {
            r.call(this)
        };
        var z = {
            "2016-2-7": "除夕",
            "2016-2-8": "春节",
            "2016-2-22": "元宵",
            "2016-4-4": "清明",
            "2016-6-9": "端午",
            "2016-8-9": "七夕",
            "2016-9-15": "中秋",
            "2015-2-18": "除夕",
            "2015-2-19": "春节",
            "2015-3-5": "元宵",
            "2015-4-5": "清明",
            "2015-6-20": "端午",
            "2015-8-20": "七夕",
            "2015-9-27": "中秋",
            "2014-1-30": "除夕",
            "2014-1-31": "春节",
            "2014-2-14": "元宵",
            "2014-4-5": "清明",
            "2014-6-2": "端午",
            "2014-8-2": "七夕",
            "2014-9-8": "中秋",
            "2013-2-9": "除夕",
            "2013-2-10": "春节",
            "2013-2-24": "元宵",
            "2013-4-4": "清明",
            "2013-6-12": "端午",
            "2013-8-13": "七夕",
            "2013-9-19": "中秋"
        };
        fish.extend({
            Calendar: n
        })
    }();