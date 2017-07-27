<template>
  <section class="container">
    <div class="product" v-for="(item , index) in productList" @click="jump(item.link)">
      <img width="60" height="60" src="../static/main_profilephoto_icon.png"/>
      <div class="product-name">{{item.product_name}}</div>
      <div class="desc">
        <span class="dailyRate">日利率<span class="number">{{item.rate}}</span></span>
        <span class="lines">最高额度<span class="number">10万</span></span>
        <span class="success">成功率<span class="number">{{item.success_rate}}</span></span>
      </div>
      <div class="advantage">
        <span class="advantage-inner">申请资料简单</span>
        <span class="advantage-inner">信用卡贷10万</span>
      </div>
      <div class="discount-wrapper">
        <img width="10" height="10" src="../static/next_pay_icon.png">
        <div class="discount">最高立减50</div>
        <img width="10" height="10" src="../static/back_authority_icon.png">
      </div>
      <div class="top-wrapper" v-if="index==0">
        <img width="36" height="46" src="../static/top1_icon.png">
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript">
  import axios from 'axios'
  export default{
    data () {
      return {
        productList:[]
      }
    },
    created(){
      var that = this;
      axios.get('http://120.27.198.97:8081/flower/w/youLoan/loanList')
        .then(function (response) {
          that.productList=response.data.list
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
        jump(adress){
            window.location.href=adress
        }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    position relative
    width 100%
    height 100%
    min-height 100vh
    background-image url("../static/js.png")
    background-attachment: fixed
    padding-top 14px
    .product
      position relative
      width 92%
      height 280px
      background-color rgba(255,255,255,0.14)
      margin 0 auto
      margin-bottom 14px
      text-align center
      border-radius 6px
      border 1px solid #89888b
      >img
        margin-top 23px
        margin-bottom 12px
      .product-name
        font-size 17px
        color #fffffe
        margin-bottom 19px
      .desc
        display flex
        padding-bottom 14px
        margin 0 20px
        border-bottom dashed 1px #ffffff
        font-size 13px
        color #FFFFFE
        margin-bottom 14px
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

      .discount-wrapper
        display flex
        justify-content center
        align-items center
        .discount
          width 105px
          text-align center
          height 25px
          color #BDAA73
          border 1px solid #BDAA73
          margin 0 5px

      .top-wrapper
        position absolute
        right 19px
        top -6px
</style>
