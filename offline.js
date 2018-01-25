Geetest.define("Offline", ["Data", "Slide"], function (a, b) {
    var c = {};
    return c.getX = function (a) {
        if (5 == a.length) {
            var b = parseInt(a, 16) || 0, c = b % 200;
            return c < 40 && (c = 40), c
        }
    }, c.getY = function (a) {
        if (4 == a.length) {
            return (parseInt(a, 16) || 0) % 70
        }
    }, c.md5 = function (a) {
        function b(a, b) {
            return a << b | a >>> 32 - b
        }

        function c(a, b) {
            var c, d, e, f, g;
            return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f
        }

        function d(a, b, c) {
            return a & b | ~a & c
        }

        function e(a, b, c) {
            return a & c | b & ~c
        }

        function f(a, b, c) {
            return a ^ b ^ c
        }

        function g(a, b, c) {
            return b ^ (a | ~c)
        }

        function h(a, e, f, g, h, i, j) {
            return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e)
        }

        function i(a, d, f, g, h, i, j) {
            return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d)
        }

        function j(a, d, e, g, h, i, j) {
            return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d)
        }

        function k(a, d, e, f, h, i, j) {
            return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d)
        }

        function l(a) {
            var b, c, d = "", e = "";
            for (c = 0; c <= 3; c++) b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2);
            return d
        }

        var m, n, o, p, q, r, s, t, u, v = [];
        for (a = function (a) {
            a = a.replace(/\r\n/g, "\n");
            for (var b = "", c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                d < 128 ? b += String.fromCharCode(d) : d > 127 && d < 2048 ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
            }
            return b
        }(a), v = function (a) {
            for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = Array(f - 1), h = 0, i = 0; i < c;) b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++;
            return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g
        }(a), r = 1732584193, s = 4023233417, t = 2562383102, u = 271733878, m = 0; m < v.length; m += 16) n = r, o = s, p = t, q = u, r = h(r, s, t, u, v[m + 0], 7, 3614090360), u = h(u, r, s, t, v[m + 1], 12, 3905402710), t = h(t, u, r, s, v[m + 2], 17, 606105819), s = h(s, t, u, r, v[m + 3], 22, 3250441966), r = h(r, s, t, u, v[m + 4], 7, 4118548399), u = h(u, r, s, t, v[m + 5], 12, 1200080426), t = h(t, u, r, s, v[m + 6], 17, 2821735955), s = h(s, t, u, r, v[m + 7], 22, 4249261313), r = h(r, s, t, u, v[m + 8], 7, 1770035416), u = h(u, r, s, t, v[m + 9], 12, 2336552879), t = h(t, u, r, s, v[m + 10], 17, 4294925233), s = h(s, t, u, r, v[m + 11], 22, 2304563134), r = h(r, s, t, u, v[m + 12], 7, 1804603682), u = h(u, r, s, t, v[m + 13], 12, 4254626195), t = h(t, u, r, s, v[m + 14], 17, 2792965006), s = h(s, t, u, r, v[m + 15], 22, 1236535329), r = i(r, s, t, u, v[m + 1], 5, 4129170786), u = i(u, r, s, t, v[m + 6], 9, 3225465664), t = i(t, u, r, s, v[m + 11], 14, 643717713), s = i(s, t, u, r, v[m + 0], 20, 3921069994), r = i(r, s, t, u, v[m + 5], 5, 3593408605), u = i(u, r, s, t, v[m + 10], 9, 38016083), t = i(t, u, r, s, v[m + 15], 14, 3634488961), s = i(s, t, u, r, v[m + 4], 20, 3889429448), r = i(r, s, t, u, v[m + 9], 5, 568446438), u = i(u, r, s, t, v[m + 14], 9, 3275163606), t = i(t, u, r, s, v[m + 3], 14, 4107603335), s = i(s, t, u, r, v[m + 8], 20, 1163531501), r = i(r, s, t, u, v[m + 13], 5, 2850285829), u = i(u, r, s, t, v[m + 2], 9, 4243563512), t = i(t, u, r, s, v[m + 7], 14, 1735328473), s = i(s, t, u, r, v[m + 12], 20, 2368359562), r = j(r, s, t, u, v[m + 5], 4, 4294588738), u = j(u, r, s, t, v[m + 8], 11, 2272392833), t = j(t, u, r, s, v[m + 11], 16, 1839030562), s = j(s, t, u, r, v[m + 14], 23, 4259657740), r = j(r, s, t, u, v[m + 1], 4, 2763975236), u = j(u, r, s, t, v[m + 4], 11, 1272893353), t = j(t, u, r, s, v[m + 7], 16, 4139469664), s = j(s, t, u, r, v[m + 10], 23, 3200236656), r = j(r, s, t, u, v[m + 13], 4, 681279174), u = j(u, r, s, t, v[m + 0], 11, 3936430074), t = j(t, u, r, s, v[m + 3], 16, 3572445317), s = j(s, t, u, r, v[m + 6], 23, 76029189), r = j(r, s, t, u, v[m + 9], 4, 3654602809), u = j(u, r, s, t, v[m + 12], 11, 3873151461), t = j(t, u, r, s, v[m + 15], 16, 530742520), s = j(s, t, u, r, v[m + 2], 23, 3299628645), r = k(r, s, t, u, v[m + 0], 6, 4096336452), u = k(u, r, s, t, v[m + 7], 10, 1126891415), t = k(t, u, r, s, v[m + 14], 15, 2878612391), s = k(s, t, u, r, v[m + 5], 21, 4237533241), r = k(r, s, t, u, v[m + 12], 6, 1700485571), u = k(u, r, s, t, v[m + 3], 10, 2399980690), t = k(t, u, r, s, v[m + 10], 15, 4293915773), s = k(s, t, u, r, v[m + 1], 21, 2240044497), r = k(r, s, t, u, v[m + 8], 6, 1873313359), u = k(u, r, s, t, v[m + 15], 10, 4264355552), t = k(t, u, r, s, v[m + 6], 15, 2734768916), s = k(s, t, u, r, v[m + 13], 21, 1309151649), r = k(r, s, t, u, v[m + 4], 6, 4149444226), u = k(u, r, s, t, v[m + 11], 10, 3174756917), t = k(t, u, r, s, v[m + 2], 15, 718787259), s = k(s, t, u, r, v[m + 9], 21, 3951481745), r = c(r, n), s = c(s, o), t = c(t, p), u = c(u, q);
        return (l(r) + l(s) + l(t) + l(u)).toLowerCase()
    }, c.o = function (b) {
        var d = parseInt(6 * Math.random()), e = parseInt(300 * Math.random());
        a.g("rand0", d, b.c), a.g("rand1", e, b.c);
        for (var f = c.md5(d + "").slice(0, 9), g = c.md5(e + "").slice(10, 19), h = "", i = 0; i < 9; i++) h += i % 2 == 0 ? f.charAt(i) : g.charAt(i);
        var j = h.slice(0, 4), k = h.slice(4), l = c.getX(k), m = c.getY(j);
        return a.g("x_pos", l, b.c), {
            bg: "pictures/gt/" + f + "/bg/" + g + ".jpg",
            fullbg: "pictures/gt/" + f + "/" + f + ".jpg",
            slice: "pictures/gt/" + f + "/slice/" + g + ".png",
            type: "slide",
            ypos: m
        }
    }, c.ajax = function (c, d, e) {
        var f = a.b("x_pos", e.c);
        return c >= f - 3 && c <= f + 3 ? {
            success: !0,
            message: "success",
            validate: b.A(c, e.d.challenge) + "_" + b.A(a.b("rand0", e.c), e.d.challenge) + "_" + b.A(a.b("rand1", e.c), e.d.challenge),
            score: Math.round(d / 200)
        } : {success: 0, message: "fail"}
    }, c
});
