<style lang="less">
  .ls-dialog {
    .ls-dialog-container {}
  }
</style>
<template>
  <el-dialog class="ls-dialog" :visible="visible" @update:visible="toggle" :closeOnClickModal="false">
    <section class="ls-dialog-container">
      <slot />
    </section>
    <section class="ls-dialog-buttons text-right">
      <slot name="buttons" :close="close">
        <el-button @click="close">关闭</el-button>
      </slot>
    </section>
  </el-dialog>
</template>
<script>
  import { LsDialog } from './ls-dialog'
  export default LsDialog
</script>