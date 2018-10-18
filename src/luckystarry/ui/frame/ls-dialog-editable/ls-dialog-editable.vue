<style lang="less">
  .ls-dialog-editable {
    .ls-dialog-container {}
  }
</style>
<template>
  <ls-dialog class="ls-dialog-editable" :namespace="namespace" @on-open="onOpen" @on-close="onClose">
    <slot :subject="subject" :original="original" :saving="saving" :update="update" />
    <template slot="buttons" slot-scope="scope">
      <el-button type="primary" @click="save" :disabled="saving" :loading="saving">保存</el-button>
      <el-button @click="scope.close" :disabled="saving">关闭</el-button>
    </template>
  </ls-dialog>
</template>
<script>
  import { LsDialogEditable } from './ls-dialog-editable'
  export default LsDialogEditable
</script>