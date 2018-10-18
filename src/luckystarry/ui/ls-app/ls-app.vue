<style lang="less">
  @import './styles/layout.less';
  .ul-top-pop {
    list-style: none;
    margin: 0;
    padding: 5px;
  }
</style>
<template>
  <el-container class="luckystarry-ui-container">
    <el-header class="luckystarry-ui-header">
      <el-popover ref="popProfile" placement="top-start" trigger="hover">
        <ul class="ul-top-pop" v-if="isLogin">
          <li>
            <el-button type="text" @click="refreshAuth">
              <i class="fas fa-fw fa-user-shield"></i> 刷新权限
            </el-button>
          </li>
          <li>
            <el-button type="text" @click="logout">
              <i class="fas fa-fw fa-sign-out-alt"></i> 安全退出
            </el-button>
          </li>
        </ul>
        <ul class="ul-top-pop" v-else>
          <li>
            <el-button type="text" @click="login">
              <i class="fas fa-fw fa-sign-in-alt"></i> 登陆系统
            </el-button>
          </li>
        </ul>
      </el-popover>
      <span class="logo-span">
        <slot name="logo" :title="title">
          <h4>{{ title }}</h4>
        </slot>
      </span>
      <section class="section-menus">
        <el-menu router mode="horizontal" :default-active="activedPath">
          <el-menu-item v-for="menu in menus" :key="menu.Title" :index="menu.Link || menu.Path" v-if="!menu.Hidden">
            <i class="menu-icon" :class="menu.Icon"></i> {{ menu.Title }}
          </el-menu-item>
        </el-menu>
      </section>
      <section class="assistant-buttons">
        <slot name="extra-top-buttons" />
        <el-button type="text" v-popover:popProfile>
          <i class="fa fa-user"></i> {{ loginButtonText }}
        </el-button>
      </section>
    </el-header>
    <el-container>
      <el-aside width="200px" class="luckystarry-ui-aside">
        <el-menu router :default-active="activedLeaf">
          <el-menu-item v-for="menu in asides" :key="menu.Title" :index="menu.Link || menu.Path" v-if="!menu.Hidden">
            <i class="menu-icon" :class="menu.Icon"></i> {{ menu.Title }}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="luckystarry-ui-main">
        <div class="layout-content" v-loading="loading">
          <transition name="fade">
            <div class="layout-content-wrapper">
              <el-card class="breadcrumb-panel" shadow="hover">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item v-for="menu in actived" :key="menu.uuid" :to="menu.Link || menu.Path">{{ menu.Title }}</el-breadcrumb-item>
                </el-breadcrumb>
              </el-card>
              <router-view></router-view>
            </div>
          </transition>
        </div>
      </el-main>
      <slot name="extra" />
    </el-container>
  </el-container>
</template>
<script>
  import component from './ls-app'
  export default component
</script>