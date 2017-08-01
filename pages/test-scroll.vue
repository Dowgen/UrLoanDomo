<!--<template>-->
  <!--<section class="container">-->

    <!--<input type="file" id="upload-file" />hi-->
  <!--</section>-->
<!--</template>-->
<!--<script type="text/ecmascript">-->

  <!--export default{-->
    <!--head: {-->
      <!--script: [-->
        <!--{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.4.2/jquery.min.js' },-->
<!--/*        { src: '~node_modules/simple-uploader/dist/simple-module.js' },*/-->
        <!--{ src: 'https://github.com/mycolorway/simple-uploader/blob/master/dist/simple-uploader.min.js' }-->
      <!--]-->
    <!--},-->
    <!--data () {-->
      <!--return {-->

      <!--}-->
    <!--},-->
    <!--created () {-->
        <!--if (process.browser) {-->
        <!--var uploader = simple.uploader({-->
          <!--url: 'http://120.27.198.97:8081/flower/w/youLoan/uploadApplyImage',-->
          <!--'params': {-->
            <!--phoneNum: 13666604580,-->
            <!--product_name: '拍拍贷'-->
          <!--},-->
        <!--});-->

        <!--$('#upload-file').on('change', function(e) {-->
          <!--uploader.upload(this.files);-->
        <!--});-->
    <!--}-->
    <!--},-->
    <!--methods: {-->

    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style scoped lang="stylus" rel="stylesheet/stylus">-->

<!--</style>-->
<!-- You can custom the "mySwiper" name used to find the swiper instance in current component -->
<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in banners">
        <img :src="banner">
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        banners: [ '/1.jpg', '/2.jpg', '/3.jpg' ],
        swiperOption: {
          autoplay: 5000,
          initialSlide: 1,
          loop: true,
          pagination: '.swiper-pagination',
          onSlideChangeEnd: swiper => {
            console.log('onSlideChangeEnd', swiper.realIndex)
          }
        }
      }
    },
    mounted() {
      console.log('app init')
      setTimeout(() => {
        this.banners.push('/5.jpg')
        console.log('banners update')
      }, 3000)
      console.log(
        'This is current swiper instance object', this.mySwiper,
        'It will slideTo banners 3')
      this.mySwiper.slideTo(3)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .swiper-pagination-bullet-active
    background #C1A96B
</style>
