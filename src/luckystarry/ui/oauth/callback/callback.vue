<style lang="less" scoped>
  .ls-frame-callback {
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      text-align: center;
    }
  }
</style>
<template>
  <ls-frame class="ls-frame-callback">
    <h1>
      <i v-if="logining" class="fa fa-spinner fa-spin"></i> {{ text }}
    </h1>
    <el-button v-if="error" type="danger" @click="back">重新尝试登陆</el-button>
  </ls-frame>
</template>
<script>
  import callback from './callback'
  export default callback
</script>