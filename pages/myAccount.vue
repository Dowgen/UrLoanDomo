<template>
  <section class="container">
    <div class="top">
      <div class="information">
        <div class="top-information">
          <div class="avatar">
            <img width="70" height="70" src="../static/main_profilephoto_icon.png"/>
          </div>
          <div class="content">
            <div class="name">蒋杨昌</div>
            <div class="age">25岁</div>
          </div>
        </div>
        <div class="bottom-content">
          <div class="member-number">会员籍号:<span class="number">12908763</span></div>
          <div class="phone-number">手机号码:<span class="number">18158500564</span></div>
        </div>
      </div>
      <div class="detail-information" onclick="location.href='/myInformation'">
        <img width="20" height="20" src="../static/profile_icon.png">
        <span class="text">个人资料</span>
        <img width="6" height="10" src="../static/profile_arrow.png"/>
      </div>
    </div>
    <div class="project-list">
      <div class="project-item">
        <div class="item-img">
          <img width="23" height="23" src="../static/mian_cart.png">
        </div>
        <div class="text" onclick="location.href='/loanStore'">贷款超市</div>
      </div>
      <div class="project-item">
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
  </section>
</template>
<script type="text/ecmascript">

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    position relative
    width 100%
    height 100vh
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
</style>
