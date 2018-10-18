<style lang="less">
  .ls-list-editable {}
</style>
<template>
  <ls-list class="ls-list-editable" :namespace="namespace">
    <template slot="conditions" slot-scope="scope">
      <slot name="conditions" :query="scope.query" :searching="scope.searching" :refresh="scope.refresh" :search="scope.search" />
    </template>
    <template slot="buttons" slot-scope="scope">
      <slot name="buttons" :query="scope.query" :searching="scope.searching" :refresh="scope.refresh" :search="scope.search">
        <el-button type="success" @click="create" icon="fa fa-fw fa-plus" :loading="scope.searching" v-if="creatable"> 新增</el-button>
      </slot>
    </template>
    <template slot="conditions-extra" slot-scope="scope">
      <slot name="conditions-extra" :query="scope.query" :searching="scope.searching" :refresh="scope.refresh" :search="scope.search" />
    </template>
    <template slot="columns">
      <slot name="columns" :update="update" />
    </template>
    <template slot="extra">
      <slot name="extra" />
    </template>
  </ls-list>
</template>
<script>
  import { LsListEditable } from './ls-list-editable'
  export default LsListEditable
</script>