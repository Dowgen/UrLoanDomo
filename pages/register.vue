<template>
  <div id="bottom">
    <div class="d-con-con dialog-container" >
      <div class="title">注册/登录</div>
      <div class="user">
        <input v-model="phoneNum" placeholder="请输入手机号">
        <div type="default" class="d-button" @click="sendVerify" ref="d_btn">
          <span v-if="!sendMessage">{{btn_words}}</span>
          <span v-if="sendMessage">{{countdown}}s</span>
        </div>
      </div>

      <div class="sendCode">
        <div><input v-model="verifyCode" placeholder="请输入验证码"></div>

      </div>

    </div>
    <div @click="confirmPhone" ref="ensure_btn" class="regist">登录</div>
    <div class="agree">
      <p>点击上方"登录",即表示你同意</p>
      <span style="color:#bdaa73" @click="showProtocol">《优贷管家用户服务协议》</span>
    </div>
    <transition name="move">
      <div class="service-content" v-show="protocolStatus">
        <i class="fa fa-arrow-left" aria-hidden="true" @click="protocolStatus=false"></i>
        <div class="title1">用户注册协议</div>
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
  </div>
</template>

<script>
  import toastr from 'toastr'
  import axios from 'axios'

  // 弹窗插件配置
  toastr.options = {
    closeButton: false,
    debug: false,
    progressBar: false,
    positionClass: "toast-top-full-width",
    onclick: null,
    showDuration: "200",
    hideDuration: "800",
    timeOut: "1500",
    extendedTimeOut: "800",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  };
  export default {
    head () {
      return {
        title: '用户注册'
      }
    },
    data () {
      return {
        protocolStatus:false,
        btn_words: '获取验证码', // 验证框按钮的文字
        phoneNum: null,         // 用户输入的 手机号
        verifyCode: null,       // 用户输入的 验证码
        sendMessage: false,     // 决定显示文字还是倒计时
        countdown: 60,          // 倒计时数
        runCount: true,         // 是否正在倒计时
      }
    },
    methods:{
      showProtocol() {
          this.protocolStatus=true
      },
      // 判断用户是否会员,决定跳转至哪个页面
      jumpUrl (sessionid) {
        var that = this;
        axios.get('http://120.27.198.97:8081/flower/w/xhhApp/selectLoanUser?'+
        'sessionid=' + sessionid)
        .then( rs => {
          that.userInfo = JSON.parse(rs.data.data);
          var vipNo = that.userInfo.membership_number;
          console.log('vipNo:'+vipNo);
          if( vipNo != null && vipNo != '' &&
              vipNo != undefined && vipNo != 'undefined')
            window.location.href = './myAccount';
          else
            window.location.href = './infoFillIn';

        })
        .catch( err => {
          console.log(err);
        });
      },
      // 开始倒计时
      startCount () {
        if(this.runCount){
          this.$refs.d_btn.setAttribute("disabled",true);
          if (this.countdown == 0) {
            this.resetBtn();
          } else{
            this.sendMessage = true;
            this.countdown--;
            setTimeout(this.startCount, 1000);
          }
        }
      },
      // 验证成功，重置所有
      init (){
        this.phoneNum= null;
        this.verifyCode= null;
        this.resetBtn();
      },
      // 点击获取验证码时，校验手机号
      sendVerify () {
        if (!this.sendMessage) {
          if (!this.phoneNum || !this.phoneNum.match(
              /^(0|86|17951)?(13[0-9]|15[012356789]|17[6780]|18[0-9]|14[57])[0-9]{8}$/)) {
            toastr.warning('请输入合法的手机号');
            return false;
          }else{
            this.countdown = 60;
            this.runCount = true;
            this.sendMessage = true;
            this.sendVcode(this.phoneNum);
            this.startCount();
          }
        }
      },
      // 点击登录时，校验手机号和验证码
      confirmPhone () {
        if (!this.phoneNum || !this.phoneNum.match(
            /^(0|86|17951)?(13[0-9]|15[012356789]|17[6780]|18[0-9]|14[57])[0-9]{8}$/)) {
          toastr.warning('请输入有效手机号');
          return false;
        }
        if (!this.verifyCode) {
          toastr.warning('请输入验证码');
          return false;
        }
        var params = {
          phoneNum: this.phoneNum,
          checkCode: this.verifyCode,
        }
        this.sended(params);
      },
      // 发送验证码
      sendVcode (phoneNum){
        var that = this;
        axios.get('http://120.27.198.97:8081/flower/w/cashUser/sendMsg?phoneNum='+ phoneNum)
          .then( data => {
            console.warn(data);
            if(data.data == 'error') {
              toastr.warning("验证码发送失败!");
              that.resetBtn();
            }
            if(data.data == 'success') {
              toastr.success("验证码发送成功");
            }
          })
          .catch( err => {
            toastr.warning("验证码发送失败!");
            that.resetBtn();
          });
      },
      // 验证码校验
      sended (params) {
        var that = this;
        that.$refs.ensure_btn.setAttribute("disabled",true);
        axios.get(
          `http://120.27.198.97:8081/flower/w/cashUser/checkMsg?phoneNum=${params.phoneNum}&checkCode=${that.verifyCode}`.trim())
          .then( data => {
            console.warn(data);
            if(data.data.status == 0 ) {
              toastr.warning("验证码错误!");
              that.resetBtn();
            }
            if(data.data.status == 1 ) {
              toastr.success("验证成功！");
              that.init();
              that.user_info = JSON.parse(data.data.loanUser);
              that.setCookie(data.data);
              //跳转
              that.jumpUrl(localStorage.sessionid);
            }
            that.$refs.ensure_btn.removeAttribute("disabled");
            that.$refs.ensure_btn.style.background = "#bdaa73";
          })
          .catch( err => {
            toastr.warning("验证码错误!");
            that.resetBtn();
            that.$refs.ensure_btn.removeAttribute("disabled");
            that.$refs.ensure_btn.style.background = "#bdaa73";
          });
      },
      //验证成功后设置localStorage
      setCookie (data){
          localStorage.login = true;
          /*localStorage.user_info = data.loanUser; 不再用localStorage保存和获取个人信息，改为从后台调用 */
          localStorage.sessionid = data.sessionid;
          localStorage.phoneNumber=JSON.parse(data.loanUser).phone_number;
          /* 设置登录时间，用于避免用户反复登录 */
          localStorage.lastLoginTime = Date.now();
      },
      //按钮重置
      resetBtn (){
        this.sendMessage= false;
        this.btn_words='重新发送';
        this.$refs.d_btn.removeAttribute("disabled");
        this.runCount = false;
        this.countdown= 60;
      },
      },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  input{
    background-color:transparent;
    font-size: 15px;
    color: #b3b3b3;
  }
  #bottom{
    max-width:640px;
    text-align: center;
    background:url('~static/login_bg.jpg') no-repeat;
    background-size: 100% 100%;
    position:absolute;
    top:0;
    bottom:0;
    width:100%;
    height:100%;
  }
  .d-con-con{
    text-align:center;
  }
  .title{
    margin:60px auto;
    height:50px;
    font-size: 22px;
    color: #bdaa73;
  }
  .d-con-con .user, .d-con-con .sendCode{
    box-sizing:border-box;
    margin:0 auto;
    width:325px;
    height:50px;
    border-bottom:1px solid #b2b2b2;
    margin-bottom:20px;
    padding: 10px 0;
  }
  .d-con-con .user{
    position:relative;
  }
  .d-con-con .user .d-button{
    position:absolute;
    font-size:14px;
    color:#bdaa73;
    right:20px;
    top:0;
    height:50px;
    line-height:50px;
  }
  .d-con-con .user input{
    padding:0;
    width:280px;
    box-sizing:border-box;
    height:30px;
    line-height:30px;
    border:none;
    outline:none;
  }
  .d-con-con .sendCode input{
    padding:0;
    width:280px;
    box-sizing:border-box;
    height:30px;
    line-height:30px;
    border:none;
    outline:none;
  }
  #bottom .agree{
    text-align:center;
    font-size:14px;
    color: white;
    margin-bottom:62px;
  }
  #bottom .agree img{
    width:14px;
    height:14px;
    margin-right:5px;
    vertical-align:-2px;
  }
  #bottom .regist{
    height:45px;
    width:290px;
    font-size:18px;
    color:#FFFFFF;
    line-height:45px;
    border-radius:14px;
    background:#bdaa73;
    margin: 38px auto 13px;
    text-align:center;
  }
  .service-content
    text-align  start
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
    .title1
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

