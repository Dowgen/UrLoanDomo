<template>
  <section class="container">
    <div class="container-inner" ref="containerInner">
      <div class="top">
        <div class="information">
          <div class="top-information">
            <div class="avatar">
              <img width="70" height="70" :src="avatar"/>
            </div>
            <div class="content">
              <div class="name">
                {{userInfo.real_name}}
                <img v-if="manStatus" width="12" height="12" src="../static/man.png"/>
                <img v-if="womanStatus" width="12" height="12" src="../static/woman.png"/>
              </div>
              <div class="age">{{age}}</div>
            </div>
          </div>
          <div class="bottom-content">
            <div class="member-number">会员籍号:<span class="number">{{userInfo.membership_number}}</span></div>
            <div class="phone-number">手机号码:<span class="number">{{userInfo.phone_number}}</span></div>
          </div>
        </div>
        <div class="detail-information" onclick="location.href='/myInformation'">
          <img width="20" height="20" src="../static/profile_icon.png">
          <span class="text">个人资料</span>
          <img width="6" height="10" src="../static/profile_arrow.png"/>
        </div>
      </div>
      <div class="project-list">
        <div class="project-item"onclick="location.href='/loanStore'">
          <div class="item-img">
            <img width="23" height="23" src="../static/mian_cart.png">
          </div>
          <div class="text" >贷款超市</div>
        </div>
        <div class="project-item" onclick="location.href='/cashBack'">
          <div class="item-img">
            <img width="23" height="23" src="../static/main_apply.png">
          </div>
          <div class="text">返利申请</div>
        </div>
        <div class="project-item" onclick="location.href='/advice'">
          <div class="item-img">
            <img width="23" height="23" src="../static/main_suggest.png">
          </div>
          <div class="text">建议</div>
        </div>
        <div class="project-item" onclick="location.href='/setting'">
          <div class="item-img">
            <img width="23" height="23" src="../static/main_Set.png">
          </div>
          <div class="text">设置</div>
        </div>
        <div class="project-item" @click="QRShow">
          <div class="item-img">
            <img width="23" height="23" src="../static/QR_icon.png">
          </div>
          <div class="text">二维码</div>
        </div>
      </div>
    </div>
    <div class="QR-con" @click="hideQR" v-show="QRStatus">
      <img src="../static/QR.jpg" class="QR-code">
      <img src="../static/QR_close.png" class="QR-close">
    </div>
    <div class="global-mask" v-show="maskStatus" @click="hideAll" @touchmove.prevent>
      <img src="../static/attention.png">
    </div>
    <div id="banner" class="banner">
    <div id="owl" class="owl-carousel owl-theme"  v-show="maskStatus">
      <div class="item" v-for="banner in banners">
        <div class="product" @click="jump(banner.linkUrl)">
          <img :src='banner.imgUrl' />
          <div class="product-name">{{banner.name}}</div>
          <div class="desc">
            <span class="dailyRate">日利率<span class="number">{{banner.rate}}</span></span>
            <span class="lines">最高额度<span class="number">{{banner.line}}</span></span>
            <span class="success">成功率<span class="number">{{banner.success}}</span></span>
          </div>
          <div class="advantage">
            <span class="advantage-inner">{{banner.advantage[0]}}</span>
            <span class="advantage-inner">{{banner.advantage[1]}}</span>
          </div>
        </div>
        <img style="position: absolute;top: -1px;right: 48px;width:36px;height:46px;" src="../static/recommend_icon.png"/>
      </div>
    </div>
    </div>
    <!-- <div v-swiper:mySwiper="swiperOption"  v-show="maskStatus">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="banner in banners">
          <div class="product" @click="jump(banner.linkUrl)">
            <img width="63" height="63" :src='banner.imgUrl' />
            <div class="product-name">{{banner.name}}</div>
            <div class="desc">
              <span class="dailyRate">日利率<span class="number">{{banner.rate}}</span></span>
              <span class="lines">最高额度<span class="number">{{banner.line}}</span></span>
              <span class="success">成功率<span class="number">{{banner.success}}</span></span>
            </div>
            <div class="advantage">
              <span class="advantage-inner">{{banner.advantage[0]}}</span>
              <span class="advantage-inner">{{banner.advantage[1]}}</span>
            </div>
          </div>
          <img style="position: absolute;top: -1px;right: 48px; " width="36" height="46" src="../static/recommend_icon.png"/>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div> -->
  </section>
</template>
<script type="text/ecmascript">
  import axios from 'axios'

  export default {
    head:{
      link: [
        {rel: 'stylesheet', href: 'css/owl/owl.carousel.min.css'},
        {rel: 'stylesheet', href: 'css/owl/owl.theme.default.min.css'},
      ],
      script: [
        { src: 'js/jQuery.min.js' },
        { src: 'css/owl/owl.carousel.min.js' }
      ]
    },
    data () {
      return {
        QRStatus: false,
        maskStatus: true,
        manStatus: false,
        womanStatus: false,
        userInfo:{},
        age: '',
        avatar:'',
        banners: [
          {

            imgUrl: '	./logo_xianjinxia.jpg',
            name: '现金侠',
            rate: '0.3%',
            line: '5000元',
            success: '90%',
            advantage: ['芝麻信用分', '有工作就贷'],
            linkUrl:'http://channel.xianjinxia.com/act/light-loan-xjx-beta?invite_code=MTcwNTQ2OA==&user_from=409&id=1'
          },
          {
            imgUrl: '	./logo_shandianzhouzhuan.jpg',
            name: '闪电周转',
            rate: '0.86%',
            line: '1000元',
            success: '79%',
            advantage: ['芝麻分550分+', '3分钟放款'],
            linkUrl:'https://sdzz-h5-rt.fqgj.net?channel=lydgj81xy'
          }],
        swiperOption: {
          autoplay: 5000,
          initialSlide: 0,
          loop: true,
          pagination: '.swiper-pagination',
          paginationBulletRender: function (swiper, index, className) {
            return '<span style="background:#c1a96b" class="' + className + '"></span>';
          },
          onSlideChangeEnd: swiper => {
            console.log('onSlideChangeEnd', swiper.realIndex)
          }
        }
      }
    },
    mounted(){
      var that = this;
      var date=new Date();
      var year=date.getFullYear();
      axios.get('http://120.27.198.97:8081/flower/w/xhhApp/selectLoanUser?'+
        'sessionid=' + localStorage.sessionid)
        .then(rs => {
          if(rs.data.code == '0'){
            window.location.href = './register'
          }else{
            that.userInfo=JSON.parse(rs.data.data);
            console.log(that.userInfo);
            that.avatar='http://120.27.198.97:8081/flower'+that.userInfo.avatar
            that.age=year-that.userInfo.id_card.substring(6,10)+'岁'
            if (that.userInfo.gender=='男'){
                that.manStatus=true
            }else if (that.userInfo.gender=='女'){
              that.womanStatus=true
            }
          }
        })
        .catch(err => {
          alert(err);
          window.location.href='/register'
        });

        //轮播图插件
       $("#owl").owlCarousel({
          items: 1,
          loop: true,
          autoplay: true,
          autoplayTimeout: 3000
       });
    },
    methods: {
      QRShow(){
        $('.container-inner').css('filter','blur(2px)');
        this.QRStatus = true;
      },
      hideQR(){
        $('.container-inner').css('filter','');
        this.QRStatus = false;
      },
      hideAll(){
        this.maskStatus = false;
        this.$refs.containerInner.style.zIndex=1;
      },
      jump(adress){
        window.location.href=adress
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #owl
    position fixed
    bottom 0
    left 0
    width 100%
    background white
    .owl-dots .owl-dot span
      background: #bdaa73;
      opacity: 0.66;
  .container
    position relative
    width 100%
    height 100vh
    .container-inner
      position absolute
      width 100%
      height 100vh
      z-index -1
      .top
        position relative
        height 185px
        background url("../static/register_bg.png")
        background-size contain
        .information
          padding 24px 0 0 21px
          .top-information
            display flex
            align-items center
            margin-bottom 22px
            .avatar
              margin-right 10px
              img
                border-radius 50%
            .content
              .name
                font-size 15px
                color #fffffe
                margin-bottom 10px
              .age
                font-size 10px
                color #C1A96B
          .bottom-content
            padding-left 10px
            font-size 14px
            color #FFFFFF
            .member-number
              margin-bottom 11px
              .number
                padding-left 10px
                font-size 14px
                color #828389
            .phone-number
              .number
                padding-left 10px
                font-size 14px
                color #828389
        .detail-information
          position absolute
          right 0
          top 53px
          width 120px
          height 32px
          background #BDAA73
          border-top-left-radius 16px
          border-bottom-left-radius 16px
          display flex
          align-items center
          padding-left 8px
          .text
            margin-left 8px
            margin-right 8px
            font-size 14px
            color #ffffff
      .project-list
        display flex
        width 100%
        flex-flow: row wrap;
        align-content: flex-start;
        .project-item
          flex 0 0 33.3%
          text-align center
          height 126px
          padding-top 43px
          border-right 1px solid #f5f5f5
          border-bottom 1px solid #f5f5f5
          &:nth-child(3n+0)
            border-right none
          .item-img
            margin-bottom 15px
          .text
            font-size 13px
            color #828389
    .QR-con
      position absolute
      top 0 
      left 0 
      right 0 
      bottom 0 
      width 100%
      height 100%
      display flex
      justify-content center
      flex-direction column
      align-items center
      z-index 999
      .QR-code
        width 250px 
        height 350px
      .QR-close
        width 35px
        height 35px
        margin-top 25px
    .global-mask
      position relative
      width 100%
      height 100%
      background: rgba(0, 0, 0, 0.4);
      animation: fade 0.5s linear;
      img
        position absolute
        top 133px
        width 172px;
        height 92px
        left: 50%;
        margin-left: -60px;
      .circle
        width 33%
        height 126px
        border-radius 50%
        border 1px dotted #ffffff
        z-index -1
    .product
      position relative
      width 100%
      background-color #ffffff
      text-align center
      padding-bottom 50px
      >img
        width 63px
        height 63px
        margin 34px auto 8px
        border-radius 15px
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
        .advantage-inner
          width 100px
          height 25px
          border 1px solid #AAAAAA
          font-size 11px
          color #AAAAAA
          text-align center
          line-height 25px
          border-radius 12px
</style>
