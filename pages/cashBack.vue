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
        <div class="applyStatus2" v-show="item.status==0">
          <div class="text">申请中...</div>
        </div>
        <div class="applyStatus" v-show="item.status==1">
          <div class="text">申请成功</div>
        </div>
        <div class="applyStatus1" v-show="item.status==2">
          <div class="text">申请驳回</div>
        </div>
        <div v-if="item.status==2" class="whiteMask"></div>
      </div>
    </div>
    <div class="prompt" v-show="promptStatus">
      <div class="title">温馨提示：</div>
      <div class="text">1）在您提交返利申请后，工作人员会在24小时为您反馈申请批复结果，
        申请通过的用户，优贷管家会将返利打到您提交的支付宝账户内；
        2）请如实填写您的申请信息，如有造假嫌疑，不但会影响您的返利进度，
        更会影响您的信用状况哦；3）最终的返利金额解释权归优贷管家所有，
        如果您是第二次申请某平台的贷款产品，将不会再获得返利哦，换一个试试看吧；
        4）如您的返利申请被驳回，请重新核实您的申请信息，并再次提交返利申请，
        或者直接联系我们的客服人员。客服电话：0571-28121621
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
          <div class="item">
            <div class="alipay">支付宝</div>
            <input v-model="alipayNumber" placeholder="请输入支付宝账号" class="text"/>
          </div>
        </div>

        <div class="pic-con">
          <p>请上传您通过优贷管家申请的平台借款的证明截图，注意，只有下款成功后才可以申请返利哦。
            请上传如下款短信证明、已下款的应用截图等，我们客服会在后台根据您提交的信息进行审核。</p>
          <div class="add-pic">
            <img id="proveImg" src="../static/add_pic.png">
            <img v-if="userUpImg" v-for="(item,index) in upImgNum" class="upImg" :src='item' @click="removeImg(index)">
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
        { src: 'js/jQuery.min.js' },
        /*{ src: 'http://flowercredit.cn/static/jhcommon/js/uploader/upload.js' },
        { src: 'http://flowercredit.cn/static/jhcommon/js/uploader/jquery.ajaxfileupload.js' }*/
      ]
    },
    data () {
      return {
        userUpImg: false,
        upImgNum: [],
        promptStatus:true,
        loanStatus: false,
        loanName: '',
        loanMoney:'',
        duration:'1个月',
        cashBackList:[],
        alipayNumber:''
      }
    },
    created () {

    },
    mounted(){
      /* 每次点击上传图片按钮就清空现有的图片 */
      $("#upfile").on('click',
        function(){
          this.value = null;
          $('.upImg').remove();
      });
      this.getLoanList();
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
        if(this.loanName == '' || this.loanMoney == '' || this.duration == '' ||this.alipayNumber == ''|| this.upImgNum.length == 0 ||
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
          '&alipay=' + that.alipayNumber +
          '&status=' + 0 +
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
        var that = this;
        var files = $("#upfile").get(0).files;
        for(var i=0 ; i < files.length; ++i){
          if(i == 3){
            break;
          }else{
            (function(file) {
              var name = file.name;
              var reader = new FileReader();
              reader.onload = function(e) {
                that.upImgNum.push( e.target.result)
              }
              reader.readAsDataURL(file, "UTF-8");
              that.userUpImg = true;
            })( files[i] );
          }
        }
      },
      removeImg(index) {
          this.upImgNum.splice(index,1)
          delete $("#upfile").get(0).files[index]
          console.log($("#upfile").get(0).files)
        console.log(Object.getOwnPropertyDescriptor($("#upfile").get(0).files,index))
      },
      uploadImg() {
        var fd = new FormData();
        var imgLen = $("#upfile").get(0).files.length;
        var file = ['img1','img2','img3'];
        var that = this;
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
              that.getLoanList();
              that.loanStatus = false;
            }else if(rs.code == 0){
              toastr.warning(rs.data);
            }
          }
        });
      },
      getLoanList(){
        var that = this;
        axios.get('http://120.27.198.97:8081/flower/w/youLoan/returnLoanList?'+
          'phoneNum=' + localStorage.phoneNumber)
          .then(function (response) {
            console.log(response)
            that.cashBackList=response.data.sort(function (a,b) {
              return a.status-b.status
            })
          })
          .catch(function (error) {
            console.log(error);
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
    background-image url("../static/js.jpg")
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
            margin-bottom 5px
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
            color #B3B3B3
            margin-bottom 5px
        .applyStatus2
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
            color #BDAA73
            margin-bottom 5px
        .whiteMask
          width 100%
          height 100%
          position absolute
          background #ffffff
          opacity 0.43
          top 0
          left 0
    .prompt
      position fixed
      bottom 0
      left 0
      width 100%
      height 280px
      padding-top 30px
      padding-right 20px
      background-color rgba(0,0,0,0.26)
      color #ffffff
      text-align: justify
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
          width 170px
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
  .upImg
    width:50px;height:50px;margin-left:10px
</style>
