<template>
  <section class="container">
    
    <input type="file" id="upload-file" />hi
  </section>
</template>
<script type="text/ecmascript">

  export default{
    head: {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.4.2/jquery.min.js' },
/*        { src: '~node_modules/simple-uploader/dist/simple-module.js' },*/
        { src: 'https://github.com/mycolorway/simple-uploader/blob/master/dist/simple-uploader.min.js' }
      ]
    },
    data () {
      return {
        
      }
    },
    created () {
        if (process.browser) {
        var uploader = simple.uploader({
          url: 'http://120.27.198.97:8081/flower/w/youLoan/uploadApplyImage',
          'params': {
            phoneNum: 13666604580,
            product_name: '拍拍贷'
          },
        });
         
        $('#upload-file').on('change', function(e) {
          uploader.upload(this.files);
        });
    }
    },
    methods: {
      
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  
</style>
