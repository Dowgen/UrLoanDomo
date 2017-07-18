<template>
  <section class="container">
    <div class="add" @click="loan">
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
    <div class="prompt">
      <div class="title">温馨提示：</div>
      <div class="text">优贷管家的返利申请是针对您申请成功之后我们平台为你的返利的直接证明，
        请按照您的实际申请内容去填写，以免遗漏返利金额，如您的申请经过我们的审核属实，
        我们会在7日之内向您的支付会员时的原渠道返相应金额。
      </div>
    </div>
    <transition name="move">
      <div class="loan-content" v-show="loanStatus">
        <div class="attention">注意：请填写真实的贷款申请信息</div>
        <div class="content">
          <div class="item">
            <div class="name">贷款产品名</div>
            <input v-model="loanName" placeholder="请输入产品名（如拍拍贷）" class="text"/>
          </div>
          <div class="item">
            <div class="name">下款金额</div>
            <input v-model="loanMoney" placeholder="请输入准确的金额" class="text"/>
          </div>
          <div class="item">
            <div class="name">借款期数</div>
            <select class="select-time" v-model="duration">
              <option>1个月</option>
              <option>2个月</option>
              <option>3个月</option>
              <option>4个月</option>
              <option>5个月</option>
              <option>6个月</option>
              <option>7个月</option>
              <option>8个月</option>
              <option>9个月</option>
              <option>10个月</option>
              <option>11个月</option>
              <option>12个月</option>
            </select>
          </div>
        </div>

      </div>
    </transition>
  </section>
</template>
<script type="text/ecmascript">
  export default{
    data () {
      return {
        loanStatus: false,
        loanName: '',
        loanMoney:'',
        duration:''
      }
    },
    methods: {
      loan () {
        this.loanStatus = true;
      },
    }
  }
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
    .prompt
      position absolute
      bottom 0
      left 0
      width 100%
      height 225px
      padding-top 52px
      background-color rgba(0,0,0,0.26)
      color #ffffff
      .title
        padding-left 32px
        margin-bottom 21px
      .text
        font-size 13px
        line-height 20px
        padding-left 20px
        text-indent 2em
    .loan-content
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
    .attention
      height 33px
      line-height 33px
      font-size 13px
      color #828389
      padding-left 13px
      background-color #f5f5f5
    .content
      width 100%
      padding 0 16px
      .item
        display flex
        justify-content space-between
        height 48px
        line-height 48px
        font-size 14px
        color #212121
        border-bottom solid 1px #ECEDEE
        .text
          outline none
          border none
          text-align end
          color #c6c6cB
        .select-time
          border none
          outline none
</style>
