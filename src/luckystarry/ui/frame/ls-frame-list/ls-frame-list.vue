<style lang="less">
  .ls-frame-list {
    .panel-query {
      margin-bottom: 1em;
      .conditions-panel {
        &>.el-card__body {
          padding-bottom: 0;
        }
      }
    }
    .panel-table {
      margin-bottom: 1em;
      >.el-table {
        margin-bottom: 1em;
        &+.el-pagination {
          text-align: right;
        }
      }
    }
  }
</style>
<template>
  <ls-frame class="ls-frame-list" :namespace="namespace">
    <section class="panel-query">
      <el-card class="conditions-panel">
        <el-form inline>
          <slot name="conditions" :query="query" :searching="searching" :refresh="refresh" :search="search" />
          <el-form-item>
            <input type="text" style="display: none" />
            <el-button type="primary" @click="search" icon="fa fa-fw fa-search" :loading="searching"> 查询</el-button>
            <slot name="buttons" />
          </el-form-item>
        </el-form>
        <slot name="conditions-extra" :query="query" :searching="searching" :refresh="refresh" :search="search" />
      </el-card>
    </section>
    <section class="panel-table" v-loading="searching" :element-loading-background="loadingColor">
      <el-table :data="list" stripe border ref="table" @select="select" @select-all="selectAll">
        <slot name="columns" />
      </el-table>
      <el-pagination @size-change="size => search({ pageIndex: 1, pageSize: size })" @current-change="index => search({ pageIndex: index })" :current-page="pagination.Index" :page-sizes="[5, 10, 15, 20]" :page-size="pagination.Size" layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.Total" />
    </section>
    <section class="panel-extra">
      <slot name="extra" />
    </section>
  </ls-frame>
</template>
<script>
  import { LsFrameList } from './component'
  export default LsFrameList
</script>