<template>
  <div id="bottom">
    <div id="owl" class="owl-carousel owl-theme">
      <div class="item">
        <img src="1.1.jpg">
      </div>
      <div class="item">
        <img src="2.2.jpg">
      </div>
      <div class="item">
        <img src="3.3.jpg">
      </div>
    </div>
<!--     <div v-swiper:mySwiper="swiperOption">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img style="width:100%;height:100%" src="../static/1.1.jpg">
    </div>
    <div class="swiper-slide">
      <img style="width:100%;height:100%" src="../static/2.2.jpg">
    </div>
    <div class="swiper-slide">
      <img style="width:100%;height:100%" src="../static/3.3.jpg">
    </div>
  </div>
  <div class="swiper-pagination swiper-pagination-bullets"></div>
</div> -->

    <div class="bottom-btn">
      <div class="apply" @click="jump">在线申请</div>
      <div class="register" @click="jump">立即登录</div>
    </div>
  </div>
</template>
<script type="text/ecmascript">
  import axios from 'axios'
  export default {
    head:{
      link: [
        {rel: 'stylesheet', href: 'http://flowercredit.cn/flower/static/flower/css/owl/owl.carousel.min.css'},
        {rel: 'stylesheet', href: 'http://flowercredit.cn/flower/static/flower/css/owl/owl.theme.default.min.css'},
      ],
      script: [
        { src: 'http://flowercredit.cn/static/flower/js/jQuery.min.js' },
        { src: 'http://flowercredit.cn/flower/static/flower/css/owl/owl.carousel.min.js' }
      ]
    },
    data () {
      return {
        swiperOption: {
          autoplay: 5000,
          initialSlide: 0,
          loop: true,
          pagination: '.swiper-pagination',
          paginationBulletRender: function (swiper, index, className) {
            return '<span style="background:#fff" class="' + className + '"></span>';
          },
          onSlideChangeEnd: swiper => {
            console.log('onSlideChangeEnd', swiper.realIndex)
          }
        }
      }
    },
    mounted (){
      //轮播图插件
       $("#owl").owlCarousel({
          items: 1,
          loop: true,
          autoplay: true,
          autoplayTimeout: 3000
       }); 
    },
    methods:{
      jump (){
        var now = Date.now();
        var last = localStorage.lastLoginTime || 'first';
        var sid = localStorage.sessionid;
        if(last === 'first' || sid === ''){ //第一次登录或退出过登录
          window.location.href = './register'
        }else{
          /* 距离上次登录间隔的分钟数 */
          var duration = (now - last)/60000;
          if(duration >= 300 ){  //sessionid时长为5个小时
            window.location.href = './register'
          }else{
              this.deepJump();
          }
        }
      },
      deepJump (){
        var that = this;
        axios.get('http://120.27.198.97:8081/flower/w/xhhApp/selectLoanUser?'+
        'sessionid=' + localStorage.sessionid)
        .then( rs => {
          if(rs.data.code == '0'){
            window.location.href = './register'
          }else{
            that.userInfo = JSON.parse(rs.data.data);
            var vipNo = that.userInfo.membership_number;
            if( vipNo != null && vipNo != '' &&
              vipNo != undefined && vipNo != 'undefined')
              window.location.href = './myAccount'
            else
              window.location.href = './infoFillIn'
          }
        })
        .catch( err => {
          alert(err);
          window.location.href='/register'
        });
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #bottom
    max-width:640px
    text-align: center;
    background:url('~static/login_bg.jpg') no-repeat;
    background-size: 100% 100%;
    position:absolute;
    top:0;
    bottom:8vh;
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    #owl
      margin:0 auto
      width:78%
      height:75%
      img
        width:90%
        height:80%
        margin 0 auto
      .owl-theme .owl-dots .owl-dot span
        width 7px
        height 7px
    .bottom-btn
      width 100%
      display flex
      bottom 30px
      justify-content center
      .apply
        width 140px
        height 39px
        line-height 37px
        font-size 16px
        color #fff
        border 1px solid #fff
        margin-right 25px
      .register
        background #BDAA73
        width 140px
        height 39px
        line-height 37px
        font-size 16px
        color #fff
</style>
