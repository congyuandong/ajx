var fish;
!function (doc, win) {
    function proto(a) {
        var b = function () {
        };
        return b.prototype = a, new b
    }

    function extend(a, b, c) {
        if (b && a) {
            var d, e;
            for (e in b)(null != (d = b[e]) || c) && (a[e] = d);
            return a
        }
    }

    var F, uList = {
        anim: {v: "0.1", g: "201206110"},
        mTab: {v: "0.1", g: "20120608"},
        mCal: {v: "0.4", css: 1, g: "20120713"},
        preventInput: {parent: "mCal"},
        recoverInput: {parent: "mCal"},
        mSlider: {v: "0.1", css: 1, g: "20120620"},
        mPop: {v: "0.1", css: 1, g: "20120608"},
        lazyLoad: {v: "0.1", g: "20120620"},
        template: {v: "0.2", g: "2013080101"}
    }, param = {
        debug: "fwd.",
        product: "",
        branch: "product",
        baseUrl: function () {
            for (var a = document.getElementsByTagName("script"), b = a.length, c = baseUrl = ""; b-- && (c = a[b].src, !(c.indexOf("fish.") > -1)););
            return baseUrl = c.match(/.*(?=fish\.)/g), baseUrl ? baseUrl[0] + "module/" : ""
        }(),
        fmJs: "{model}/{version}/{model}.{branch}js?v={generation}",
        fmCss: "{model}/{version}/{model}.css?v={generation}",
        combine: !0,
        spriteInterval: 0,
        fmCombineFn: function (a) {
            for (var b = "http://js.40017.cn/cn/min/??", c = 0, d = a.length; d > c; c++)a[c] = a[c].replace(b, "");
            return "http://js.40017.cn/cn/min/??" + a.join(",")
        }
    };
    [].forEach || (Array.prototype.forEach = function (a) {
        var b = this.length || 0, c = 0, d = arguments[1];
        if ("function" == typeof a)for (; b > c; c++)a.call(d, this[c], c, this)
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
        var b, c;
        for (b = 0, c = this.length; c > b; b++)if (this[b] === a)return b;
        return -1
    });
    var rwhite = /\s/, trimLeft = /^\s+/, trimRight = /\s+$/;
    rwhite.test(" ") || (trimLeft = /^[\s ]+/, trimRight = /[\s ]+$/);
    var trim = String.prototype.trim ? function (a) {
        return void 0 === a || "" === a ? "" : String.prototype.trim.apply(a)
    } : function (a) {
        return void 0 === a || "" === a ? "" : a.toString().replace(trimLeft, "").replace(trimRight, "")
    }, spritepipe;
    !function () {
        function a(a, b) {
            for (var c = a.length; c--;)if (a[c] === b)return void a.splice(c, 1)
        }

        function b(a) {
            return trim(a.replace(/\s+/g, " ")).split(" ")
        }

        var c = [], d = {}, e = {
            js: {name: [], url: [], timer: null},
            css: {name: [], url: [], timer: null}
        }, f = doc.getElementsByTagName("script")[0], g = /{branch}/g, h = /{model}/g, i = /{generation}/g, j = /{version}/g;
        spritepipe = {
            STATE: {UNLOAD: 0, LOADING: 1, LOADED: 2},
            uList: uList,
            execs: c,
            listener: d,
            load: function (a, d, e, f) {
                {
                    var g, h, i = b(a).sort(), j = 0;
                    i.length
                }
                if (d) {
                    var k = "_" + i.join("_") + "_";
                    c[k] || (c[c[c.length] = k] = []);
                    for (var l = 0, m = i.length; m > l; l++)g = i[l], F[g] && !F[g]._sprite_ && (j++, c[k][g] = !0);
                    if (c[k].push([d, e, f]), c[k].num = i.length, c[k].now = j, i.length === j)return void _pipe.exec(k)
                }
                i.forEach(function (a) {
                    h = uList[a], spritepipe.state(a) < spritepipe.STATE.LOADING || spritepipe.state(a) === spritepipe.STATE.LOADED && fish[a]._sprite_ ? h.parent ? spritepipe.load(h.parent) : (_pipe.newElem("js", a, _pipe.parseUrl("fmJs", a, h)), h.css && _pipe.newElem("css", a, _pipe.parseUrl("fmCss", a, h)), spritepipe.state(a, spritepipe.STATE.LOADING), _pipe.eventExec(a, "loading")) : spritepipe.state(a) === spritepipe.STATE.LOADED && _pipe.exec(a)
                })
            },
            extend: function (a) {
                spritepipe.state(a, spritepipe.STATE.LOADED), _pipe.eventExec(a, "loaded"), _pipe.exec(a)
            },
            on: function (a, b, c) {
                var e = d[a];
                e = e || {}, e[b] = e[b] || [], e[b].push(c), d[a] = e
            },
            remove: function (b, c, e) {
                d[b] && d[b][c] && a(d[b][c], e)
            },
            state: function (a, c) {
                for (var d, e = b(a), f = 0, g = e.length; g > f; f++)if (d = e[f], uList[d]) {
                    if (!c) {
                        var h = uList[d].parent ? this.state(uList[d].parent) : uList[d].state;
                        return h ? h : this.STATE.UNLOAD
                    }
                    uList[d].parent ? this.state(uList[d].parent, c) : uList[d].state = c
                }
            }
        }, _pipe = {
            exec: function (a) {
                for (var d, e, f, g, h, i = b(a).sort(), j = 0, k = i.length; k > j; j++)for (g = i[j], h = c.length; h--;)if (d = c[h], d.indexOf("_" + g + "_") > -1 && !c[d][g] && (c[d][g] = !0, c[d].now++), c[d].now >= c[d].num) {
                    for (e = c[d]; f = e.shift();)setTimeout(function (a, b, c) {
                        return function () {
                            "function" == typeof a[0] ? a[2] ? a[0].apply(a[1] ? a[1] : c, a[2]) : a[0].apply(a[1] ? a[1] : c) : b[a[0]] && !b[a[0]]._sprite_ && b[a[0]].apply(a[1], a[2])
                        }
                    }(f, F, win), 0);
                    c.splice(h, 1), c[d] = null
                }
            }, parseUrl: function (a, b, c) {
                var d = param[a].replace(h, b).replace(j, c.v).replace(i, c.g);
                return param.baseUrl + d.replace(g, param[param.branch])
            }, eventExec: function (a, c) {
                for (var e, f, g, h = b(a), i = 0, j = h.length; j > i; i++)if (name = h[i], d[name] && d[name][c])for (e = d[name][c], g = e.length; f = e[--g];)f()
            }, newElem: function (a, b, c, d) {
                function g() {
                    var b, g = e[a].name.join(" "), h = param.combine ? e[a].url.length > 1 ? param.fmCombineFn(e[a].url) : e[a].url[0] : c;
                    if (h) {
                        switch (a) {
                            case"css":
                                b = doc.createElement("link"), b.rel = "stylesheet", b.type = "text/css";
                                break;
                            case"js":
                                b = doc.createElement("script"), b.async = !0, b.type = "text/javascript"
                        }
                        switch (b.onreadystatechange = b.onload = function () {
                            var a = b.readyState;
                            (!a || /loaded|complete/.test(a)) && (b.onreadystatechange = null, "function" == typeof d && d(g))
                        }, a) {
                            case"css":
                                b.href = h;
                                break;
                            case"js":
                                b.src = h
                        }
                        f.parentNode.insertBefore(b, f), e[a].name = [], e[a].url = [], e[a].timer = null
                    }
                }

                param.combine ? (e[a].timer && clearTimeout(e[a].timer), e[a].timer = setTimeout(g, param.spriteInterval), e[a].name.push(b), e[a].url.push(c)) : g()
            }
        }
    }();
    var bones = [], su = {
        cores: {}, link: function () {
            for (var a = su.cores.sprite = su.sprite.fn, b = 0; b < bones.length; b++)a = proto(a), extend(a, bones[b].fn), su.cores[bones[b].name] = a;
            return a
        }, append: function (a, b) {
            su.cores[a] || (su.cores[a] = !0, bones.push({name: a, fn: b}))
        }, roe: function () {
            return proto(su.cores.exec)
        }, sprite: {
            init: function () {
                for (name in uList)(!this.fn[name] || this.fn[name] && !this.fn[name]._sprite_) && (this.fn[name] = function (a) {
                    var b = function () {
                        spritepipe.load(a, a, this, arguments)
                    };
                    return b._sprite_ = !0, b
                }(name))
            }, fn: {}
        }, combine: function (a) {
            param.combine = a
        }, branch: function (a) {
            null != param[a] && (param.branch = a)
        }, config: function (a) {
            extend(uList, a), this.sprite.init()
        }, pipe: spritepipe, extend: function (a, b, c) {
            var d = su.cores[a];
            d && extend(d, b);
            var e;
            if (!c)for (e in b)spritepipe.extend(e)
        }
    };
    su.sprite.init(), su.append("exec", {}), F = fish = su.link(), su.extend("exec", {
        guid: function () {
            var a = function () {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            };
            return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
        }, lang: {extend: extend, proto: proto}, extend: function (a, b) {
            su.extend("exec", a, b)
        }, trim: trim, require: function () {
            for (var a, b, c, d, e = arguments, f = 1; f < e.length; f++)switch (typeof e[f]) {
                case"string":
                    switch (e[f]) {
                        case"loaded":
                            a = "loaded";
                            break;
                        case"ready":
                            a = "ready"
                    }
                    break;
                case"number":
                    b = e[f];
                    break;
                case"function":
                    c = e[f]
            }
            d = function () {
                spritepipe.load(e[0], c)
            }, b ? setTimeout(function () {
                a ? fish[a](d) : d()
            }, b) : a ? fish[a](d) : d()
        }
    }), F.admin = su, F.inWater = !0, function () {
        function a() {
            d || (d = !0, c("ready"))
        }

        function b() {
            a(), old = !0, c("loaded")
        }

        function c(a) {
            if ("ready" === a)for (; e.length;)e.shift()(); else if ("loaded" === a)for (; f.length;)f.shift()()
        }

        var d = old = !1, e = [], f = [];
        doc.addEventListener ? (doc.addEventListener("DOMContentLoaded", a, !1), win.addEventListener("load", b, !1)) : doc.attachEvent && (!function () {
            var b = doc.documentElement;
            if (b.doScroll)try {
                if (b.doScroll("left"), !doc.body)throw"body has not ready";
                a()
            } catch (c) {
                setTimeout(arguments.callee, 10)
            }
        }(), win.attachEvent("onload", b)), fish.extend({
            ready: function (a) {
                "function" == typeof a && (d ? a() : e.push(a))
            }, loaded: function (a) {
                "function" == typeof a && (old ? a() : f.push(a))
            }
        }, !0)
    }(), function () {
        function processParameter(a, b, c, d) {
            function e(a, b, c) {
                var d, e, f = [];
                if (void 0 === b)d = doc; else if (1 === b.nodeType || 9 === b.nodeType)d = b; else {
                    if (1 !== b.length || 1 !== b[0].nodeType)return;
                    d = b[0]
                }
                return "string" != typeof a || "" === a ? !a || 1 !== a.nodeType && 9 !== a.nodeType && a !== win || void 0 !== arguments[1] ? "object" == typeof a && "function" != typeof a && a.length && void 0 === arguments[1] ? (c ? f.push(a[0]) : f = a, {result: f}) : void 0 : (f.push(a), {result: f}) : (e = a, d && e ? {
                    selectors: e,
                    context: d
                } : void 0)
            }

            var f, g = e(a, b, d), h = [];
            if (g)return g.selectors && g.context ? "querySelectorAll" === c ? (d ? (f = g.context.querySelector(g.selectors), f && h.push(f)) : h = g.context.querySelectorAll(g.selectors), h) : g : g.result ? g.result : void 0
        }

        function makeSelectorsQueue(a, b) {
            var c, d, e = [], f = a, g = [];
            do if (b.exec(""), c = b.exec(f), c && (f = c[3], g.push(c[1]), c[2])) {
                d = c[3];
                break
            } while (c);
            return d ? ((0 === d.indexOf(",") || d.indexOf(",") === d.length - 1) && express.error(), e.concat([g], makeSelectorsQueue(d, b))) : [g]
        }

        function filterSelector(a, b) {
            {
                var c = a["#"], d = a.tag, e = a[":"], f = a["."];
                a["[]"]
            }
            return c && !filterSelector.checkWithId(c, b) ? !1 : d && !filterSelector.checkWithType(d, b) ? !1 : e && !filterSelector.checkWithPseudo(e, b) ? !1 : f && !filterSelector.checkWithClassName(f, b) ? !1 : !0
        }

        function getRelate(a, b, c, d) {
            function e(a) {
                for (var b = [], c = a.firstChild; c;)1 === c.nodeType && b.push(c), c = c.nextSibling;
                return b
            }

            function f(a, b) {
                var c = [];
                do if (a = a.nextSibling, a && 1 === a.nodeType && (c.push(a), "+" === b))break; while (null !== a);
                return c
            }

            var g, h = 0, i = 0, j = [], k = express.splitSelectors(a), l = k["#"], m = k.tag, n = null, o = null, p = null;
            if (l && l.length > 1)return j;
            for (; o = c[h]; h++) {
                switch (d) {
                    case">":
                        g = e(o), n = k;
                        break;
                    case"":
                        l ? (g = getById(l[0], o), n = getFilterSelector(k, "#")) : m ? (g = getByType(m[0], o), n = getFilterSelector(k)) : (g = getByType("*", o), n = getFilterSelector(k));
                        break;
                    case"+":
                        g = f(o, "+"), n = k;
                        break;
                    case"~":
                        g = f(o), n = k
                }
                for (i = 0; p = g[i]; i++)filterSelector(n, p) && j.push(p)
            }
            return j = unique(j, "union")
        }

        function getFilterSelector(a, b) {
            var c, d = {":": a[":"], ".": a["."], "[]": a["[]"]}, e = d["."], f = [], g = 0;
            if (e.length) {
                for (; c = e[g]; g++)f.push(" " + c.substring(1) + " ");
                d["."] = f
            }
            switch (b) {
                case"#":
                    d.tag = a.tag;
                    break;
                default:
                    return d
            }
            return d
        }

        function runDigger(a, b) {
            for (var c, d, e, f = a.length, g = 0, h = []; g !== f;) {
                if (c = a[g], d = express.splitSelectors(c), 0 === g)h = getNodes(d, b); else if (e = "string" == typeof d.rel ? d.rel : d.rel[0], "" !== e && (c = a[++g]), h = getRelate(c, b, h, e), 0 === h.length)return h;
                g++
            }
            return h
        }

        function getNodes(a, b) {
            var c = a["#"], d = a.tag, e = a[":"], f = a["."], g = (a["[]"], null), h = [];
            return c ? c.length > 1 ? h : (g = getFilterSelector(a, "#"), getAndFilter(c, b, g, "#")) : d ? (g = getFilterSelector(a), getAndFilter(d, b, g, "tag")) : e ? (g = getFilterSelector(a), getAndFilter(e, b, g, ":")) : f ? (g = getFilterSelector(a), getAndFilter(f, b, g, ".")) : void 0
        }

        function getAndFilter(a, b, c, d) {
            var e, f = 0, g = [], h = [];
            switch (d) {
                case"#":
                    g = getById(a[0], b);
                    break;
                case"tag":
                    g = getByType(a[0], b);
                    break;
                case":":
                    g = getByPseudo(a[0], b);
                    break;
                case".":
                    g = a.length > 1 ? getByType("*", b) : getByClassName(a[0], b)
            }
            for (; e = g[f]; f++)filterSelector(c, e) && h.push(e);
            return h
        }

        function getById(a) {
            var b = null, c = [];
            return b = document.getElementById(a.substring(1)), b && c.push(b), c
        }

        function getByType(a, b) {
            var c = b.getElementsByTagName(a);
            return "*" === a ? beArray(c) : c
        }

        function getByPseudo(a, b) {
            var c, d, e, f, g = getByType("*", b), h = 0, i = g.length, j = [];
            switch (a) {
                case":first-child":
                    for (; h !== i;) {
                        if ("html" !== g[h].nodeName.toLowerCase()) {
                            for (c = g[h], d = c.previousSibling; null !== d && 1 !== d.nodeType;)d = d.previousSibling;
                            d || j.push(c)
                        }
                        h++
                    }
                    break;
                case":last-child":
                    for (; h !== i;) {
                        if ("html" !== g[h].nodeName.toLowerCase()) {
                            for (e = g[h], f = e.nextSibling; null !== f && 1 !== f.nodeType;)f = f.nextSibling;
                            f || j.push(e)
                        }
                        h++
                    }
            }
            return j
        }

        function getByClassName(a, b) {
            for (var c, d = b.getElementsByTagName("*"), e = " " + a.substring(1) + " ", f = [], g = d.length; g--;)c = " " + d[g].className + " ", c.indexOf(e) > -1 && f.unshift(d[g]);
            return f
        }

        function beArray(a, b) {
            for (var c = [], d = 0, e = a.length; d !== e && (1 !== a[d].nodeType || (c.push(a[d]), !b));)d++;
            return c
        }

        function unique(a, b) {
            var c, d, e, f = [], g = !1;
            if (1 === a.length)return a;
            for (; a.length;) {
                for (d = a.shift(), e = a.length, c = 0; e > c;)d === a[c] && (a.splice(c, 1), c--, g = !0), c++;
                g || "diff" !== b ? g && "same" === b ? f.push(d) : "union" === b && f.push(d) : f.push(d), g = !1
            }
            return f
        }

        function makeThis(a, b) {
            for (var c = 0, d = b.length; c != d; c++)a[c] = b[c];
            return a.length = d, a
        }

        function all(a, b) {
            return sparrow(a, b)
        }

        function one(a, b) {
            return sparrow(a, b, !0)
        }

        function dom(a, b) {
            return sparrow(a, b, !0)[0] || null
        }

        function _preFormCallBack(a, b, c) {
            var d = a;
            return "function" == typeof a && (d = a.call(b, c)), d
        }

        function getTag(a) {
            return null === a.firstChild ? {UL: "LI", DL: "DT", TR: "TD"}[a.tagName] || a.tagName : a.firstChild.tagName
        }

        function wrapHelper(a, b) {
            if ("string" == typeof a)return wrap(a, getTag(b));
            var c = document.createElement("div");
            return c.appendChild(a), c
        }

        function wrap(a) {
            var b = document.createElement("div");
            return b.innerHTML = a, b
        }

        function normalize(a) {
            var b, c, d, e, f, g = [], h = speCss.length;
            for (parseEl.innerHTML = "<div style='" + a + "'></div>", c = parseEl.childNodes[0].style; h--;)(e = c[speCss[h]]) && (g[g[g.length] = speCss[h]] = e);
            a = a.replace(/-([a-z])/g, function (a, b) {
                return b.toUpperCase()
            }), b = a.split(";");
            for (var i = 0; i < b.length; i++)d = b[i].split(":"), d[0] && -1 === speCssStrL.indexOf(" " + F.trim(d[0].toLowerCase() + " ")) && (f = F.trim(d[0]), g[g[g.length] = f] = F.trim(d[1]));
            return g
        }

        function clean(a) {
            var b = /\S/;
            a.each(function (a) {
                for (var c, d = a, e = d.firstChild, f = -1; e;) {
                    if (c = e.nextSibling, 3 != e.nodeType || b.test(e.nodeValue))null != e.nodeIndex && (e.nodeIndex = ++f); else try {
                        d.removeChild(e)
                    } catch (g) {
                        e = c;
                        continue
                    }
                    e = c
                }
            })
        }

        function strToFn(a) {
            var b = a.charAt(0);
            return "." === b ? (a = a.substring(1), function (b) {
                return F.one(b).hasClass(a)
            }) : "#" === b ? (a = a.substring(1), function (b) {
                return b.id === a
            }) : function (b) {
                return b.tagName ? b.tagName.toLowerCase() === a : !1
            }
        }

        function buidEvent(a) {
            a = a || window.event, a.preventDefault || (a.preventDefault = preventDefault)
        }

        function _parseTime_(a, b, c) {
            var d, e = /\s(\d+):?(\d+)?:?(\d+)?/;
            if ("object" == typeof a && null !== a)var f = a.getFullYear(), g = a.getMonth() + 1, h = a.getDate(), i = a.getHours(), j = a.getMinutes(), k = a.getSeconds(); else {
                a = a ? a : "", d = e.exec(a);
                var k = a.split("-"), f = parseInt(k[0], 10), g = parseInt(k[1], 10), h = parseInt(k[2], 10), i = 0, j = 0, k = 0;
                d && (d[1] && (i = parseInt(d[1], 10)), d[2] && (j = parseInt(d[2], 10)), d[3] && (k = parseInt(d[3], 10)))
            }
            var l, m = new Date, n = {years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, timeMode: null};
            if (f && g && h) {
                fish.lang.extend(n, b), f += n.years, g += n.months, h += n.days, i += n.hours, j += n.minutes, k += n.seconds, l = new Date(f, g - 1, h, i, j, k), f = l.getFullYear(), g = l.getMonth() + 1, h = l.getDate(), i = l.getHours(), j = l.getMinutes(), k = l.getSeconds(), g = 10 > g ? "0" + g : g, h = 10 > h ? "0" + h : h, i = 10 > i ? "0" + i : i, j = 10 > j ? "0" + j : j, k = 10 > k ? "0" + k : k;
                var o;
                return o = n.timeMode ? n.timeMode.replace("YYYY", f).replace("MM", g).replace("DD", h).replace("hh", i).replace("mm", j).replace("ss", k) : [f, g, h].join("-"), o = c ? {
                    y: f,
                    m: g,
                    d: h,
                    h: i,
                    mi: j,
                    s: k
                } : o
            }
            return arguments.callee.hasCallOnce ? void 0 : (arguments.callee.hasCallOnce = !0, arguments.callee([m.getFullYear(), m.getMonth() + 1, m.getDate()].join("-"), b, c))
        }

        function pint(a) {
            return parseInt(a, 10)
        }

        function _isArgIlegal(a, b) {
            return !!~b.indexOf(a)
        }

        function offsetInit() {
            var a, b, c, d, e = document.body, f = document.createElement("div"), g = 0, h = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>", i = {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            };
            for (var j in i)f.style[j] = i[j];
            f.innerHTML = h, e.insertBefore(f, e.firstChild), a = f.firstChild, b = a.firstChild, d = a.nextSibling.firstChild.firstChild, this.doesNotAddBorder = 5 !== b.offsetTop, this.doesAddBorderForTableAndCells = 5 === d.offsetTop, b.style.position = "fixed", b.style.top = "20px", this.supportsFixedPosition = 20 === b.offsetTop || 15 === b.offsetTop, b.style.position = b.style.top = "", a.style.overflow = "hidden", a.style.position = "relative", this.subtractsBorderForOverflowNotVisible = -5 === b.offsetTop, this.doesNotIncludeMarginInBodyOffset = e.offsetTop !== g, e.removeChild(f), e = f = a = b = c = d = null
        }

        function getRealStyle(a, b) {
            return a.currentStyle ? a.currentStyle[b] : doc.defaultView.getComputedStyle(a, null).getPropertyValue(b)
        }

        filterSelector.checkWithId = function (a, b) {
            var a = a[0].substring(1);
            return b.id === a ? !0 : !1
        }, filterSelector.checkWithType = function (a, b) {
            var a = a[0];
            return b.nodeName.toLowerCase() === a || "*" === a ? !0 : !1
        }, filterSelector.checkWithPseudo = function (a, b) {
            for (var c, d, e = 0, f = 0; c = a[e]; e++)switch (d = b, c) {
                case":first-child":
                    do {
                        if (d.previousSibling && 1 === d.previousSibling.nodeType) {
                            f--;
                            break
                        }
                        d = d.previousSibling
                    } while (null !== d);
                    d || f++;
                    break;
                case":last-child":
                    do {
                        if (d.nextSibling && 1 === d.nextSibling.nodeType) {
                            f--;
                            break
                        }
                        d = d.nextSibling
                    } while (null !== d);
                    d || f++
            }
            return f > 0 ? !0 : !1
        }, filterSelector.checkWithClassName = function (a, b) {
            var c, d = 0, e = b.className;
            if (0 === e.length)return !1;
            for (e = " " + e + " "; c = a[d]; d++)if (e.indexOf(c) < 0)return !1;
            return !0
        }, filterSelector.checkWithAttribute = function () {
        };
        var express = {
            match: {
                type: /^(?:[a-z]+[1-6]?|[*])/g,
                id: /#-*[_a-zA-Z][-_a-zA-Z0-9]*/g,
                className: /\.-*[_a-zA-Z][-_a-zA-Z0-9]*/g,
                pseudo: /:(?:(?:first|last)-child|lang\(\s*[a-z]{2,2}(?:-[a-zA-Z]{2,2})?\s*\))/g,
                attribute: /\[\s*-*[_a-zA-Z][-_a-zA-Z0-9]*(?:\s*[~|]?=\s*(?:(['"])[^'"]+\1|-*[_a-zA-Z][-_a-zA-Z0-9]*))?\s*\]/g,
                specialAttributeMap: {"class": "className", "for": "htmlFor"}
            }, relation: /[>+~](?!=|.*["'])/g, isCombinatorValid: function (a) {
                var b, c, d, e = this.relation, f = a.length;
                for ((e.test(a[0].charAt(0)) || e.test(a[f - 1].charAt(a[f - 1].length - 1))) && this.error(); f--;)b = a[f], c = a[f - 1], d = a[f + 1], e.test(b) && (e.test(c) || e.test(d)) && this.error()
            }, splitSelectors: function (a) {
                var b = a.match(this.match.id) || "", c = a.match(this.match.type) || "", d = a.match(this.match.className) || "", e = a.match(this.match.pseudo) || "", f = a.match(this.match.attribute) || "", g = a.match(this.relation) || "";
                return ((b.length ? b.join("") : b) + (c.length ? c.join("") : c) + (d.length ? d.join("") : d) + (e.length ? e.join("") : e) + (f.length ? f.join("") : f) + (g.length ? g.join("") : g)).length !== a.length && express.error(), {
                    "#": b,
                    tag: c,
                    ".": d,
                    ":": e,
                    "[]": f,
                    rel: g
                }
            }, error: function () {
                throw new Error("选择器语法错误！")
            }
        }, sparrow = doc.querySelectorAll && doc.getElementsByClassName ? function (a, b, c) {
            var d = F.admin.roe(), e = processParameter(a, b, "querySelectorAll", c);
            return e && 0 !== e.length ? makeThis(d, e) : (d.length = 0, d)
        } : function (a, b, c) {
            var d, e, f, g, h, i, j = F.admin.roe(), k = /((?::[-a-z]+(?:\([-a-zA-z]+\))?|\[(?:[^\[\]'"]+|['"][^'"]*['"])+\]|[^ >+~,\[\]():]+)+|[>+~])(\s*,\s*)?((?:.)*)/g, l = 0, m = [];
            if (f = processParameter(a, b, void 0, c), !f)return j.length = 0, j;
            if (!f.selectors || !f.context)return makeThis(j, f);
            for (d = f.context, e = f.selectors, g = makeSelectorsQueue(e, k), h = g.length; l !== h; l++)express.isCombinatorValid(g[l]);
            for (l = 0; l !== h; l++)i = runDigger(g[l], d), m = m.concat(i);
            return c && (m = m[0] ? [m[0]] : m), 1 === h ? makeThis(j, m) : makeThis(j, unique(m, "union"))
        }, parseEl = document.createElement("div"), speCssStr = "webkitTransform OTransform msTransform MozTransform", speCssStrL = " " + speCssStr.toLowerCase() + " ", speCss = speCssStr.split(" "), gHTMLFn = {
            remove: function (a) {
                a.parentNode.removeChild(a)
            }, outer: function (a, b) {
                b.parentNode.replaceChild(a, b)
            }, top: function (a, b) {
                b.insertBefore(a, b.firstChild)
            }, bottom: function (a, b) {
                b.insertBefore(a, null)
            }, before: function (a, b) {
                b.parentNode.insertBefore(a, b)
            }, after: function (a, b) {
                b.parentNode.insertBefore(a, b.nextSibling)
            }
        }, ajaxCaches = {}, eventHandlerContainer = {
            hook: "fish" + (Math.random() + "").replace(/\D/, ""),
            id: 1
        }, dataContainer = {}, fire = function () {
            return doc.dispatchEvent ? function (a, b, c) {
                var d = document.createEvent("HTMLEvents");
                F.lang.extend(d, c), d.initEvent(b, !0, !0), a.dispatchEvent(d)
            } : function (a, b, c) {
                var d = document.createEventObject();
                F.lang.extend(d, c), a.fireEvent("on" + b, d)
            }
        }();
        preventDefault = function () {
            this.returnValue = !1
        };
        var fns = {
            splice: [].splice, all: all, dom: dom, one: one, isElement: function (a, b) {
                return 1 === a.nodeType && (void 0 === b ? !0 : a.tagName.toLowerCase() === b)
            }, getParent: function (a) {
                var b = this[0];
                if (b)do if (b = b.parentNode, b && fish.all(b).hasClass(a.substring(1)))return fish.all(b); while (null !== b);
                var c = F.admin.roe();
                return c.length = 0, c
            }, parent: function (a) {
                function b(a) {
                    for (var b = 0; e > b && d[b] !== a; b++);
                    b === e && (d[e++] = a)
                }

                if (0 === this.length)return this;
                var c, d = F.admin.roe(), e = 0;
                if (d.length = 0, "string" != typeof a || "" === a || /\s+/.test(a) || (a = strToFn(a)), void 0 === a)c = function (a) {
                    a.parentNode && b(a.parentNode)
                }; else if ("number" == typeof a)c = function (a, c) {
                    for (var d = 0; c > d && a; d++)a = a.parentNode;
                    a && b(a)
                }; else {
                    if ("function" != typeof a)return d;
                    c = function (a, c) {
                        for (a = a.parentNode; a && !c(a);)a = a.parentNode;
                        a && b(a)
                    }
                }
                return this.each(function (b) {
                    c(b, a)
                }), d.length = e, d
            }, add: function (a) {
                var b = this.length;
                if (F.isElement(a))this[b++] = a; else if (a.length)for (var c = 0, d = a.length; d > c; c++)F.isElement(a[c]) && (this[b++] = a[c]);
                return this.length = b, this
            }, clear: function (a, b) {
                function c(a, b) {
                    var c = d(a, b), e = c, f = a.length;
                    if (c > -1) {
                        for (; f - 1 > e;)a[e] = a[e + 1], e++;
                        a.length--
                    }
                }

                function d(a, b) {
                    var c = -1;
                    return b = fish.dom(b), a.each(function (a, d) {
                        return this == b ? (c = d, !1) : void 0
                    }), c
                }

                if (0 == arguments.length) {
                    for (var e = this.length; e--;)delete this[e];
                    return this.length = 0, delete this.object, this
                }
                var b = b ? b : this, f = null, g = null;
                "function" == typeof a ? (f = a, b.each(function () {
                    f() && c(b, this)
                })) : ("string" == typeof a || "object" == typeof a && a.inWater || "object" == typeof a && 1 === a.nodeType) && (g = fish.all(a), g.each(function () {
                    c(b, this)
                }))
            }, each: function (a) {
                for (var b = 0, c = this.length; c > b && a.call(this[b], this[b], b, this) !== !1; ++b);
                return this
            }, hasClass: function (a) {
                if (!a || !this[0])return !1;
                for (var b, c, d = 0; d < this.length; d++) {
                    c = F.trim(_preFormCallBack(a, this[d], d)).split(/\s+/), b = " " + F.trim(this[d].className) + " ";
                    for (var e = c.length; e--;)if (-1 === b.indexOf(" " + c[e] + " "))return !1
                }
                return !0
            }, addClass: function (a) {
                for (var b, c, d = 0; d < this.length; d++) {
                    b = F.trim(_preFormCallBack(a, this[d], d)).split(/\s+/), c = " " + F.trim(this[d].className) + " ";
                    for (var e = 0, f = b.length; f > e; e++)~c.indexOf(" " + b[e] + " ") || (c += b[e] + " ");
                    this[d].className = F.trim(c)
                }
                return this
            }, removeClass: function (a) {
                for (var b, c, d = 0; d < this.length; d++) {
                    b = F.trim(_preFormCallBack(a, this[d], d)).split(/\s+/), c = " " + F.trim(this[d].className) + " ";
                    for (var e = 0; e < b.length; e++)c = c.replace(" " + b[e] + " ", " ");
                    this[d].className = F.trim(c)
                }
                return this
            }, replaceClass: function (a, b) {
                if ("string" != typeof a || "string" != typeof b || /^\s*$/.test(a))return this;
                var c = new RegExp("(^|\\s+)" + a + "(\\s+|$)");
                return this.each(function () {
                    this.className && (this.className = this.className.replace(c, "$1" + b + "$2"))
                }), this
            }, toggleClass: function (a) {
                return this.each(function (b) {
                    var b = F.one(b);
                    b.hasClass(a) ? b.replaceClass(a, "") : (b = b[0], b.className = b.className + " " + a)
                }), this
            }, contains: function (a, b) {
                var c = doc.documentElement;
                if (c.contains || c.compareDocumentPosition) {
                    var d = 9 === a.nodeType ? a.documentElement : a, e = b && b.parentNode;
                    return a === e || !(!e || 1 !== e.nodeType || !(d.contains ? d.contains(e) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(e)))
                }
                if (b)for (; b = b.parentNode;)if (a === b)return !0;
                return !1
            }, indexOf: function (a) {
                for (var b = 0, c = this.length; c > b; b++)if (this[b] === a)return b;
                return -1
            }, data: function (a, b) {
                if (this.length) {
                    for (var c, d, e, f = 0, g = this.length; g > f; f++) {
                        if (c = this[f], d = c[eventHandlerContainer.hook], d || (d = c[eventHandlerContainer.hook] = eventHandlerContainer.id++), e = dataContainer[d], e || (e = dataContainer[d] = {}), void 0 === a)return e;
                        if ("object" == typeof a)F.lang.extend(e, a); else if ("string" == typeof a) {
                            if (void 0 === b)return e[a];
                            e[a] = b
                        }
                    }
                    return this
                }
            }, removeData: function (a) {
                if (this.length) {
                    for (var b, c, d, e = 0, f = this.length; f > e; e++)b = this[e], c = b[eventHandlerContainer.hook], c && (d = dataContainer[c], d && ("string" == typeof a ? delete d[a] : a.forEach && a.forEach(function (a) {
                        delete d[a]
                    })));
                    return this
                }
            }, on: function (a, b, c) {
                if (!b)return this;
                var d, e;
                if (null != this.length ? (d = this, c && (e = !0)) : d = fish.all(c), 0 === d.length)return this;
                var f = function () {
                    return d[0].addEventListener ? function (a, b, c) {
                        a.addEventListener(b, c, !1)
                    } : d[0].attachEvent ? function (a, b, c) {
                        a.attachEvent("on" + b, c)
                    } : void 0
                }();
                return d.each(function (d) {
                    var g = function (a) {
                        return function (d) {
                            if (buidEvent(d), e) {
                                var f = F.all(c, a);
                                d = F.getEvent(d);
                                for (var g = F.getTarget(d); g && g !== a;) {
                                    if (-1 !== f.indexOf(g)) {
                                        d.delegateTarget = g, b.apply(a, [d]);
                                        break
                                    }
                                    g = g.parentNode
                                }
                            } else b.apply(a, [d])
                        }
                    }(d);
                    g[eventHandlerContainer.hook] = [b, c];
                    var h, i = d[eventHandlerContainer.hook];
                    i || (i = d[eventHandlerContainer.hook] = eventHandlerContainer.id++), h = eventHandlerContainer[i], h || (h = eventHandlerContainer[i] = {}), h[a] || (h[a] = []), h[a].push(g), f(d, a, g)
                }), this
            }, off: function (a, b, c) {
                if (!b)return this;
                var d = null != this.length ? this : fish.all(c);
                if (0 === d.length)return this;
                var e = function () {
                    return d[0].addEventListener ? function (a, b, c) {
                        a.removeEventListener(b, c, !1)
                    } : d[0].attachEvent ? function (a, b, c) {
                        a.detachEvent("on" + b, c)
                    } : void 0
                }();
                return d.each(function (d) {
                    var f, g, h = d[eventHandlerContainer.hook];
                    if (h && (f = eventHandlerContainer[h], f && (f = f[a]))) {
                        for (g = f.length; g--;)if (f[g][eventHandlerContainer.hook][0] === b && f[g][eventHandlerContainer.hook][1] === c) {
                            e(d, a, f[g]);
                            break
                        }
                        -1 !== g && f.splice(g, 1)
                    }
                }), this
            }, delegate: function (a, b, c) {
                return 0 === this.length ? this : this.on(b, c, a)
            }, undelegate: function (a, b, c) {
                return this.off(b, c, a)
            }, trigger: function (a, b) {
                return this.each(function (c) {
                    fire(c, a, b)
                }), this
            }, hover: function (a, b) {
                for (var c, d = 0; d < this.length; d++)c = this[d], function (c) {
                    F.on("mouseover", function (b) {
                        var d = F.getRelated(b);
                        (!d || c !== d && !F.contains(c, d)) && a && a.call(c, b)
                    }, c), F.on("mouseout", function (a) {
                        var d = F.getRelated(a);
                        (!d || c !== d && !F.contains(c, d)) && b && b.call(c, a)
                    }, c)
                }(c)
            }, ajax: function (a) {
                function b() {
                    if (4 == f.readyState && (f.status >= 200 && f.status <= 300 || 304 == f.status)) {
                        clearTimeout(a.timer);
                        var b = f.responseText;
                        "json" === g && (b = new Function("return " + b)()), i && i(b), a.cache && (ajaxCaches[o] = b)
                    } else 4 == f.readyState && (clearTimeout(a.timer), n || (j && j(), n = !0))
                }

                function c(a, b) {
                    var c = a;
                    return b && (a.indexOf("?") < 0 ? c += "?" : "?" != a.charAt(a.length - 1) && (c += "&"), c += b), c
                }

                function d() {
                    if (f.setRequestHeader("X-Requested-With", "XMLHttpRequest"), a.headers)for (var b in a.headers)f.setRequestHeader(b, a.headers[b])
                }

                var e, f = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest, g = a.type ? a.type : "string", h = a.openType ? a.openType : "get", i = a.fn, j = a.err, k = (a.data, a.onTimeout), l = a.sync === !0 ? !1 : !0, m = a.timeout ? a.timeout : 16e3, n = !1, o = a.url;
                if (o) {
                    o.indexOf("#") > 0 && (o = o.substring(0, o.indexOf("#"))), o.indexOf("?") > 0 && o.indexOf("?") == o.length - 1 && (o = o.substring(0, o.indexOf("?")));
                    var p = !1, q = !1, r = !1;
                    if ("jsonp" === a.type) {
                        o = c(o, a.data), p = !0;
                        var s = a.jsonpCallback ? a.jsonpCallback : "tc" + parseInt(1e11 * Math.random());
                        if (e = c(o, ("string" == typeof a.jsonp && "" !== a.jsonp ? a.jsonp : "callback") + "=" + s), a.jsonpCallback)if (a.cache) {
                            if (void 0 !== ajaxCaches[o])return void window[s](ajaxCaches[o])
                        } else e += "&iid=" + (new Date).getTime();
                        var t = window[s];
                        window[s] = function (b) {
                            q || (i && i(b), t ? (t(b), window[s] = t) : window[s] = void 0, a.cache && void 0 === ajaxCaches[o] && (ajaxCaches[o] = b), clearTimeout(a.timer))
                        };
                        var u = document.createElement("script");
                        u.type = "text/javascript", u.src = e, u.async = l, document.getElementsByTagName("head")[0].appendChild(u)
                    } else if ("script" === a.type) {
                        o = c(o, a.data);
                        var u = document.createElement("script");
                        u.type = "text/javascript", u.onreadystatechange = u.onload = function () {
                            var a = u.readyState;
                            (!a || /loaded|complete/.test(a)) && (u.onreadystatechange = u.onload = null, i && "function" == typeof i && i())
                        }, u.src = o, u.async = l, document.getElementsByTagName("head")[0].appendChild(u)
                    } else if ("get" === h) {
                        if (o = c(o, a.data), r = !0, e = o, a.cache) {
                            if (void 0 !== ajaxCaches[o])return void(a.fn && a.fn(ajaxCaches[o]))
                        } else e = c(o, "iid=" + Math.random());
                        f.open(h, e, l), f.onreadystatechange = b, d(), f.send(null)
                    } else"post" === h && (r = !0, f.open(h, o, l), f.onreadystatechange = b, f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), d(), f.send(a.data));
                    return a.timer = setTimeout(function () {
                        r && 4 !== f.readyState && (k && k(), f.abort(), n || (j && j(), n = !0)), p && !n && (j && j(), q = !0, n = !0)
                    }, m), f
                }
            }, getEvent: function (a) {
                return a ? a : win.event
            }, getTarget: function (a) {
                var b = F.getEvent(a);
                return b.target || b.srcElement
            }, stopBubble: function (a) {
                var b = F.getEvent(a);
                b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0
            }, getRelated: function (a) {
                var b = F.getEvent(a);
                switch (b.type) {
                    case"mouseover":
                        return b.relatedTarget || b.fromElement;
                    default:
                        return b.relatedTarget || b.toElement
                }
            }, preventDefault: function (a) {
                var b = F.getEvent(a);
                b.preventDefault ? b.preventDefault() : b.returnValue = !1
            }, getKeyCode: function (a) {
                var b = F.getEvent(a);
                return b.keyCode ? b.keyCode : b.which ? b.which : b.charCode
            }, valida: {
                email: function (a) {
                    var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;
                    return b.test(F.trim(a))
                }, phone: function (a) {
                    var b = /^(13|14|15|17|18)[0-9]{9}$/;
                    return b.test(F.trim(a))
                }
            }, css: function () {
                function a(a) {
                    var b = "";
                    if ("string" == typeof a)b = a; else if ("object" == typeof a)for (var c in a)a.hasOwnProperty(c) && (b += c + ":" + a[c] + ";");
                    var d = normalize(b);
                    return this.each(function (a) {
                        for (var b = d.length; b--;)a.style[d[b]] = d[d[b]]
                    })
                }

                return a.normalize = normalize, a
            }(), getCss: function (a) {
                return this[0] && getRealStyle(this[0], a)
            }, cookie: {
                set: function (a) {
                    var b = a;
                    if ("string" == typeof a) {
                        var c = arguments;
                        b = {}, b.name = c[0], b.value = c[1], b.days = c[2], b.path = c[3], b.domain = c[4], b.encode = c[5]
                    }
                    if (null != b.value) {
                        var d, e = new Date;
                        b.days && e.setDate(e.getDate() + parseInt(b.days, 10)), b.hours && e.setHours(e.getHours() + parseInt(b.hours, 10)), b.minutes && e.setMinutes(e.getMinutes() + parseInt(b.minutes, 10)), b.seconds && e.setSeconds(e.getSeconds() + parseInt(b.seconds, 10)), d = b.days || b.hours || b.minutes || b.seconds ? "; expires=" + e.toGMTString() : "";
                        var f = b.value;
                        0 != b.encode && (f = encodeURIComponent(b.value));
                        var g = b.name + "=" + f + d;
                        b.path && (g += ";path=" + b.path), b.domain && (g += ";domain=" + b.domain), doc.cookie = g
                    }
                }, get: function (a, b) {
                    if (doc.cookie && "" != doc.cookie) {
                        for (var c, d, e = null, f = document.cookie.split(";"), g = 0; g < f.length; g++) {
                            var h = F.trim(f[g]);
                            if (h.substring(0, a.length + 1) == a + "=") {
                                if (b)e = h.substring(a.length + 1); else try {
                                    e = decodeURIComponent(h.substring(a.length + 1))
                                } catch (i) {
                                    e = ""
                                }
                                break
                            }
                        }
                        if (e)try {
                            c = decodeURIComponent(e)
                        } catch (i) {
                            c = e
                        }
                        if (b && e) {
                            d = e.split("&"), c = null;
                            for (var g = 0; g < d.length; g++)if (d[g] = F.trim(d[g]), d[g].substring(0, b.length + 1) == b + "=") {
                                try {
                                    c = decodeURIComponent(d[g].substring(b.length + 1))
                                } catch (i) {
                                    c = ""
                                }
                                break
                            }
                        }
                        return c
                    }
                }, remove: function (a, b) {
                    var c = F.cookie.get(a);
                    if (void 0 !== c && null !== c) {
                        var d = {name: a, value: "", days: -1};
                        F.lang.extend(d, b), F.cookie.set(d)
                    }
                }
            }, attr: function (a, b) {
                return null != b ? (this.each(function (c) {
                    c.setAttribute(a, b)
                }), this) : this[0] && this[0].getAttribute(a)
            }, removeAttr: function (a) {
                return this.each(function (b) {
                    b.removeAttribute(a)
                }), this
            }, prop: function (a, b) {
                return this.length ? void 0 !== b ? (this.each(function (c) {
                    c[a] = b
                }), this) : this[0] && this[0][a] : this
            }, val: function (a) {
                return null != a ? (this.each(function (b) {
                    b.value = a
                }), this) : this[0] && this[0].value
            }, effect: function (a) {
                function b(a) {
                    a["_effect_" + i + "_"] = !0
                }

                function c() {
                    "none" === j.getCss("display") && (g.interFn && g.interFn.call(j), g.interShow && j.css("display:block"))
                }

                function d() {
                    "block" === j.getCss("display") && (g.outerFn && g.outerFn.call(j), g.outerHide && j.css("display:none"))
                }

                function e() {
                    clearTimeout(h), h = setTimeout(c, 0)
                }

                function f() {
                    clearTimeout(h), h = setTimeout(d, 0)
                }

                var g = {elem: "", type: "click", interShow: !0, outerHide: !0, interFn: null, outerFn: null};
                F.lang.extend(g, a);
                var h, i = F.guid(), j = this, k = F.all(g.elem);
                switch (k.each(b), this.each(b), g.type) {
                    case"click":
                        F.one(document).on("click", function (a) {
                            for (var b = F.getTarget(a); b && !b["_effect_" + i + "_"];)b = b.parentNode;
                            b ? e() : d()
                        });
                        break;
                    case"hover":
                        k.hover(e, f), this.hover(e, f);
                        break;
                    case"focusBlur":
                        k.on("focus", e), k.on("blur", f)
                }
                return this
            }, html: function (location, html) {
                var legalArr = ["inner", "outer", "top", "bottom", "remove", "before", "after"];
                if (clean(this), 0 == arguments.length)return this[0] ? this[0].innerHTML : void 0;
                if (1 == arguments.length && "remove" != arguments[0] && (html = location, location = "inner"), 2 == arguments.length && !_isArgIlegal(location, legalArr))return this;
                if ("remove" != location && html && void 0 !== html.each) {
                    if ("inner" == location) {
                        var d = document.createElement("p");
                        html.each(function (a) {
                            d.appendChild(a)
                        }), this.each(function (a) {
                            a.innerHTML = d.innerHTML
                        })
                    } else {
                        var that = this;
                        html.each(function (a) {
                            that.html(location, a)
                        })
                    }
                    return this
                }
                return this.each(function (el) {
                    var parent, list, len, i = 0;
                    if ("inner" == location)if ("string" == typeof html || "number" == typeof html)for (el.innerHTML = html, list = el.getElementsByTagName("SCRIPT"), len = list.length; len > i; i++)eval(list[i].text); else el.innerHTML = "", el.appendChild(html); else if ("remove" == location)gHTMLFn[location](el); else {
                        var elArray = ["outer", "top", "bottom"], wrappedE = wrapHelper(html, elArray.toString().indexOf(location) > -1 ? el : el.parentNode), children = wrappedE.childNodes;
                        if (!gHTMLFn[location])return;
                        gHTMLFn[location](wrappedE, el);
                        for (var parent = wrappedE.parentNode; children.length;)parent.insertBefore(children[0], wrappedE);
                        parent.removeChild(wrappedE)
                    }
                })
            }, browser: function (a, b) {
                if (a) {
                    var c = !0;
                    return a !== browser.name && (c = !1), b && a === browser.name && b !== parseInt(browser.version, 10) && (c = !1), c
                }
                return browser
            }, parseTime: function (a, b, c) {
                return _parseTime_.hasCallOnce = !1, _parseTime_(a, b, c)
            }, parseDate: function (a, b) {
                var c = F.parseTime(a, b, !0);
                return new Date(pint(c.y), pint(c.m) - 1, pint(c.d), pint(c.h), pint(c.mi), pint(c.s))
            }, create: function (a) {
                var b = document.createElement("div"), c = [];
                fish.all(b).html(a);
                for (var d = 0; d < b.childNodes.length; d++)1 === b.childNodes[d].nodeType && c.push(b.childNodes[d]);
                return b = null, fish.all(c)
            }
        };
        "getBoundingClientRect"in document.documentElement ? fns.offset = function (a) {
            var b, c = 0, d = 0;
            a && (b = F.one(a).offset());
            {
                var e;
                this.length
            }
            if (e = this[0], e && e.getBoundingClientRect) {
                var f;
                try {
                    f = e.getBoundingClientRect();
                    var g = e.ownerDocument, h = g.body, i = g.documentElement, j = i.clientTop || h.clientTop || 0, k = i.clientLeft || h.clientLeft || 0, l = null != e && e == e.window ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1;
                    c = f.top + (l.pageYOffset || browser.boxModel && i.scrollTop || h.scrollTop) - j, d = f.left + (l.pageXOffset || browser.boxModel && i.scrollLeft || h.scrollLeft) - k
                } catch (m) {
                    c = 0, d = 0
                }
            }
            return {top: b ? c - b.top : c, left: b ? d - b.left : d}
        } : (offsetInit(), fns.offset = function (a) {
            var b;
            a && (b = F.one(a).offset());
            {
                var c;
                this.length
            }
            if (c = this[0]) {
                for (var d, e = c.offsetParent, f = c, g = c.ownerDocument, h = g.documentElement, i = g.body, j = g.defaultView, k = j ? j.getComputedStyle(c, null) : c.currentStyle, l = c.offsetTop, m = c.offsetLeft; (c = c.parentNode) && c !== i && c !== h && (!offsetInit.supportsFixedPosition || "fixed" !== k.position);)d = j ? j.getComputedStyle(c, null) : c.currentStyle, l -= c.scrollTop, m -= c.scrollLeft, c === e && (l += c.offsetTop, m += c.offsetLeft, !offsetInit.doesNotAddBorder || offsetInit.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(c.nodeName) || (l += parseFloat(d.borderTopWidth) || 0, m += parseFloat(d.borderLeftWidth) || 0), f = e, e = c.offsetParent), offsetInit.subtractsBorderForOverflowNotVisible && "visible" !== d.overflow && (l += parseFloat(d.borderTopWidth) || 0, m += parseFloat(d.borderLeftWidth) || 0), k = d;
                ("relative" === k.position || "static" === k.position) && (l += i.offsetTop, m += i.offsetLeft), offsetInit.supportsFixedPosition && "fixed" === k.position && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft))
            }
            return {top: b ? l - b.top : l, left: b ? m - b.left : m}
        }), "width height".split(" ").forEach(function (a, b) {
            var c = b ? "Height" : "Width";
            fns[a] = function (a) {
                var b, d = a ? this.dom(a) : this[0];
                try {
                    if (d === win) {
                        var e = doc.documentElement;
                        b = self["inner" + c] || e && e["client" + c] || doc.body["client" + c]
                    } else if (d === doc)b = doc.body["scroll" + c]; else if ("none" !== getRealStyle(d, "display"))b = d["offset" + c] || d["client" + c]; else {
                        var f = d.style, g = f.display;
                        f.display = "block", b = d["offset" + c] || d["client" + c], f.display = g
                    }
                } catch (h) {
                    b = 0
                }
                return b
            }
        }), "click mouseover mouseout submit focus blur keydown keypress keyup change".split(" ").forEach(function (a) {
            fns[a] = function (b) {
                return F.on(a, b)
            }
        }), ["next", "previous"].forEach(function (a) {
            var b = a + "Sibling";
            fns[a] = function (a) {
                function c(a) {
                    for (var b = 0; f > b && e[b] !== a; b++);
                    b === f && (e[f++] = a)
                }

                if (0 === this.length)return this;
                var d, e = F.admin.roe(), f = 0;
                if (e.length = 0, "string" != typeof a || "" === a || /\s+/.test(a) || (a = strToFn(a)), void 0 === a || a === !0)d = F.isElement; else {
                    if ("function" != typeof a)return e;
                    d = function (b) {
                        return F.isElement(b) && a(b)
                    }
                }
                return this.each(function (e) {
                    for (e = e[b]; e && (!d(e) || (c(e), void 0 !== a));)e = e[b]
                }), e.length = f, e
            }
        }), fns.sibling = function (a) {
            for (var b = this.previous(a), c = this.next(a), d = b.length, e = 0, f = c.length; f > e; e++)b[d++] = c[e];
            return b.length = d, b
        }, fns.children = function (a) {
            if (0 === this.length)return this;
            var b, c, d, e;
            if ("function" == typeof a)b = function (b) {
                return F.isElement(b) && a(b)
            }; else {
                if (void 0 !== a) {
                    for (c = F.all(a, this[0]), d = 1, e = this.length; e > d; d++)c.add(F.all(a, this[d]));
                    return c
                }
                b = F.isElement
            }
            c = F.admin.roe();
            var f = 0;
            return this.each(function (a) {
                var g = a.childNodes;
                for (d = 0, e = g.length; e > d; d++)b(g[d]) && (c[f++] = g[d])
            }), c.length = f, c
        }, fns.clone = function (a) {
            if (0 === this.length)return this;
            var b, c = fish.browser(), d = document.createDocumentFragment().appendChild(document.createElement("div"));
            b = "ms" == c.name && c.version < 9 ? function (b) {
                d.innerHTML = b.outerHTML.replace(new RegExp("(^|\\s)" + eventHandlerContainer.hook + '="\\d+"'), "");
                var c = d.firstChild;
                return "function" == typeof a && a(c), d.removeChild(c), c
            } : function (b) {
                var c = b.cloneNode(!0);
                return "function" == typeof a && a(c), c
            }, roe = F.admin.roe();
            var e = 0;
            return this.each(function (a) {
                roe[e++] = b(a)
            }), roe.length = e, roe
        }, "Left Top".split(" ").forEach(function (a, b) {
            var c = b ? "scrollTop" : "scrollLeft";
            fns["scroll" + a] = function (a) {
                var d, e = a ? this.dom(a) : this[0];
                return e ? (elemN = e && "object" == typeof e && "setInterval"in e ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1, d = elemN ? "pageXOffset"in elemN ? elemN[b ? "pageYOffset" : "pageXOffset"] : browser.boxModel && elemN.document.documentElement[c] || elemN.document.body[c] : e[c]) : void 0
            }
        }), fish.extend(fns, !0);
        var rwebkit = /(webkit)[ \/]([\w.]+)/, ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/, rmsie = /(msie) ([\w.]+)/, rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/, userAgent = navigator.userAgent, ua = userAgent.toLowerCase(), match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
        match[1] = match[1].replace("msie", "ms").replace("mozilla", "moz").replace("opera", "o"), match[2] = parseFloat(match[2], 10);
        var browser = {name: match[1] || "", version: match[2] && parseFloat(match[2]) || 0, boxModel: !1};
        F.ready && F.ready(function () {
            var a = document.createElement("div");
            a.style.width = a.style.paddingLeft = "1px", document.body.appendChild(a), browser.boxModel = 2 === a.offsetWidth, a.parentNode.removeChild(a), a = null
        })
    }(), function () {
        "use strict";
        function resolveDefs(c, block, def) {
            return ("string" == typeof block ? block : block.toString()).replace(c.define || skip, function (a, b, c, d) {
                return 0 === b.indexOf("def.") && (b = b.substring(4)), b in def || (def[b] = ":" === c ? d : new Function("def", "return " + d)(def)), ""
            }).replace(c.use || skip, function (m, code) {
                if ("def.temp" === code)throw new Error("forbin def.temp in template");
                var v;
                return v = 0 === code.indexOf("def.") ? def[code.substring(4)] : eval(code), v ? resolveDefs(c, v, def) : v
            })
        }

        function saveToCache(a, b) {
            doT.cache[a] = b
        }

        function getFromCache(a) {
            return doT.cache[a]
        }

        function unescape(a) {
            return a.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ")
        }

        function templateFn(a, b) {
            var c = a.temp;
            return "string" == typeof a ? b ? doT.template(a)(b) : doT.template(a) : "object" == typeof a ? (fish.lang.extend(doT.templateSettings, a), b ? doT.template(c, a)(b) : doT.template(c, a)) : void 0
        }

        var doT = {
            version: "0.2.0",
            templateSettings: {
                evaluate: /\{\{([\s\S]+?)\}\}/g,
                interpolate: /\{\{=([\s\S]+?)\}\}/g,
                encode: /\{\{!([\s\S]+?)\}\}/g,
                use: /\{\{#([\s\S]+?)\}\}/g,
                define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
                conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
                iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
                varname: "it",
                strip: !0,
                append: !0,
                selfcontained: !1
            },
            cache: {},
            template: void 0
        }, startend = {
            append: {start: "'+(", end: ")+'", startencode: "'+fish.encodeHTML("},
            split: {start: "';out+=(", end: ");out+='", startencode: "';out+=fish.encodeHTML("}
        }, skip = /$^/;
        doT.template = function (a, b) {
            var c, d, e, f, g, h = doT.templateSettings, i = h.append ? startend.append : startend.split, j = 0;
            b ? (e = resolveDefs(h, a, b), (d = getFromCache(e)) || (c = e)) : (d = getFromCache(a)) || (c = a, e = resolveDefs(h, a, {})), d || (e = ("var out='" + (h.strip ? e.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : e).replace(/'|\\/g, "\\$&").replace(h.interpolate || skip, function (a, b) {
                return i.start + unescape(b) + i.end
            }).replace(h.encode || skip, function (a, b) {
                return f = !0, i.startencode + unescape(b) + i.end
            }).replace(h.conditional || skip, function (a, b, c) {
                return b ? c ? "';}else if(" + unescape(c) + "){out+='" : "';}else{out+='" : c ? "';if(" + unescape(c) + "){out+='" : "';}out+='"
            }).replace(h.iterate || skip, function (a, b, c, d) {
                return b ? (j += 1, g = d || "i" + j, b = unescape(b), "';var arr" + j + "=" + b + ";if(arr" + j + "){var " + c + "," + g + "=-1,l" + j + "=arr" + j + ".length-1;while(" + g + "<l" + j + "){" + c + "=arr" + j + "[" + g + "+=1];out+='") : "';} } out+='"
            }).replace(h.evaluate || skip, function (a, b) {
                return "';" + unescape(b) + "out+='"
            }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|}|^|{)out\+='';/g, "$1").replace(/\+''/g, "").replace(/(\s|;|}|^|{)out\+=''\+/g, "$1out+="));
            try {
                return d || (d = new Function(h.varname, e), saveToCache(c, d)), d
            } catch (k) {
                throw"undefined" != typeof console && console.log("Could not create a template function: " + e), k
            }
        }, fish.extend({
            template: templateFn, encodeHTML: function () {
                var a = {
                    "&": "&#38;",
                    "<": "&#60;",
                    ">": "&#62;",
                    '"': "&#34;",
                    "'": "&#39;",
                    "/": "&#47;"
                }, b = /&(?!#?\w+;)|<|>|"|'|\//g;
                return function (c) {
                    return c ? c.toString().replace(b, function (b) {
                        return a[b] || b
                    }) : c
                }
            }()
        }, !0)
    }()
}(document, window);