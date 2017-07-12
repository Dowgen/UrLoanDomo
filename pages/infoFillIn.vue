<template>
  <section class="container">
    <div class="top">
      <img width="32" height="65" src="../static/register_pic1.png"/>
      <div class="information">
        <img width="70" height="70" src="../static/register_pic2.png">
        <div class="zhima">
          <img width="45" height="45" src="../static/register_pic3.png"/>
        </div>
        <div class="text">基本信息</div>
      </div>
    </div>
    <div class="grey"></div>
    <div class="content">
      <div class="item">
        <div class="name">姓名</div>
        <input v-model="name" placeholder="请输入姓名" class="text"/>
      </div>
      <div class="item">
        <div class="name">身份证号</div>
        <input v-model="IDcard" placeholder="请输入身份证号" class="text"/>
      </div>
      <div class="item">
        <div class="name">注册手机号</div>
        <input v-model="phoneNumber" placeholder="请输入您的手机号" class="text"/>
      </div>
      <div class="item">
        <div class="name">职业身份</div>
        <div class="job" v-model="job" @click="show('job')">
          <span class="job-text">{{job}}</span>
          <img src="../static/arrow_select.png"/>
        </div>
      </div>
    </div>
    <div class="global-mask" v-show="maskStatus" @click="hideAll" @touchmove.prevent></div>
    <transition name="top">
      <div class="modify" v-show="jobStatus">
        <div class="smallTitle">
          <img width="17" height="17" src="../static/career_icon.png"/>
          <span class="smallText">请选择您的职业身份</span>
        </div>
        <div class="typeChoose">
          <div class="text text-line" @click="choose($event,'ocp')">上班族</div>
          <div class="text" @click="choose($event,'ocp')">学生族</div>
        </div>
        <div class="cancel" @click="hideAll">
          取消
        </div>
      </div>
    </transition>
    <div class="bottom">
      <div class="desc">
        <div class="text">优贷管家基础办理费用</div>
        <div class="number">199元/年</div>
      </div>
      <div class="next" onclick="location.href='/authorization'">下一步</div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        job: '请选择',
        name: '',
        IDcard: '',
        phoneNumber: '',
        maskStatus: false,
        jobStatus: false
      }
    },
    methods: {
      hideAll () {
        this.maskStatus = false
        this.jobStatus = false
      },
      show (type) {
        this[type + 'Status'] = true
        this.maskStatus = true
      },
      choose (event, type) {
        this.job = event.target.innerHTML
        this.hideAll()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @keyframes fade
    from{opacity: 0;}
    to{opacity: 1}
  .container
    position relative
    width 100%
    height 100vh
    .top
      position relative
      height 185px
      background url("../static/register_bg.png")
      background-size contain
      >img
        position absolute
        top 36px
      .information
        position relative
        width 300px
        height 100%
        text-align center
        margin 0 auto
        padding-top 32px
        box-sizing border-box
        .text
          margin-top 18px
          font-size 18px
          color #828389
        .zhima
          position absolute
          right 0
          top 48px
    .grey
      width 100%
      height 10px
      background-color #ECEDEE
    .content
      width 100%
      padding 0 14px
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
          color #828389
        .job
          color #828389
          font-size 0
          .job-text
            font-size 13px
            color #828389
            margin-right 7px

    .global-mask
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.4);
      animation: fade 0.5s linear;
    .modify
      z-index 100
      position:fixed;
      bottom:0;
      width:100%;
      height:auto;
      transform: translate3d(0,0,0);
      &.top-enter-active, &.top-leave-active
        transition: all 0.5s
      &.top-enter, &.top-leave-active
        transform:translate3d(0, 100%, 0)
      .smallTitle
        display flex
        align-items center
        justify-content center
        box-sizing border-box
        height:39px;
        font-size:12px;
        color:#212121;
        border-bottom:1px solid #ECEDEE;
        background:#FFFFFF;
        .smallText
          margin-left 15px
      .typeChoose
        background:#ffffff;
        .text
          width:100%;
          height:61px;
          line-height:61px;
          text-align:center;
          font-size:17px;
          color:#212121;
        .text-line
          box-sizing:border-box;
          border-bottom:1px solid #eeeeee;
      .cancel
        width:100%;
        height:61px;
        line-height:61px;
        text-align:center;
        font-size:17px;
        color:#212121;
        background:#ECEDEE;
    .bottom
      z-index 10
      position absolute
      bottom 0
      left 0
      width 100%
      height 60px
      padding 10px 10px 14px 30px
      box-sizing border-box
      display flex
      justify-content space-between
      align-items center
      background-color #f7f7f7
      .next
        flex 0 0 160px
        height 40px
        line-height 40px
        background #BDAA73
        color #ffffff
        font-size 13px
        border-radius 5px
        text-align center
      .desc
        text-align center
        font-size 12px
        color #6A6A6A
        margin-bottom 7px
        .number
          color #D65745
          font-size 12px
          flex 1
</style>
