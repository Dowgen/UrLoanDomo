<template>
  <div id="bottom">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img width="80%" height="70%" src="../static/1.1.png">
        </div>
        <div class="swiper-slide">
          <img width="80%" height="70%" src="../static/2.2.png">
        </div>
        <div class="swiper-slide">
          <img width="80%" height="70%" src="../static/3.3.png">
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
    <div class="bottom-btn">
      <div class="apply" onclick="location.href='/'">在线申请</div>
      <div class="register" onclick="location.href='/'">立即登录</div>
    </div>
  </div>
</template>
<script type="text/ecmascript">
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
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #bottom
    max-width:640px
    text-align: center;
    background:url('~static/login_bg.png') no-repeat;
    background-size: 100% 100%;
    position:absolute;
    top:0;
    bottom:0;
    width:100%;
    height:100%;
    .swiper-slide
      margin-top 62px
      padding-bottom 37px
    .bottom-btn
      width 100%
      position fixed
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
