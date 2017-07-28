<template>
  <div id="bottom">
    <div v-swiper:mySwiper="swiperOption">
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
    </div>
    <div class="bottom-btn">
      <div class="apply" @click="jump">在线申请</div>
      <div class="register" @click="jump">立即登录</div>
    </div>
  </div>
</template>
<script type="text/ecmascript">
  import axios from 'axios'
  export default {
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
    methods:{
      jump (){
        var now = Date.now(), last = localStorage.lastLoginTime;
        /* 距离上次登录间隔的分钟数 */
        var duration = (now - last)/60000;
        if(duration >= 180 || !duration){
          window.location.href = './register'
        }else{
          this.deepJump();
        }
      },
      deepJump (){
        var that = this;
        axios.get('http://120.27.198.97:8081/flower/w/xhhApp/selectLoanUser?'+
        'sessionid=' + localStorage.sessionid)
        .then( rs => {
          that.userInfo = JSON.parse(rs.data.data);
          var vipNo = that.userInfo.membership_number;
          console.log('vipNo:'+vipNo);
          if( vipNo != null && vipNo != '' &&
              vipNo != undefined && vipNo != 'undefined')
            window.location.href = './myAccount'
          else
            window.location.href = './infoFillIn'
        })
        .catch( err => {
          console.log(err);
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
    .swiper-container
      width 80%
      height 86%
      .swiper-slide
        margin-top 32px
        padding-bottom 87px
    .bottom-btn
      width 100%
      position absolute
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
