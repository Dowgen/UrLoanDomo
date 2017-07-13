<template>
  <div class="con">
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        xxxxxxxxxx
      </div>
      <div class="swiper-slide">
        xxxxxxxxxx
      </div>
      <div class="swiper-slide">
        xxxxxxxxxx
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        banners: [
          {imgUrl: '../static/main_profilephoto_icon.png', name: '功夫贷', rate: '0.05%', line: '10万', success: '96%', advantage: ['申请资料简单', '信用卡贷10万']},
          {imgUrl: '../static/main_profilephoto_icon.png', name: '现金侠', rate: '0.06%', line: '11.8万', success: '96%', advantage: ['申请简单', '信用卡贷10万']},
          {imgUrl: '../static/main_profilephoto_icon.png', name: '米兔儿', rate: '0.07%', line: '12万', success: '96%', advantage: ['申请资料简单', '信用卡10万']}],
        swiperOption: {
          autoplay: 5000,
          initialSlide: 0,
          loop: true,
          pagination: '.swiper-pagination',
          onSlideChangeEnd: swiper => {
            console.log('onSlideChangeEnd', swiper.realIndex)
          }
        }
      }
    }

  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .product
    position relative
    width 100%
    height 285px
    background-color #ffffff
    text-align center
    >img
      margin-top 34px
      margin-bottom 8px
    .product-name
      font-size 15px
      color #212121
      margin-bottom 20px
    .desc
      display flex
      padding-bottom 14px
      margin 0 20px
      border-bottom dashed 1px #606166
      font-size 11px
      color #606166
      margin-bottom 13px
      .dailyRate
        flex 1
        .number
          color #F42D06
          margin-left 5px
      .lines
        flex 1
        .number
          color #F42D06
          margin-left 5px
      .success
        flex 1
        .number
          color #F42D06
          margin-left 5px
    .advantage
      display flex
      width 70%
      margin 0 auto
      justify-content space-between
      margin-bottom 28px
      .advantage-inner
        width 100px
        height 25px
        border 1px solid #AAAAAA
        font-size 11px
        color #AAAAAA
        text-align center
        line-height 25px
        border-radius 12px

  .con
    position: relative;
    bottom: 0
    height:100px;
</style>
