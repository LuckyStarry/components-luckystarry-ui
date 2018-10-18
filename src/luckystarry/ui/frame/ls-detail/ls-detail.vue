<style lang="less">
  .ls-detail {
    .ls-detail-container {
      &+.ls-detail-buttons {
        margin-top: 1em;
      }
    }
  }
</style>
<template>
  <ls-frame class="ls-detail">
    <section class="ls-detail-container">
      <slot :subject="subject" />
    </section>
    <section class="ls-detail-buttons text-right">
      <slot name="buttons" :back="back">
        <el-button @click="back">返回上一页</el-button>
      </slot>
    </section>
  </ls-frame>
</template>
<script>
  import { LsDetail } from './ls-detail'
  export default LsDetail
</script>