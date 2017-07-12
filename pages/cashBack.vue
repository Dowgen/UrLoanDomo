<template>
  <section class="container">
    <div class="add">
    </div>
    <div class="apply-list">
      <div class="apply-product">
        <div class="top">
          <img width="30" height="30" src="../static/main_profilephoto_icon.png"/>
          <div class="name">功夫贷</div>
        </div>
        <div class="bottom">
          <span class="money">借款金额：<span class="number">5000</span>元</span>
          <span class="time">借款期数：<span class="number">6</span>个月</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript">

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    position relative
    width 100%
    min-height 100vh
    background url("../static/js.png")
    padding-top 14px
    .add
      width 92%
      height 80px
      margin 0 auto
      background linear-gradient(#bdaa73, #d3aa50);
      opacity 0.59
      border-radius 6px
      margin-bottom 14px
    .apply-list
      width 92%
      margin 0 auto
      .apply-product
        width 100%
        height 80px
        background-color rgba(255,255,255,0.14)
        border-radius 6px
        border 1px solid #89888b
        padding 12px 0 12px 15px
        box-sizing border-box
        margin-bottom 20px
        .top
          display flex
          align-items center
          margin-bottom 10px
          .name
            margin-left 8px
            font-size 14px
            color #FFFFFF
            font-weight bolder
        .bottom
          font-size 13px
          color #ffffff
          .money
            margin-right 28px
            .number
              color #F42D06
          .time
            .number
              color #F42D06
</style>
