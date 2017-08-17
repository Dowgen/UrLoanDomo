<template>
  <div>用于给微信回调</div>
</template>
<script>
  import axios from 'axios'
  export default {
    created (){
      /* 传参给后台 */
      if(process.browser){
        var params = window.location.search;
      }
      axios.get('http://young.flowercredit.cn:8081/flower/w/weiXin/code'+params)
      .then( rs => {
        
      })
      .catch( err => {
        console.log(err);
      });
    }
  }
</script>
<style>
    
</style>