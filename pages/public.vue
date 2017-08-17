<template>
  <section class="container">
    <div class="regist" v-show="!slideEnd" >
      <img src="propagate/regist.png" onclick="location.href='/register'">
    </div>   
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="propagate/1.jpg">
        </div>
        <div class="swiper-slide">
          <img src="propagate/2.jpg">
        </div>
        <div class="swiper-slide">
          <img src="propagate/3.jpg">
        </div>
        <div class="swiper-slide">
          <img src="propagate/4.jpg" onclick="location.href='/register'">
        </div>
      </div>
      <img src="propagate/cposter-arrow.png" 
       id="array" v-show="!slideEnd">
    </div> 
  </section>
</template>
<script type="text/javascript">
import swiper from '~plugins/swiper'
export default{
  head:{
    script: [
      { src: 'js/jQuery.min.js' }
    ]
  },
  data () {
    return {
      slideEnd: false,
      swiperOption: {
        direction : 'vertical',
        /*autoplay: 5000,*/
        initialSlide: 0,
        /*loop: true,*/
        pagination : '.swiper-pagination',
        paginationHide :true,
        onSlideChangeEnd: swiper => {
          if(swiper.realIndex === 2){
            this.slideEnd = false;
            $('.regist').css('right','');
            $('.regist').css('left','4%');
            $('.regist').css('top','23%');
          }else if(swiper.realIndex === 3){
            this.slideEnd = true;
          }else{
            this.slideEnd = false;
            $('.regist').css('top','50px');
            $('.regist').css('left','');
            $('.regist').css('right','4%');    
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    max-width 640px
    font-size calc(100vw/10);
    position relative
    background black
  .regist
    position: absolute
    right: 4%
    top: 50px
    z-index: 999
    img
      width 2rem
      height 6rem
  .swiper-container
    width 100%
    height 100%
    max-height 100vh
    .swiper-slide
      width: 100%;
      height: 100%;
      max-height 100vh
      img
        display block
        width 100%
        height 100%
  @keyframes start {
    0%,30% {opacity: 0;transform: translate(0,10px);}
    60% {opacity: 1;transform: translate(0,0);}
    100% {opacity: 0;transform: translate(0,-8px);}
  }
  #array
    width: 72px;
    height: 37px;
    bottom: 3%;
    left: 0;
    right: 0;
    margin: auto;
    opacity: .8;
    position: absolute;
    z-index: 999;
    animation: start 1.5s infinite ease-in-out;
</style>
