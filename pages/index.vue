<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        优贷管家
      </h1>
      <div class="links">
        <a href="/register" target="_blank" class="button--grey">注册</a>
        <a href="/infoFillIn" target="_blank" class="button--green">信息填写</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.container
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .title
    font-family  "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block
    font-weight: 300;
    font-size: 50px;
    color: #35495e;
    letter-spacing: 1px;
</style>
