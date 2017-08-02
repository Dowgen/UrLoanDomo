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
        <i class="fa fa-arrow-left" aria-hidden="true" @click="questionStatus=false" style="margin:10px"></i>
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
        <i class="fa fa-arrow-left" aria-hidden="true" @click="contactStatus=false" style="margin:10px"></i>
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
        <i class="fa fa-arrow-left" aria-hidden="true" @click="serviceStatus=false"></i>
        <div class="title">用户注册协议</div>
        <div class="total">杭州炬合网络科技有限公司在此郑重提示您，本文系您与“优贷管家”（以下简称平台）之间的法律协议，请您认真阅读并理解本协议。您通过平台点击确认本协议的，即表示您同意遵循本协议的所有约定，本协议在您和平台之间具有法律约束力。如发生法律纠纷，您不得以未仔细阅读或理解本协议为由进行抗辩。</div>
        <div class="sub-title">第一条：用户确认及服务接纳</div>
        1.1 注册用户需满足下列条件：<br>
        （1）中华人民共和国大陆地区居民（不包含台、港、澳地区）；<br>
        （2）具备接受平台各项服务，履行相应义务的完全民事权利能力及行为能力。<br>
        1.2 用户需接受平台全部协议条款及各项平台规则，方可成为平台注册用户，接受平台提供的各项服务。<br>
        1.3 用户确认本协议全部条款并完成注册的，视为用户符合注册条件，能够独立承担因接受平台服务所产生权利义务。<br>
        1.4 平台保留在中华人民共和国现行有效之法律、法规范围内接受、拒绝、终止/中止用户接受平台服务之资格。<br>
        <div class="sub-title">第二条 ：用户注册信息</div>
        2.1 用户首次通过平台提交个人信息并确认本协议的，即成为平台注册用户。<br>
        2.2 用户应自行如实向平台提供注册信息。用户应当确保其提供的注册信息真实、准确、完整、合法有效。如用户提供的注册信息不合法、不真实、不准确、不详尽，用户需承担由此产生的相应责任及后果，平台保留终止注册用户资格的权利。<br>
        2.3 用户认可平台收集及储存用户的资料及信息，包含但不限于用户本人提交的资料及信息以及平台自行收集的用户资料及信息。平台收集、储存用户资料及信息的目的在于更加效率及便利地为用户提供平台服务，平台不得将用户资料及信息用于其他目的。<br>
        2.4 平台应当采取不低于一般行业惯例对于用户的资料及信息进行保护，但因不可抗力所导致的用户资料及信息泄露（包含但不限于黑客攻击、第三方导致的系统缺陷等），平台不承担相应的责任。<br>
        2.5 平台有义务根据行政、司法机关的要求向该等机关提供用户的资料及信息。<br>
        2.6 用户应当谨慎地保存、使用其平台账号、密码、手机验证码等信息。用户不得将平台账号向他人透露、借用，否则用户应当承担由此产生的全部后果及责任。<br>
        <div class="sub-title">第三条 平台服务</div>
        平台依靠互联网依法向平台注册用户提供互联网信息服务等服务内容。<br>
        <div class="sub-title">第四条 用户承诺</div>
        4.1 用户应当妥善保管本人的平台账号、密码、绑定的手机号码、手机验证码等信息。对于非因平台过错产生的上述信息泄露所导致的用户损失平台不承担任何责任。<br>
        4.2 用户承诺在接受平台服务过程中应当诚实、守信地履行相关义务，否则将承担包含但不限于下列后果：<br>
        （1）用户的不良信用信息将被上传至经中国人民银行批准并依法设立的各征信数据机构；<br>
        （2）用户将因违约行为承担相应的违约责任；<br>
        （3）用户将因违约行为承担相应的诉讼后果。<br>
        <div class="sub-title">第五条 征信授权</div>
        5.1 用户在此不可撤销地授权平台通过依法设立的征信机构了解、咨询、审查用户的个人信息、信用状况、履约能力及其他评定用户资信状况的信息，包含可能存在的用户不良信用信息。<br>
        5.2 用户在此不可撤销地授权平台向依法设立的征信机构提供用户接受平台服务所对应的个人信息、借贷信息及后续还款记录等信息。<br>
        5.3 用户在此不可撤销地授权平台向依法设立的征信机构提供用户可能产生的不良信用信息。<br>
        <div class="sub-title">第六条 关于电子合同</div>
        6.1本协议采用电子文本形式制成，并在平台系统上保留存档。其签订方式符合《中华人民共和国电子签名法》的要求。用户通过平台系统点击确认或以其他方式选择接受本协议，即表示已同意接受本协议的全部内容以及与本协议有关的各项平台规则。<br>
        6.2用户应当妥善保管自己的账号、密码等账户信息，不得以账户信息被盗用或其他理由否认已订立的协议的效力或不履行相关义务。<br>
        <div class="sub-title">第七条 责任限制</div>
        除非另有明确的书面说明,平台及其所包含的或以其它方式通过平台提供给用户的全部信息、内容、材料、产品（包括软件）和服务，均是在"按现状"和"按现有"的基础上提供的。<br>
        如因不可抗力或其它平台无法控制的原因平台系统崩溃或无法正常使用导致无法向用户提供平台服务的，平台不承担任何责任。<br>
        <div class="sub-title">第八条 联系信息更新</div>
        用户接受平台服务期间，用户本人姓名、身份证号码、手机号码、银行账户等信息如发生变更，应当在相关信息发生变更之日起三日内将更新后的信息提供给平台。因用户未能及时提供上述变更信息而带来的损失或额外费用应由用户自行承担。<br>
        <div class="sub-title">第九条 适用法律及争议解决</div>
        9.1本协议的签订、履行、终止、解释均适用中华人民共和国法律。<br>
        9.2因履行本协议所产生的争议应当通过友好协商解决；如协商不成，则本协议任意一方均可向本协议签订地杭州市有管辖权的人民法院起诉。<br>
        <div class="sub-title">第十条 其他</div>
        10.1本协议未尽事项按照平台现有及不时发布的各项规则执行。<br>
        10.2如本协议中的任何一条或多条被确认为无效，该无效条款并不影响本协议其他条款的效力。
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
        questionData:[{'problem':'优贷管家是什么？','answer':'优贷管家是一个提供贷款返利的会员制金融服务平台，通过优贷管家的渠道申请现金贷、蓝领贷等产品，可以获得相应的返利；与此同时，优贷管家通过内部渠道，为用户提升至少30%的通过率，且优贷管家渠道的用户申请的贷款产品，优贷管家保证低于市面上的所有申请渠道。后续，优贷管家会基于您的信用，为您提供更多更优质的金融服务。请拭目以待吧。'},
          {'problem':'如何办理优贷管家？','answer':'通过优贷管家微信服务号，或者任意入口注册并付款成功后，即可成为优贷管家的会员，享受优贷管家最贴心的金融服务哦。'},
          {'problem':'优贷管家真的可靠吗？','answer':'优贷管家是杭州炬合网络科技有限公司，跟金融行业内的数十家企业联合打造的一款现金贷返利产品，所有在线产品均合法合规，优贷管家重塑现金贷产业链的流程，将行业“渠道”费用反哺用户，贷越多，返越多，是您居家必备的借贷神器！'},
          {'problem':'如果对服务不满意怎么办？','answer':'您在使用过程中产生任何问题，都可以通过我们的客服电话 0571-28121621 进行反馈，我们会竭尽所能为您提供最满意的服务。'}
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
          window.location.href = '.';
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
        border-bottom 1px solid #CBC7CB
        align-items center
        height 48px
        background #ffffff
      .setting-box:last-child
        padding-left 20px
        margin-left 0
    .logout
      width 60vw
      margin 0 auto
      height 40px
      color #ffffff
      font-size 13px
      text-align center
      line-height 40px
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
            text-align justify
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
      top  0  
      left 0
      bottom 0  
      position fixed  
      overflow-y scroll  
      overflow-x hidden
      width 100%
      height 100%
      padding 20px
      font-size 13px
      background-color #ffffff
      transform: translate3d(0, 0, 0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
      &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
      .title
        text-align center
        margin-bottom 10px
        font-size 18px
        font-weight bolder
      .total
        font-size 13px
        color #1a1a1a
        text-indent 2em
        line-height 20px
      .sub-title
        font-weight bolder
        font-size 13px
        margin 16px 0
</style>
