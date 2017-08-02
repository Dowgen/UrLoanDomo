<template>
  <section class="container">
    <div class="top">
      <img width="32" height="65" src="../static/register_pic5.png"/>
      <div class="information">
        <img width="70" height="70" src="../static/register_pic4.png">
        <div class="zhima">
          <img width="45" height="45" src="../static/register_pic6.png"/>
        </div>
        <div class="text">芝麻信用</div>
      </div>
    </div>
    <div class="grey"></div>
    <div class="content">
      <div class="item">
        <div class="name">姓名</div>
        <div class="text">{{userInfo.real_name}}</div>
      </div>
      <div class="item">
        <div class="name">身份证号</div>
        <div class="text">{{userInfo.id_card}}</div>
      </div>
      <div class="item">
        <div class="name">注册手机号</div>
        <div class="text">{{userInfo.phone_number}}</div>
      </div>
    </div>
    <div class="bottom" v-show="noVerify">
      <div class="prev" onclick="location.href='/infoFillIn'">上一步</div>
      <div class="next" @click="accredit">立即授权</div>
    </div>
    <div class="global-mask" v-show="accreditStatus" @click="hideAll" @touchmove.prevent>
      <div class="answer" @click.stop v-show="!payStatus">
        <div class="img-wrapper">
          <img width="43" height="43" src="../static/authority_done.png">
        </div>
        <div class="text">恭喜！你授权成功</div>
        <div class="pay" @click="goPay">
          <span class="text">去支付</span>
          <img width="10" height="10" src="../static/next_pay_icon.png"/>
          <div class="payBtn"></div>
        </div>
      </div>
      <div class="payBox" @click.stop v-show="payStatus">
        <div class="payTitle">支付方式</div>
        <div class="payType">
          <label for="one">{{payMethod}}</label>
          <input type="radio" id="one" value="One">
          <div class="payBtn"></div>
          <img src="../static/choice_payway.png">
        </div>
        <!-- <div class="payType">
          <label for="two">微信</label>
          <input type="radio" id="two" value="Two" v-model="picked">
          <div class="payBtn"></div>
          <img  v-if="picked=='Two'" src="../static/choice_payway.png">
        </div> -->
        <div class="confirm" @click="openPay">
          确认支付
        </div>

      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript">
  import toastr from 'toastr'
  import axios from 'axios'

  // 弹窗插件配置
  toastr.options = {
    closeButton: false,
    debug: false,
    progressBar: false,
    positionClass: "toast-top-full-width",
    onclick: null,
    showDuration: "200",
    hideDuration: "800",
    timeOut: "1500",
    extendedTimeOut: "800",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  };

  export default{
    head: {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.4.2/jquery.min.js' },
        { src: 'http://120.27.198.97:8081/flower/static/yloan/js/alipaywap.js' }
      ]
    },
    data () {
      return {
        noVerify: true,
        openId: null,
        accreditStatus: false,
        payStatus: false,
        payMethod: '',
        userInfo:{},
        startTime: 0,     /* 开始轮询交易结果的时间 */
        queryTimer: 0     /* 轮询计时器 */
      }
    },
    created (){
      var that = this;
      /* 判断是否微信内置浏览器,决定支付选项 */
      if (process.browser) {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            this.payMethod = '微信支付';
            /* 获取openid */
            if( this.GetQueryString('code') == null){
              /* 用户还未点击微信支付 */
            }else{
              /* 已点击，则调用后台接口以获得openid */
              axios.get('http://young.flowercredit.cn:8081/flower/w/weiXin/code'+ window.location.search)
              .then( rs => that.orderWxPay(rs.data.openid) )  /* 下单 */
              .catch( err => console.log(err));
            }
        } else {
            this.payMethod = '支付宝'
        }
      }
      /* 判断是否芝麻验证成功 */
      if( this.GetQueryString('params') == null){
        /* 还未芝麻认证，啥也不干 */
      }else{
        console.log(process)
        /* 已芝麻认证，把芝麻返回的数据发给我们自己的服务器 */
        axios.get('http://120.27.198.97:8081/flower/w/youngzhima/zhimaCredit?'
          /* 返回的数据需原封不动，因此用 encodeURIComponent 再编码 */
          + 'params=' + encodeURIComponent( this.GetQueryString('params') )
          + '&sign=' + encodeURIComponent( this.GetQueryString('sign') )
          + '&sessionid=' + localStorage.sessionid )
          .then(function (res) {
            if(res.data.code == '1'){
              that.accreditStatus = true;
              that.noVerify = false; /* 芝麻认证成功后，隐藏底部按键 */
            }else{
              toastr.warning('芝麻认证失败，请重新认证!');
            }
          })
          .catch(function (error) {
            console.warn(error);
          });
      }
    },
    beforeMount(){
      var that = this;
      axios.get('http://120.27.198.97:8081/flower/w/xhhApp/selectLoanUser?'+
        'sessionid=' + localStorage.sessionid)
        .then(function (response) {
            that.userInfo=JSON.parse(response.data.data);
            console.log(that.userInfo);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      /* 得到url参数 */
      GetQueryString (name){
        /* 判断一下是否在浏览器内，否则window是undefined的 */
        if (process.browser) {
          var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if(r!=null)return  unescape(r[2]); return null;
        }
      },
      /* 芝麻信用认证 */
      accredit () {
        var that = this;
        window.location.href=
          'http://120.27.198.97:8081/flower/w/youngzhima/zhimaAuth?real_name=' + that.userInfo.real_name +
          '&id_card=' + that.userInfo.id_card +
          '&sessionid='+ localStorage.sessionid;
      },
      hideAll(){
        this.accreditStatus = false;
        this.payStatus=false;
      },
      goPay (){
        this.payStatus=true
      },
      openPay(){
        /* 根据浏览器决定拉起微信支付还是支付宝 */
        if (process.browser) {
          var ua = navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i)=="micromessenger") {
              window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe2e1c2ecc1aaaca7&redirect_uri=http%3A%2F%2Fyoung.flowercredit.cn%2Fauthorization&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
          }else{
              this.openAliPay();
          }
        }
      },
      orderWxPay(openid){ /* 下单 */
        var that = this;
        var out_trade_no = Date.now() + Math.random().toString(36).substr(10);
        /* 下单 */
        axios.get('http://120.27.198.97:8081/flower/w/weiXin/order?out_trade_no=' + out_trade_no +
          '&total_fee=1&sub_openid=' + openid)
        .then( res => {
                /* 拉起微信支付 */
                if (typeof WeixinJSBridge == "undefined"){
                  if( document.addEventListener ){
                     document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady, false);
                  }else if (document.attachEvent){
                     document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady);
                     document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady);
                  }
                }else{
                  that.onBridgeReady(res.data);
                }
         })
        .catch( err => console.log(err));
      },
      onBridgeReady(rs){   /* 拉起微信支付 */
        var that = this;
        var js_prepay_info = rs.match(/js_prepay_info=(\S*),/)[1];
        var info = JSON.parse(js_prepay_info);
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": info.appId,        //公众号名称，由商户传入
            "timeStamp":info.timeStamp, //时间戳，自1970年以来的秒数
            "nonceStr": info.nonceStr,  //随机串
            "package": info.package,
            "signType": info.signType,  //微信签名方式：
            "paySign": info.paySign     //微信签名
          },
          function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
              /* 支付成功后 */
              that.makeVipNo();
              toastr.success('恭喜您支付成功!');
              setTimeout("window.location.href='./myAccount'",1000);
            }
          }
        );
      },
      openAliPay (){  /* 拉起阿里支付 */
        var that = this;
        var out_trade_no = Date.now() + Math.random().toString(36).substr(6);
        sessionStorage.out_trade_no = out_trade_no;
        axios.get('http://120.27.198.97:8081/flower/w/payMent/wapPost?'
          + 'device_info=ios'
          + '&version=2.0.0'
          + '&nonce_str=nonce_str'       /* 随机字符串 */
          + '&out_trade_no=' +  out_trade_no  /* 商户订单号 */
          + '&no_credit=no_credit'       /* 是否屏蔽信用卡 */
          + '&body=优贷管家vip年费'      /* 商品描述 */
          + '&store_appid=10086'         /* 门店APPID */
          + '&attach=附加信息'
          + '&total_fee=1'               /* 支付金额 */
        )
        .then( res => {
                alipay_wap(res.data.prepay_id, null);
                toastr.success('请稍后');
                that.hideAll();
                that.startTime = Date.now();
                that.queryTimer = setInterval(this.queryAlipay, 5000)
        })
        .catch( error => console.log(error) )
      },
      queryAlipay (){  /* 查询支付结果 */
        var that = this;
        var rs,trade_state,return_code,result_code;
        axios.get('http://120.27.198.97:8081/flower/w/payMent/queryResult?out_trade_no='
                  + sessionStorage.out_trade_no )
        .then( res =>
              {
                /* 这里遵循支付文档流程编写 */
                rs = res.data;
                trade_state = rs.match(/trade_state=(\S*),/)[1];
                /*return_code = rs.match(/return_code=(\S*),/)[1];
                result_code = rs.match(/result_code=(\S*),/)[1];

                if( return_code === 'SUCCESS'){     通信标识
                  if( result_code === 'SUCCESS'){     业务结果 */
                    if( trade_state === 'USERPAYING'){ /* 等待用户付款 */
                      if( ((Date.now() - that.startTime)/1000) >= 300){
                        /* 交易超时，撤销订单 */
                        that.revokeAlipay();
                        toastr.warning('交易超时！请重新支付');
                        this.accreditStatus = true;
                        that.payStatus = true;
                        clearInterval( that.queryTimer );
                      }
                    }else if( trade_state === 'SUCCESS'){
                      toastr.success('支付成功');
                      that.makeVipNo();
                      setTimeout("window.location.href='./myAccount'",1000);
                    }else if( trade_state === 'CLOSED'){
                      toastr.warning('交易已关闭，请重新支付');
                    }else if( trade_state === 'REVERSE'){
                      toastr.warning('订单已撤销，请重新支付');
                    }
                  /*}else{
                    toastr.warning('发起支付失败，请重试!');
                  }
                }else{
                  toastr.warning('通信失败，请重试!');
                }*/
              })
        .catch( err => console.warn('query:'+ err))
      },
      revokeAlipay (){  /* 撤销订单 */
        var that = this;
        axios.get('http://120.27.198.97:8081/flower/w/payMent/cancelOrder?out_trade_no='
                  + sessionStorage.out_trade_no )
        .then( res => {
                /* 这里遵循支付文档流程编写 */
                var rs = res.data;
                var return_code = rs.match(/return_code=(\S*),/)[1];
                var result_code = rs.match(/result_code=(\S*),/)[1];
                if( return_code === 'SUCCESS'){  /* 通信标识 */
                  if( result_code === 'SUCCESS'){  /* 业务结果 */
                    console.log('订单撤销成功!');
                  }else if( result_code === 'FAIL'){
                    /* recall */
                  }
                }else{
                  toastr.warning('通信失败，请重试!');
                }
        })
        .catch( err => console.warn('revoke:'+ err))
      },
      makeVipNo (){     /* 生成会员籍号 */
        axios.get('http://120.27.198.97:8081/flower/w/youLoan/insertRandomn?phoneNum=' + localStorage.phoneNumber)
        .then( res => toastr.success('makeVipNo:' + res))
        .catch( err => toastr.warning('makeVipNo:' + err))
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @keyframes fade
    from{opacity: 0;}
    to{opacity: 1}
  .container
    position relative
    width 100%
    height 100vh
    .top
      height 185px
      background url("../static/register_bg.png")
      background-size contain
      position relative
      >img
        position absolute
        right 0
        top 36px
      .information
        position relative
        width 300px
        height 100%
        text-align center
        margin 0 auto
        padding-top 32px
        box-sizing border-box
        .text
          margin-top 18px
          font-size 18px
          color #828389
        .zhima
          position absolute
          left 0
          top 48px
    .grey
      width 100%
      height 10px
      background-color #ECEDEE
    .content
      width 100%
      padding 0 14px
      .item
        display flex
        justify-content space-between
        height 48px
        line-height 48px
        font-size 14px
        color #212121
        border-bottom solid 1px #ECEDEE
        .text
          outline none
          border none
          text-align end
          color #828389
    .bottom
      position fixed
      bottom 0
      left 0
      width 100%
      height 60px
      padding 10px
      box-sizing border-box
      display flex
      justify-content space-between
      align-items center
      background-color #f7f7f7
      .next
        flex 1
        height 40px
        line-height 40px
        background #BDAA73
        color #ffffff
        font-size 13px
        border-radius 5px
        text-align center
        margin-left 10px
      .prev
        flex 1
        height 40px
        line-height 40px
        background #ffffff
        color #BDAA73
        border solid 1px #BDAA73
        font-size 13px
        border-radius 5px
        text-align center
        margin-right 10px
    .global-mask
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      display flex
      justify-content center
      align-items center
      background: rgba(0, 0, 0, 0.8);
      animation: fade 0.2s linear;
      .answer
        width 301px
        height 240px
        text-align center
        border 2px solid #bdaa73
        .img-wrapper
          padding-top 52px
          margin-bottom 19px
        .text
          font-size 18px
          color #ffffff
          margin-bottom 36px
        .pay
          display flex
          margin 0 auto
          justify-content center
          align-items center
          width 112px
          height 31px
          border 1px solid #BDAA73
          .text
            margin-bottom 2px
            margin-right 12px
            font-size 16px
            color #BDAA73
      .payBox
        width 301px
        height 180px
        border 2px solid #bdaa73
        .payTitle
          height 46px
          line-height 46px
          font-size 16px
          color #FFFFFF
          padding-left 21px
          border-bottom solid 1px #313131
        .payType
          display flex
          position relative
          justify-content space-between
          align-items center
          padding 0 20px
          font-size 16px
          color #ffffff
          height 54px
          input
            width 20px
            height 20px
            z-index 10
            opacity 0
          .payBtn
            z-index 5
            position absolute
            right 20px
            top 17px
            width 20px
            height 20px
            border 2px solid #bdaa73
            border-radius 50%
          img
            z-index 5
            position absolute
            right 20px
            top 17px
            width 20px
            height 20px

        .confirm
          width 112px
          height 31px
          line-height 31px
          font-size 16px
          color #BDAA73
          border 1px solid #BDAA73
          margin 18px auto
          text-align center
</style>
