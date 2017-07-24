<template>
  <section class="container">
    <div class="container-inner" ref="containerInner">
      <div class="top">
        <div class="information">
          <div class="top-information">
            <div class="avatar">
              <img width="70" height="70" src="../static/main_profilephoto_icon.png"/>
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
            <div class="member-number">会员籍号:<span class="number">12908763</span></div>
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
      </div>
    </div>
    <div class="recommend">
      <div class="global-mask" v-show="maskStatus" @click="hideAll" @touchmove.prevent></div>
      <div v-swiper:mySwiper="swiperOption" v-show="maskStatus">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="banner in banners">
            <div class="product">
              <img width="63" height="63" :src="banner.imgUrl" />
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
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript">
  import axios from 'axios'

  export default {
    data () {
      return {
        maskStatus: true,
        manStatus: false,
        womanStatus: false,
        userInfo:{},
        age: '',
        banners: [
          {
            imgUrl: './main_profilephoto_icon.png',
            name: '功夫贷',
            rate: '0.05%',
            line: '10万',
            success: '96%',
            advantage: ['申请资料简单', '信用卡贷10万']
          },
          {
            imgUrl: './main_profilephoto_icon.png',
            name: '现金侠',
            rate: '0.06%',
            line: '11.8万',
            success: '96%',
            advantage: ['申请简单', '信用卡贷10万']
          },
          {
            imgUrl: './main_profilephoto_icon.png',
            name: '米兔儿',
            rate: '0.07%',
            line: '12万',
            success: '96%',
            advantage: ['申请资料简单', '信用卡10万']
          }],
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
    },
    created(){
      var that = this;
      var date=new Date();
      var year=date.getFullYear();
      this.$nextTick(() => {
      axios.get('http://120.27.198.97:8081/flower/w/xhhApp/selectLoanUser?'+
        'sessionid=' + localStorage.sessionid)
        .then(function (response) {
          that.userInfo=JSON.parse(response.data.data);
          console.log(that.userInfo);
          that.age=year-that.userInfo.id_card.substring(6,10)+'岁'
          if (that.userInfo.gender=='男'){
              that.manStatus=true
          }else if (that.userInfo.gender=='女'){
            that.womanStatus=true
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } )},
    methods: {
      hideAll(){
        this.maskStatus = false;
        this.$refs.containerInner.style.zIndex=1;
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
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
    .recommend
      z-index 10
      .global-mask
        width 100%
        height 58vh
        background: rgba(0, 0, 0, 0.4);
        animation: fade 0.5s linear;
      .product
        position relative
        width 100%
        height 42vh
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
</style>
