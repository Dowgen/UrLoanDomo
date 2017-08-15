var wxData = '';
$.ajax({ 
    type: "Get",
    url: "${pageContext.request.contextPath}/w/cashUser/wxSig",
    data:{
        url: location.href.split('#')[0]
    },
    success: function(data){
        wxData = data;
    },
    error: function(data){
        layer.msg("网络错误!",{time:1500});
    }
});
//微信认证
wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: wxData.appid, // 必填，公众号的唯一标识
    timestamp: wxData.timestamp, // 必填，生成签名的时间戳
    nonceStr:  wxData.noncestr, // 必填，生成签名的随机串
    signature: wxData.signature,   // 必填，签名，见附录1
    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

//微信分享设置
wx.ready(function(){

    wx.onMenuShareTimeline({
        title: '信花花', // 分享标题
        link: '', // 分享链接
        imgUrl: 'http://flowercredit.cn/static/flower/img/xhh300.png', // 分享图标
        success: function () { 
            console.log(imgUrl);
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
    
    wx.onMenuShareAppMessage({
        title: '信花花', // 分享标题
        desc: '信花花，任性花！', // 分享描述
        link: '', // 分享链接
        imgUrl: 'http://flowercredit.cn/static/flower/img/xhh300.png', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
            // 用户确认分享后执行的回调函数
            console.log(imgUrl);
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
});
wx.error(function(res){
    console.log("error:"+res);
});