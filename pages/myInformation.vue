<template>
  <section class="container">
    <div class="grey"></div>
    <div class="top-information">
      <div class="avatar-box">
        <div class="text">头像</div>
        <div class="right">
          <img width="70" height="70" class="avatar" :src="avatar"/>
          <input id="upfile" type="file" name="upfile" multiple="multiple" accept="image/png,image/jpg" class="accept" @change='uploadImg'>
          <img width="6" height="10" class="right-icon" src="../static/main_profile_arrow.png">
        </div>
      </div>
      <div class="nick-name-box" @click="showName">
        <div class="text">昵称</div>
        <div class="right">
          <div class="nick-name">{{message}}</div>
          <img width="6" height="10" class="right-icon" src="../static/main_profile_arrow.png">
        </div>
      </div>
      <transition name="move">
        <div class="modifyName" v-show="nameStatus">
          <div class="grey-strap"></div>
          <div class="input-Wrapper">
            <input v-model="message" placeholder="请输入您的昵称">
            <img v-if="message"  src="../static/name_delete.png" class="delete-icon" @click="clearMessage">
          </div>
          <div class="save-btn" @click="saveName">保存</div>
        </div>
      </transition>
      <div class="information-box">
        <div class="text">会籍号</div>
        <div class="content">{{userInfo.membership_number}}</div>
      </div>
      <div class="information-box">
        <div class="text">姓名</div>
        <div class="content">{{userInfo.real_name}}</div>
      </div>
      <div class="sex-box" @click="showSex">
        <div class="text">性别</div>
        <div class="right">
          <div class="sex">{{sex}}</div>
          <img width="6" height="10" class="right-icon" src="../static/main_profile_arrow.png">
        </div>
      </div>
      <transition name="move">
        <div class="modifySex" v-show="sexStatus">
          <div class="grey-strap"></div>
          <div class="sexType">
            <label for="one">男</label>
            <input type="radio" id="one" value="男" v-model="sex">
            <div class="sexBtn"></div>
            <img v-if="sex=='男'" src="../static/choice_payway.png">
          </div>
          <div class="sexType">
            <label for="two">女</label>
            <input type="radio" id="two" value="女" v-model="sex">
            <div class="sexBtn"></div>
            <img  v-if="sex=='女'" src="../static/choice_payway.png">
          </div>
          <div class="save-btn" @click="saveSex">保存</div>
        </div>
      </transition>
    </div>
    <div class="split-box">以下信息为非公开信息</div>
    <div class="bottom-information">
      <div class="information-box">
        <div class="text">身份证号</div>
        <div class="content">{{idCard}}</div>
      </div>
      <div class="information-box">
        <div class="text">手机号</div>
        <div class="content">{{userInfo.phone_number}}</div>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript">
  import axios from 'axios'
  export default{
    head: {
      script: [
        { src: 'http://flowercredit.cn/static/jhcommon/js/jQuery.min.js' }
      ]
    },
    data () {
      return {
        userInfo:{},
        nameStatus: false,
        message: "",
        sexStatus: false,
        sex:'',
        idCard: '',
        avatar:''
      }
    },
    mounted(){
      var that = this;
      axios.get('http://120.27.198.97:8081/flower/w/xhhApp/selectLoanUser?'+
        'sessionid=' + localStorage.sessionid)
        .then(function (response) {
          if(rs.data.code == '0'){
            window.location.href = './register'
          }else{
            that.userInfo=JSON.parse(response.data.data);
            that.message=that.userInfo.nickname;
            that.sex=that.userInfo.gender;
            that.idCard=that.userInfo.id_card.substr(0,4)+'*****'+that.userInfo.id_card.substr(14,4)
  //          console.log(that.userInfo);
            that.avatar='http://120.27.198.97:8081/flower'+that.userInfo.avatar
            console.log(that.avatar)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      clearMessage: function () {
        this.message = "";
      },
      showName:function(){
        this.nameStatus=true;
      },
      saveName:function () {
        this.nameStatus=false;
        var that = this;
        axios.get('http://120.27.198.97:8081/flower/w/xhhApp/updateOrSave?'+
          'nickname=' + that.message +
          '&sessionid=' + localStorage.sessionid)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      showSex:function () {
        this.sexStatus=true
      },
      saveSex:function () {
        this.sexStatus=false;
        var that = this;
        axios.get('http://120.27.198.97:8081/flower/w/xhhApp/updateOrSave?'+
          'gender=' + that.sex +
          '&sessionid=' + localStorage.sessionid)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      uploadImg() {
        var fd = new FormData();
        fd.append("upload", 1);
        fd.append('upfile', $("#upfile").get(0).files[0]);
        fd.append('sessionid', localStorage.sessionid);
        $.ajax({
          url: "http://120.27.198.97:8081/flower/w/xhhApp/uploadImage",
          type: "POST",
          processData: false,
          contentType: false,
          data: fd,
          success: function(rs) {
            $('.avatar').attr('src',"http://120.27.198.97:8081/flower"+rs.data);
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
    height 100vh
    background-color #ECEDEE
    .grey
      width 100%
      height 10px
      background-color #ECEDEE
    .top-information
      background-color #ffffff
      .avatar-box
        display flex
        justify-content space-between
        height 92px
        align-items center
        padding-right 15px
        margin-left 13px
        border-bottom 1px solid #ECEDEE
        .text
          font-size 15px
          color #212121
        .right
          display flex
          align-items center
          position: relative
          img
            margin-left 10px
            border-radius 50%
          #upfile
            position: absolute;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
      .nick-name-box
        display flex
        justify-content space-between
        height 48px
        align-items center
        padding-right 15px
        margin-left 13px
        border-bottom 1px solid #ECEDEE
        .text
          font-size 15px
          color #212121
        .right
          display flex
          align-items center
          .nick-name
            font-size 14px
            color #828389
            margin-right 11px
      .modifyName
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #f0f0f0;
        transform: translate3d(0, 0, 0)
        &.move-enter-active, &.move-leave-active
          transition: all 0.2s linear
        &.move-enter, &.move-leave-active
          transform: translate3d(100%, 0, 0)
        .grey-strap
          background-color #ECEDEE
          height 10px
        .input-Wrapper
          position: relative;
          border-bottom solid 1px #c8c7cb
          border-top solid 1px #c8c7cb
          margin-bottom 18px
          input
            box-sizing:border-box;
            width:100%;
            height:50px;
            text-indent:13px;
            border:none;
            outline: none;
            font-size 15px
            color #828389
          .delete-icon
            position: absolute;
            right: 22px;
            top: 18px;
            width: 13px;
            height: 13px;
        .save-btn
          width 60vw
          height 40px
          text-align center
          font-size 13px
          color #ffffff
          background-color #BDAA73
          border-radius 5px
          line-height 40px
          margin 0 auto
      .modifySex
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #f0f0f0;
        transform: translate3d(0, 0, 0)
        &.move-enter-active, &.move-leave-active
          transition: all 0.2s linear
        &.move-enter, &.move-leave-active
          transform: translate3d(100%, 0, 0)
        .grey-strap
          background-color #ECEDEE
          height 10px
          border-bottom 1px solid #C8C7CB
        .sexType
          display flex
          position relative
          justify-content space-between
          align-items center
          padding 0 20px
          font-size 15px
          color #212121
          height 54px
          background-color #ffffff
          border-bottom 1px solid #C8C7CB
          input
            width 20px
            height 20px
            z-index 10
            opacity 0
          .sexBtn
            z-index 5
            position absolute
            right 20px
            top 17px
            width 20px
            height 20px
            border 2px solid #bdaa73
            border-radius 50%
          img
            z-index 5
            position absolute
            right 20px
            top 17px
            width 20px
            height 20px

        .save-btn
          width 60vw
          height 40px
          text-align center
          font-size 13px
          color #ffffff
          background-color #BDAA73
          border-radius 5px
          line-height 40px
          margin 0 auto
          margin-top 13px
      .information-box
        display flex
        justify-content space-between
        height 48px
        align-items center
        padding-right 15px
        margin-left 13px
        border-bottom 1px solid #ECEDEE
        .text
          font-size 15px
          color #212121
        .content
          font-size 14px
          color #828389
      .sex-box
        display flex
        justify-content space-between
        height 48px
        align-items center
        padding-right 15px
        margin-left 13px
        .text
          font-size 15px
          color #212121
        .right
          display flex
          align-items center
          .sex
            font-size 14px
            color #828389
            margin-right 11px

    .split-box
      height 32px
      line-height 32px
      font-size 12px
      color #828389
      padding-left 13px
    .bottom-information
      background-color #ffffff
      .information-box
        display flex
        justify-content space-between
        height 48px
        align-items center
        padding-right 15px
        margin-left 13px
        border-bottom 1px solid #ECEDEE
        .text
          font-size 15px
          color #212121
        .content
          font-size 14px
          color #828389
</style>
