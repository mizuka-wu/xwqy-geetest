const axios = require('axios')
const cheerio = require('cheerio')

'https://github.com/9468305/python-script/blob/master/geetest_offline/util.py'

const OFFLINE_SAMPLE = [
    [186, 1, 98],
    [82, 0, 136],
    [61, 5, 108],
    [128, 2, 7],
    [130, 4, 99],
    [189, 3, 65],
    [108, 5, 285],
    [136, 0, 36],
    [41, 0, 263],
    [124, 3, 185]
]

// 换取challenge gt
function getToken() {
    return axios('http://xwqy.gsxt.gov.cn/pc-geetest/register')
        .then(response => {
            return response.data
        })
}


// 获取企业数据
function getData(pripid = 'nOGEyqt537WHxuhPw2DcGLu8WNd6EXRbJrPggyksWgfZEmwMOisM8h.QS8mPyE5OqCDOsoLSeozjmi.fl5PM3V.9oGG.Qis4') {
    return axios(
        {
            method: 'POST',
            url: 'http://xwqy.gsxt.gov.cn/mirco/micro_detail',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: 'organId=100000&channelId=99&pripid=' + pripid
        }
    )
}

// 计算加密
function userresponse(a, b) {
    for (var c = b.slice(32), d = [], e = 0; e < c.length; e++) {
        var f = c.charCodeAt(e);
        d[e] = f > 57 ? f - 87 : f - 48
    }
    c = 36 * d[0] + d[1];
    var g = Math.round(a) + c;
    b = b.slice(0, 32);
    var h, i = [[], [], [], [], []], j = {}, k = 0;
    e = 0;
    for (var l = b.length; e < l; e++)
        h = b.charAt(e), j[h] || (j[h] = 1, i[k].push(h), k++, k = 5 == k ? 0 : k);
    for (var m, n = g, o = 4, p = "", q = [1, 2, 5, 10, 50]; n > 0;)
        n - q[o] >= 0 ? (m = parseInt(Math.random() * i[o].length, 10), p += i[o][m], n -= q[o]) : (i.splice(o, 1), q.splice(o, 1), o -= 1);
    return p
}

function getValidate(challenge) {

    var _r = (Math.random() * (OFFLINE_SAMPLE.length - 1)).toFixed(0)

    var [distance, rand0, rand1] = OFFLINE_SAMPLE[_r]
    var distance_r = userresponse(distance, challenge)
    var rand0_r = userresponse(rand0, challenge)
    var rand1_r = userresponse(rand1, challenge)
    var validate = distance_r + '_' + rand0_r + '_' + rand1_r
    return validate
}

function getPripid({challenge, validate}, keyword = '上海聚豫德信息科技') {
    return axios(
        {
            method: 'POST',
            url: 'http://xwqy.gsxt.gov.cn/mirco/micro_lib',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: `organId=100000&textfield=${encodeURIComponent(keyword)}&fwId=1400&searchOrganId=&channelId=99&captcha=&geetest_challenge=${challenge}&geetest_validate=${validate}&geetest_seccode=${validate}%7Cjordan`
        }
    )
        .then(response => {
            var html = response.data.toString()
            return html.match(/var objTbody.*;/)
        })
        .then(result => result[0])
        .then(result => result.replace('var objTbody = ', ''))
        .then(result => result.replace(';', ''))
        .then(result => JSON.parse(result)[0].entid)
}

module.exports = function (keyword) {
    return getToken()
        .then(geetest => {
            const challenge = geetest.challenge
            const validate = getValidate(challenge)
            return {
                challenge,
                validate
            }
        })
        .then(result => getPripid(result, keyword))
        .then(pripid => getData(pripid))
        .then(result => cheerio.load(result.data))
        .then($ => {
            var tds = []
            $('tr td').each(function (i, e) {
                tds.push($(e).text().replace(/\n|\t|\s/g, ''))
            })
            return tds
        })
        .catch(e => e)
}

