<template>
  <section class="container">
    <div class="grey"></div>
    <div class="advice-box" @click="advice">
      <span class="text">建议与反馈</span>
      <img width="6" height="10" src="../static/main_profile_arrow.png"/>
    </div>
    <div class="advice-box" @click="complain">
      <span class="text">投诉</span>
      <img width="6" height="10" src="../static/main_profile_arrow.png"/>
    </div>
    <div class="company">
      杭州炬合网络科技有限公司
      <br/>
      Copyright © 2016-2017All Rights Reserved
    </div>
    <transition name="move">
      <div class="advice-content" v-show="adviceStatus">
        <form action="">
          <textarea class="advice-text" placeholder="您的意见和建议是我们优贷管家进步的动力，请尽情告诉我们，我们一定会加强完善，谢谢！"></textarea>
          <input class="submit-btn" type="submit" value="提交" />
        </form>
      </div>
    </transition>
    <transition name="move">
      <div class="complain-content" v-show="complainStatus">
        <form action="">
          <textarea class="complain-text" placeholder="您的意见和建议是我们优贷管家进步的动力，请尽情告诉我们，我们一定会加强完善，谢谢！"></textarea>
          <input class="submit-btn" type="submit" value="提交" />
        </form>
      </div>
    </transition>
  </section>
</template>
<script type="text/ecmascript">
  export default{
    data () {
      return {
        adviceStatus: false,
        complainStatus: false
      }

    },
    methods: {
      advice () {
        this.adviceStatus = true;
      },
      complain () {
        this.complainStatus = true;
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    position relative
    width 100%
    height 100vh
    background-color #ECEDEE
    .grey
      width 100%
      height 10px
      background-color #ECEDEE
    .advice-box
      display flex
      justify-content space-between
      padding 0 20px
      border-bottom 1px solid #CBC7CB
      align-items center
      height 48px
      background #ffffff
    .company
      width 100%
      height 50px
      position absolute
      left 0
      bottom 0
      text-align center
      font-size 10px
      color #828389
      line-height 20px
    .advice-content
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      background-color #ffffff
      transform: translate3d(0, 0, 0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
      &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
      .advice-text
        width 100%
        height 80vh
        outline none
        border none
        resize none
        padding 20px
        font-size 14px
        color #c6c6c8
        line-height 20px
      .submit-btn
        position absolute
        width 60vw
        height 35px
        left 20vw
        bottom 17px
        background #bdaa73
        border-radius 5px
        color #ffffff
        text-align center
        font-size 13px
    .complain-content
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      background-color #ffffff
      transform: translate3d(0, 0, 0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
      &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
      .complain-text
        width 100%
        height 80vh
        outline none
        border none
        resize none
        padding 20px
        font-size 14px
        color #c6c6c8
        line-height 20px
      .submit-btn
        position absolute
        width 60vw
        height 35px
        left 20vw
        bottom 17px
        background #bdaa73
        border-radius 5px
        color #ffffff
        text-align center
        font-size 13px
</style>
