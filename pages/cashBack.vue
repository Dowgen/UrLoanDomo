<template>
  <section class="container">
    <div class="add" @click="loan">
      <img width="50" height="52" src="../static/add_icon.png">
    </div>
    <div class="apply-list">
      <div class="apply-product" v-for="item in cashBackList">
        <div class="top">
          <img width="30" height="30" src="../static/main_profilephoto_icon.png"/>
          <div class="name">{{item.product_name}}</div>
        </div>
        <div class="bottom">
          <span class="money">借款金额：<span class="number">{{item.money}}</span>元</span>
          <span class="time">借款期数：<span class="number">{{item.loan_period}}</span></span>
        </div>
        <div class="applyStatus" v-show="item.status==0">
          <div class="text">申请中...</div>
        </div>
        <div class="applyStatus1" v-show="item.status==1">
          <div class="text">申请成功</div>
        </div>
      </div>
    </div>
    <div class="prompt" v-show="promptStatus">
      <div class="title">温馨提示：</div>
      <div class="text">优贷管家的返利申请是针对您申请成功之后我们平台为你的返利的直接证明，
        请按照您的实际申请内容去填写，以免遗漏返利金额，如您的申请经过我们的审核属实，
        我们会在7日之内向您的支付会员时的原渠道返相应金额。
      </div>
      <img @click="hidePrompt" width="50" height="31" src="../static/tip_arrow_down.png"/>
    </div>
    <img style="position: fixed;bottom: 0;left: 50%;margin-left: -25px" width="50" height="31" @click="showPrompt" src="../static/tip_arrow_up.png" v-show="!promptStatus">
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

        <div class="pic-con">
          <p>请上传您本人在贷款此产品时相关的证明截图(不超过3张),
            如短信证明，已提交贷款申请截图等等，我们客服后台会根据您提供的信息进行审核。</p>
          <div class="add-pic">
            <img id="proveImg" src="../static/add_pic.png">
            <input id="upfile" type="file" name="upfile" multiple="multiple" accept="image/png,image/jpg" class="accept" @change="preivewImg">
          </div>
        </div>
        <div class="submit" @click="confirmApply">
          <div>提交信息</div>
        </div>
      </div>
    </transition>
  </section>
</template>
<script type="text/ecmascript">
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
  export default{
    head: {
      script: [
        { src: 'http://flowercredit.cn/static/jhcommon/js/jQuery.min.js' },
        /*{ src: 'http://flowercredit.cn/static/jhcommon/js/uploader/upload.js' },
        { src: 'http://flowercredit.cn/static/jhcommon/js/uploader/jquery.ajaxfileupload.js' }*/
      ]
    },
    data () {
      return {
        promptStatus:true,
        loanStatus: false,
        loanName: '',
        loanMoney:'',
        duration:'1个月',
        cashBackList:[]
      }
    },
    created () {

    },
    mounted(){
      var that = this;
      /* 每次点击上传图片按钮就清空现有的图片 */
      $("#upfile").on('click',
        function(){
          this.value = null;
          $('.upImg').remove();
      })
      axios.get('http://120.27.198.97:8081/flower/w/youLoan/returnLoanList?'+
        'phoneNum=' + localStorage.phoneNumber)
        .then(function (response) {
          that.cashBackList=response.data
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      loan () {
        this.loanStatus = true;
      },
      hidePrompt() {
        this.promptStatus=false;
      },
      showPrompt() {
        this.promptStatus=true;
      },
      confirmApply() {
        if(this.loanName == '' || this.loanMoney == '' || this.duration == '' ||
           $("#upfile").get(0).files.length == 0 ){
          toastr.warning('请先填写全部产品信息!');
        }else{
          var cf = confirm('一旦提交无法更改，是否确认提交')
          if( cf ){
            this.submitApply();
          }else{
            /* nothing */
          }
        }
      },
      submitApply() {
        var that = this;
        axios.get('http://120.27.198.97:8081/flower/w/youLoan/insertReturnProduct?'+
          'product_name=' + that.loanName +
          '&money=' + that.loanMoney +
          '&loan_period=' + that.duration +
          '&phoneNum=' + localStorage.phoneNumber
          )
          .then(function (rs) {
            console.log(rs);
            if(rs.data.code == 0){
              toastr.warning('用户重复添加产品!');
            }else if(rs.data.code == 1){
              /* 保存产品后再保存图片 */
              that.uploadImg();
            }
          })
          .catch(function (error) {
            toastr.warning('信息保存失败，请重试!');
          });
      },
      preivewImg() {
        /* 用fileReader实现图片预览 */
        var files = $("#upfile").get(0).files;
        for(var i=0 ; i < files.length; ++i){
          if(i == 3){
            break;
          }else{
            (function(file) {
              var name = file.name;
              var reader = new FileReader();  
              reader.onload = function(e) {  
                  $('#proveImg').after(`<img class="upImg" 
                    style="width:50px;height:50px;margin-left:10px" 
                    src='${e.target.result}'>`) 
              }
              reader.readAsDataURL(file, "UTF-8");
            })( files[i] );
          }
        }
      },
      uploadImg() {
        var fd = new FormData();
        var imgLen = $("#upfile").get(0).files.length;
        var file = ['img1','img2','img3'];

        fd.append("upload", 1);
        fd.append('product_name', this.loanName);
        fd.append('phoneNum', localStorage.phoneNumber);
        for (let i = 0; i < imgLen; ++i){
          if(i === 3) break;
          fd.append(file[i], $("#upfile").get(0).files[i]);
        };

        $.ajax({
          url: "http://120.27.198.97:8081/flower/w/youLoan/uploadApplyImage",
          type: "POST",
          processData: false,
          contentType: false,
          data: fd,
          success: function(rs) {
            if(rs.code == 1){
              toastr.success("返利申请成功！");            
            }else if(rs.code == 0){
              toastr.warning(rs.data);
            }
          }
        });
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    position relative
    width 100%
    min-height 100vh
    height 100%
    background-image url("../static/js.png")
    background-attachment: fixed
    padding-top 14px
    .add
      display flex
      justify-content center
      align-items center
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
        position relative
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
        .applyStatus
          position absolute
          display flex
          align-items center
          justify-content center
          right -3px
          top 18px
          width 70px
          height 23px
          background url("../static/applying_bg.png")
          background-size contain
          background-repeat no-repeat
          .text
            font-size 12px
            color #F5F5F5
            margin-bottom 4px
        .applyStatus1
          position absolute
          display flex
          align-items center
          justify-content center
          right -3px
          top 18px
          width 70px
          height 23px
          background url("../static/applyed_bg .png")
          background-size contain
          background-repeat no-repeat
          .text
            font-size 12px
            color #F5F5F5
            margin-bottom 4px
    .prompt
      position fixed
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
      img
        position absolute
        top -5px
        left 50%
        margin-left -25px
    .loan-content
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      background-color #f5f5f5
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
      background white
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
          vertical-align middle
          text-transform none
          outline 0
          border none
          font-size 13px
          appearance none
          -moz-appearance none
          -webkit-appearance none
          padding-right 8px
          background url(../static/arrow_down.png) no-repeat scroll right center transparent
          margin-right 2px
    .pic-con
      width 100%
      padding 10px 16px
      background white
      margin-top 20px
      height 150px
      p
      font-size 13px
      color #828389
      .add-pic
        position relative
        margin-top 15px
        display flex
        align-items center
        img
          width 50px
          height 50px
        #upfile
          position: absolute;
          left: 0;
          height: 50px;
          width: 50px;
          opacity: 0;
    .submit
      width 100%
      display flex
      justify-content center
      align-items center
      position absolute
      bottom 0
      background white
      height 60px
      div
        height 40px
        width 95%
        background #bdaa73
        color white
        font-size 13px
        text-align center
        line-height 40px
        border-radius 5px
</style>
