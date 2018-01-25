# 小微企业查询系统
> 破解geetest offline的尝试

## 简介
最近因为有需要对爬取的非上市公司进行一个验证，而绝大多数的非上市公司又都是小微企业，比起爬企业征信系统来说，还是小微企业名录更方便一点

## 特点
基于node.js axios全程破解 无需下载图片 无需模拟轨迹，offline模式就是任性

### 觉得不错帮忙Star一下啦～

#### 破解流程
首先我们跟着正常获取数据的流程走一遍
1. 打开[小微企业名录](http://xwqy.gsxt.gov.cn/)并且打开控制台

可以看到大概有这几个请求
```
http://xwqy.gsxt.gov.cn/security/verify_ip
http://xwqy.gsxt.gov.cn/security/verify_keyword
http://xwqy.gsxt.gov.cn/pc-geetest/register?t=1516872325770

```

查看一下response(当然你熟悉geetest也行)就会发现register就是geetest的初始化请求啦  

**返回值如下**
```
challenge:"a1d0c6e83f027327d8461063f4ac58a61c"
gt:"6146190e4171da316dbb5bcc076e2607"
success:0
```

其中你可以发现success基本都是0 也就是说离线模式

#### 什么是离线模式？
基本就是geetest不参与判断的一个状态，验证部分都在前台和中间服务器完成

回去看之前系统下载的js 会发现两个geetest提供的js  

* geetest.0.0.0.js
* offline.6.0.0.js

这几个源文件也提供在项目中了

2. 滑块拼合

发送了一个新的验证请求
```
http://xwqy.gsxt.gov.cn/pc-geetest/validate

request如下：  

geetest_challenge:a1d0c6e83f027327d8461063f4ac58a61c
geetest_validate:010886ec_0084e_10100077776e
geetest_seccode:010886ec_0084e_10100077776e|jordan

```

##### challenge在第一步我们已经获取了，问题是validate怎么获取? 同时seccode就是validate加了一个|jordan而已

既然是offline 那就分析offline.js呗

查看代码就能看到这句
```
return c >= f - 3 && c <= f + 3 ? {
            success: !0,
            message: "success",
            validate: b.A(c, e.d.challenge) + "_" + b.A(a.b("rand0", e.c), e.d.challenge) + "_" + b.A(a.b("rand1", e.c), e.d.challenge),
            score: Math.round(d / 200)
        } : {success: 0, message: "fail"}

```

这不就是我们要的么！
```
validate: b.A(c, e.d.challenge) + "_" + b.A(a.b("rand0", e.c), e.d.challenge) + "_" + b.A(a.b("rand1", e.c), e.d.challenge),
```

offline.6.0.0.js和offline.5.0.0.js可以看出一样是通过密钥 rand rand1进行加密获取一个值，一半来说这种方案就是得依靠收集案例倒推，但是我们是不会重复造轮子的

github关键词一搜就能发现已经有人整理好了['https://github.com/9468305/python-script/blob/master/geetest_offline/util.py']('https://github.com/9468305/python-script/blob/master/geetest_offline/util.py')

所以那就用呗

后续就只是涉及到爬虫以及页面跳转的问题了，具体可以看util内的代码

而且在micro_lib内也可以直接搜索 发送验证的地址改为http://xwqy.gsxt.gov.cn/mirco/micro_lib

并相应修改传入的值即可
```
organId:100000
textfield:encode后的关键词
fwId:1400
searchOrganId:
channelId:99
captcha:
geetest_challenge:3ef815416f775098fe977004015c619332
geetest_validate:010886ec_0084e_10100077776e
geetest_seccode:010886ec_0084e_10100077776e|jordan
```


### restful-api
#### 已经做了一个api形式的 直接在url内打入关键词即可爬取
#### 运行步骤
```
npm install
npm run start
curl http://127.0.0.1:4001/公司关键词
```