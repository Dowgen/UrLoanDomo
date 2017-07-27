<template>
  <section class="container">
    <div class="grey"></div>
    <div class="content">
      <div class="setting-box" @click="question">
        <span class="text">常见问题</span>
        <img width="6" height="10" src="../static/main_profile_arrow.png"/>
      </div>
      <div class="setting-box" @click="contact">
        <span class="text">联系我们</span>
        <img width="6" height="10" src="../static/main_profile_arrow.png"/>
      </div>
      <div class="setting-box" @click="service">
        <span class="text">服务与隐私条款</span>
        <img width="6" height="10" src="../static/main_profile_arrow.png"/>
      </div>
    </div>
    <div class="logout" @click="logout" >
      退出登录
    </div>
    <transition name="move">
      <div class="question-content" v-show="questionStatus">
        <ul>
          <li v-for="(item,index) in questionData" class="question-item" @click="changeIndex(index)">
            <div class="problem-wrapper">{{item.problem}}</div>
            <div v-show="currentIndex===index" class="answer-wrapper">{{item.answer}}</div>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="move">
      <div class="contact-content" v-show="contactStatus">
        <ul>
          <li v-for="item in contactData" class="contact-item">
            <div class="name">{{item.name}}</div>
            <div class="text">{{item.text}}</div>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="move">
      <div class="service-content" v-show="serviceStatus">

      </div>
    </transition>

    <div class="company">
      杭州炬合网络科技有限公司
      <br/>
      Copyright © 2016-2017All Rights Reserved
    </div>
  </section>
</template>
<script type="text/ecmascript">
  export default{
    data () {
      return {
        questionStatus: false,
        contactStatus: false,
        serviceStatus: false,
        currentIndex: 0,
        questionData:[{'problem':'优贷管家是什么？','answer':'优贷管家的返利申请是针对您申请成功之后我们平台为你返利的直接证明，请按照您的实际申请内容去填写，以免遗漏返利金额，如您的申请经过我们审核属实，我们会在七日之内向您的支付会员时的原渠道返相应金额'},
          {'problem':'如何办理优贷管家？','answer':'2222222222'},
          {'problem':'优贷管家真的可靠吗？','answer':'33333333333'},
          {'problem':'如果对服务不满意怎么办？','answer':'4444444444444'}
          ],
        contactData:[{'name':'品牌活动、市场推广、媒体采访：','text':'my@juhetech.cn'},
          {'name':'商务合作：','text':'lhx@juhetech.cn'},
          {'name':'贷款产品洽谈：','text':'sz@juhetech.cn'},
          {'name':'客服联系电话：','text':'0571-86798570'},]
      }

    },
    methods: {
      question () {
        this.questionStatus = true;
      },
      contact () {
        this.contactStatus = true;
      },
      service () {
        this.serviceStatus = true;
      },
      changeIndex (index) {
        this.currentIndex=index
      },
      logout () {
          localStorage.sessionid=''
          window.location='/index'
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
    .content
      background #ffffff
      .setting-box
        display flex
        justify-content space-between
        padding-right 20px
        margin-left 20px
        border-bottom 1px solid #ECEDEE
        align-items center
        height 48px
        background #ffffff
      .setting-box:last-child
        padding-left 20px
        margin-left 0
    .logout
      width 60vw
      margin 0 auto
      height 35px
      color #ffffff
      font-size 13px
      text-align center
      line-height 35px
      background-color #BDAA73
      border-radius 10px
      margin-top 32px
    .company
      z-index 1
      width 100%
      height 50px
      position absolute
      left 0
      bottom 0
      text-align center
      font-size 10px
      color #828389
      line-height 20px
    .question-content
      z-index 10
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      background-color #ECEDEE
      transform: translate3d(0, 0, 0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
      &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
      ul
        padding-left 0
        .question-item
          list-style none
          .problem-wrapper
            padding-left 20px
            font-size 14px
            color #212121
            height 48px
            line-height 48px
            background-color #ffffff
            border-bottom 1px solid #c8c7cb
          .answer-wrapper
            padding 16px 20px
            font-size 13px
            line-height 24px
            color #212121

    .contact-content
      z-index 10
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      background-color #ECEDEE
      transform: translate3d(0, 0, 0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
      &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
      ul
        padding-left 0
        padding-top 28px
        background-color #ffffff
        .contact-item
          list-style none
          padding 0 0 27px 23px
          .name
            font-size 15px
            color #858585
            margin-bottom 11px
          .text
            font-size 15px
            color #BFBFBF

    .service-content
      z-index 10
      position absolute
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
</style>
