
<template>
    <div id="bottom">
      <div class="d-con-con dialog-container" >
        <div class="title">登录</div>
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
        <span style="color:#bdaa73">《优贷管家用户服务协议》</span>
      </div>
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
        btn_words: '获取验证码', // 验证框按钮的文字
        phoneNum: null,         // 用户输入的 手机号
        verifyCode: null,       // 用户输入的 验证码
        sendMessage: false,     // 决定显示文字还是倒计时
        countdown: 60,          // 倒计时数
        runCount: true          // 是否正在倒计时
      }
    },
    methods:{
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
                that.login = true;
                localStorage.user_info = data.data.loanUser;   //保存用户所有信息
                localStorage.login = true;
                //顺便把sessionid放入localStorage
                localStorage.sessionid = data.data.sessionid;
                window.location.href = './infoFillIn';
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
      //按钮重置
      resetBtn (){
        this.sendMessage= false;
        this.btn_words='重新发送';
        this.$refs.d_btn.removeAttribute("disabled"); 
        this.runCount = false;
        this.countdown= 60;
      }
    }
  }
</script>

<style>
input{
  background-color:transparent;
  font-size: 15px;
  color: #b3b3b3; 
}
#bottom{
  max-width:640px;
  text-align: center;
  background:url('~static/login_bg.png') no-repeat;
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
  width:50px;
  height:50px;
  font-size: 25px;
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

</style>


