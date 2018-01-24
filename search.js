function clos(){
    $("#light").css("display","none");
    $("#fade").css("display","none");
    $("body, html").removeClass("no_scroll");
}
function searchList(organId) {
    var searchtitle = $("#searchtitle").val();
    var fwId = $("#fwselect").val();
    if(searchtitle == '' || searchtitle == "请输入企业名称或统一社会信用代码或注册号" || searchtitle == "请输入关键字"){
        if(fwId == '1400' || fwId == '1500'){
            alert("请输入企业名称或统一社会信用代码或注册号");
        }else{
            alert("请输入关键字");
        }
        return;
    }
    searchPubList(organId);
}
function searchPubList(organId) {
    var searchtitle = $("#searchtitle").val();
    //检查当前IP是否处于黑名单
    $.ajax({
        type:'post',
        url:'security/verify_ip',
        data:null,
        success:function(data){
            if(data == '1') {
                $.ajax({
                    type:'post',
                    url:'security/verify_keyword',
                    data: {
                        "keyword": searchtitle
                    },
                    success:function(data){
                        if(data == '1'){
                            /**
                             $("#light").css("display","block");
                             $("#fade").css("display","block");
                             $("body, html").addClass("no_scroll");
                             */
                            popupCaptcha_JY();
                        }else{
                            alert("请输入更为详细的查询条件！");
                        }
                    }
                });

            }else{
                alert("当前IP段不能进行查询操作！");
            }
        }
    });
}

//搜索提交
function doSearch(organId) {
    if(organId == ''){
        organId = "100000";
    }
    // 录入的验证码
    var captcha = $("#cpt-input").val();
    // 验证验证码是否正确
    cpt.verify(captcha, function() {
        // 从父页面获取查询参数
        var keyword = $("#searchtitle");
        var fwId = $("#fwselect").val();
        // 处理关键词
        if( fwId != '1500' && keyword.val() == "请输入企业名称或统一社会信用代码或注册号") {
            keyword.val("");
        }
        var searchtitle = keyword.val();
        // 设置验证码
        $("#captcha").val(captcha);


        var searchOrgan = "";

        var chal = "";
        var action = "";
        var target = "_self";
        if(fwId == '1400'){
            action = "mirco/micro_lib";
            chal = "99";
            searchOrgan = $("#searchOrganId").val();
        }else if(fwId == '1500'){
            action = "mirco/annou_info";
            chal = "80";
            searchOrgan = $("#searchOrganId").val();
        }else{
            action = "mirco/search_list";
        }

        var form = $(document.createElement("form")).attr("method", "POST").attr("target", target).attr("action", action);
        $(document.createElement("input")).attr("type", "hidden").attr("name", "organId").val(organId).appendTo(form);
        $(document.createElement("input")).attr("type", "hidden").attr("name", "textfield").val(encodeURI(searchtitle)).appendTo(form);
        $(document.createElement("input")).attr("type", "hidden").attr("name", "fwId").val(fwId).appendTo(form);
        $(document.createElement("input")).attr("type", "hidden").attr("name", "searchOrganId").val(searchOrgan).appendTo(form);
        $(document.createElement("input")).attr("type", "hidden").attr("name", "channelId").val(chal).appendTo(form);
        $(document.createElement("input")).attr("type", "hidden").attr("name", "captcha").val(captcha).appendTo(form);
        form.appendTo("body").submit();
    }, loadCaptcha);
}


//搜索提交
function searchsubmit(callback) {
    if (callback != null) {
        callback();
        return false;
    }

    var organId = $("#organId").val();
    if(organId == ''){
        organId = "100000";
    }
    var keyword = $("#searchtitle");
    var fwId = $("#fwselect").val();
    // 处理关键词
    if( fwId != '1500' && keyword.val() == "请输入企业名称或统一社会信用代码或注册号") {
        keyword.val("");
    }
    var searchtitle = keyword.val();
    // 设置验证码
    var captcha = $("#captcha").val();

    var searchOrgan = "";
    var chal = "";
    var action = "";
    var target = "_self";
    if(fwId == '1400'){
        action = "mirco/micro_lib";
        chal = "99";
        searchOrgan = $("#searchOrganId").val();
    }else if(fwId == '1500'){
        action = "mirco/annou_info";
        chal = "80";
        searchOrgan = $("#searchOrganId").val();
    }else{
        action = "mirco/search_list";
    }
    var geetest_challenge = $("#geetest_challenge").val();
    var geetest_validate = $("#geetest_validate").val();
    var geetest_seccode= $("#geetest_seccode").val();
    var form = $(document.createElement("form")).attr("method", "POST").attr("target", target).attr("action", action);
    $(document.createElement("input")).attr("type", "hidden").attr("name", "organId").val(organId).appendTo(form);
    $(document.createElement("input")).attr("type", "hidden").attr("name", "textfield").val(encodeURI(searchtitle)).appendTo(form);
    $(document.createElement("input")).attr("type", "hidden").attr("name", "fwId").val(fwId).appendTo(form);
    $(document.createElement("input")).attr("type", "hidden").attr("name", "searchOrganId").val(searchOrgan).appendTo(form);
    $(document.createElement("input")).attr("type", "hidden").attr("name", "channelId").val(chal).appendTo(form);
    $(document.createElement("input")).attr("type", "hidden").attr("name", "captcha").val(captcha).appendTo(form);
    $(document.createElement("input")).attr("type", "hidden").attr("name", "geetest_challenge").val(geetest_challenge).appendTo(form);
    $(document.createElement("input")).attr("type", "hidden").attr("name", "geetest_validate").val(geetest_validate).appendTo(form);
    $(document.createElement("input")).attr("type", "hidden").attr("name", "geetest_seccode").val(geetest_seccode).appendTo(form);
    form.appendTo("body").submit();
}
//加载验证码
function loadCaptcha() {
    // 验证码
    cpt.reload("#cpt-input", "#cpt-img", "");
}

$(function() {
    // 初始化验证码
    //loadCaptcha();
});

/**
 * 验证码相关函数集
 */
var cpt = cpt || {};

/**
 * 刷新验证码
 *
 * @param input 验证码输入框元素表达式
 * @param img 验证码图片元素表达式
 * @param preset 验证码预设配置
 */
cpt.reload = function(input, img, preset) {
    // 默认验证码类型
    preset = preset || "";

    // 清空验证码输入框内容
    $(input).val("");

    // 刷新验证码图片
    $(img).attr("src", $("base").attr("href") + "captcha?preset=" + preset + "&ra=" + Math.random());
};

/**
 * 校验验证码
 *
 * @param captcha 页面录入的验证码
 * @param scb 校验通过后的回调函数
 * @param ecb 校验未通过时的回调函数
 */
cpt.verify = function(captcha, scb, ecb) {
    $.ajax({
        type:'post',
        url:'security/verify_captcha',
        data: {
            "captcha": captcha
        },
        success:function(data){
            if(data == '1') {
                // 校验通过回调函数
                if(typeof scb == "function") {
                    scb();
                }
            } else {
                alert("验证码有误，请核对后重新输入！");
                // 校验未通过回调函数
                if(typeof ecb == "function") {
                    ecb();
                }
            }
        }
    });
};

function SearchHighlight(idVal,keyword){
    var pucl = document.getElementById(idVal);
    if("" == keyword) return;
    var temp=pucl.innerHTML;
    var htmlReg = new RegExp("\<.*?\>","i");
    var arrA = new Array();
//替换HTML标签
    for(var i=0;true;i++)
    {
        var m=htmlReg.exec(temp);
        if(m)
        {
            arrA[i]=m;
        }
        else
        {
            break;
        }
        temp=temp.replace(m,"{[("+i+")]}");
    }
    words = unescape(keyword.replace(/\+/g,' ')).split(/\s+/);
//替换关键字
    for (w=0;w<words.length;w++)
    {
        var r = new RegExp("("+words[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&")+")","ig");
        temp = temp.replace(r,"<font color=Red>$1</font>");
    }
//恢复HTML标签
    for(var i=0;i<arrA.length;i++)
    {
        temp=temp.replace("{[("+i+")]}",arrA[i]);
    }
    pucl.innerHTML=temp;
}


/**
 * 实时请请求  验证码图片
 * type 请求的类型
 * @param captchaObj
 */
function popupCaptcha_JY(buttonId, callback){
    // 验证开始需要向网站主后台获取id，challenge，success（是否启用failback）
    $.ajax({
        url: "pc-geetest/register?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
            // 使用initGeetest接口
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                product: "popup", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
            }, handlerPopup);
        }
    });


    var handlerPopup = function (captchaObj) {
        //对于product为popup形式时，使用bindOn绑定触发验证码弹出的按钮，点击按钮弹出验证码。接受参数类型与appendTo的position参数一致
        /*captchaObj.bindOn("#"+buttonId);*/
        // 将验证码加到id为captcha的元素里
        captchaObj.appendTo("#popup-captcha");
        // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
        //  当验证码DOM元素生成完毕时执行callback函数
        captchaObj.onReady(function(){
            captchaObj.show();
        });
        if(captchaObj){
            captchaObj.show();
        }
        //当验证出现网络错误时调用callback函数。
        //captchaObj.onError(function(){
        //	window.top.dialogMessage("网络错误，请检查您当前网络！");
        //	return false;
        //    }
        // );
        // 成功的回调
        captchaObj.onSuccess(function () {
            var validate = captchaObj.getValidate();
            $.ajax({
                url: "pc-geetest/validate", // 进行二次验证
                type: "post",
                dataType: "json",
                data: {
                    geetest_challenge: validate.geetest_challenge,
                    geetest_validate: validate.geetest_validate,
                    geetest_seccode: validate.geetest_seccode
                },
                success: function (data) {
                    if (data && (data.status === "success")) {
                        $("#geetest_challenge").val(validate.geetest_challenge);
                        $("#geetest_validate").val(validate.geetest_validate);
                        $("#geetest_seccode").val(validate.geetest_seccode);
                        searchsubmit(callback);
                    } else {
                        alert("验证码校验失败！");
                    }
                }
            });
        });

    };
}

