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
    <div class="bottom">
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
          <label for="one">支付宝</label>
          <input type="radio" id="one" value="One" v-model="picked">
          <div class="payBtn"></div>
          <img v-if="picked=='One'" src="../static/choice_payway.png">
        </div>
        <div class="payType">
          <label for="two">微信</label>
          <input type="radio" id="two" value="Two" v-model="picked">
          <div class="payBtn"></div>
          <img  v-if="picked=='Two'" src="../static/choice_payway.png">
        </div>
        <div class="confirm" @click="openAliPay">
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
        accreditStatus: false,
        payStatus: false,
        picked: '',
        userInfo:{}
      }
    },
    created (){
      /* 判断是否芝麻验证成功 */
      if( this.GetQueryString('params') == null){
        /* 还未芝麻认证，啥也不干 */
      }else{
        console.log(process)
        var that = this;
        /* 已芝麻认证，把芝麻返回的数据发给我们自己的服务器 */
        axios.get('http://120.27.198.97:8081/flower/w/youngzhima/zhimaCredit?' 
          /* 返回的数据需原封不动，因此用 encodeURIComponent 再编码 */
          + 'params=' + encodeURIComponent( this.GetQueryString('params') )
          + '&sign=' + encodeURIComponent( this.GetQueryString('sign') )
          + '&sessionid=' + localStorage.sessionid )
          .then(function (res) {
            if(res.data.code == '1'){
              that.accreditStatus = true;
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
      openAliPay (){
        axios.get('http://120.27.198.97:8081/flower/w/payMent/wapPost?'
          + 'device_info=ios'
          + '&version=2.0.0'
          + '&nonce_str=nonce_str'       /* 随机字符串 */
          + '&out_trade_no=' + Date.now()  /* 商户订单号 */
          + '&no_credit=no_credit'       /* 是否屏蔽信用卡 */
          + '&body=优贷管家vip年费'      /* 商品描述 */
          + '&store_appid=10086'         /* 门店APPID */
          + '&attach=附加信息' 
          + '&total_fee=1'               /* 支付金额 */
        )
        .then( res => alipay_wap(res.data.prepay_id,'/myAccount') )
        .catch( error => console.log(error) )
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import url('~dropzone/dist/dropzone.css');
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
      position absolute
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
        height 240px
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
          margin 20px auto
          text-align center
</style>
