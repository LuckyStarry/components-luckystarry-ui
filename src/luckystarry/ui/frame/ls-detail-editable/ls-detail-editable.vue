<style lang="less">
  .ls-detail {
    .ls-detail-container {}
  }
</style>
<template>
  <ls-detail class="ls-detail-editable" :namespace="namespace" :key-name="keyName" @on-load="onLoad">
    <template slot-scope="scope">
      <slot :subject="scope.subject" :original="original" :saving="saving" :update="update" />
    </template>
    <template slot="buttons" slot-scope="scope">
      <slot name="buttons" :back="scope.back">
        <el-button @click="save" type="primary">保存</el-button>
        <el-button @click="scope.back">返回上一页</el-button>
      </slot>
    </template>
  </ls-detail>
</template>
<script>
  import { LsDetailEditable } from './ls-detail-editable'
  export default LsDetailEditable
</script>