<style lang="less">
  @import './styles/layout.less';
  .ul-top-pop {
    list-style: none;
    margin: 0;
    padding: 5px;
  }
</style>
<template>
  <el-container>
    <el-header>
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
        <el-menu router mode="horizontal">
          <div v-for="menu in menus" :key="menu.title">
            <el-submenu :index="menu.link || menu.path" v-if="menu.children && menu.children.filter(m => !m.hidden).length && !menu.hidden">
              <template slot="title">
                <i class="menu-icon" :class="menu.icon"></i> {{ menu.title }}
              </template>
              <el-menu-item :index="child.link || child.path" v-for="child in menu.children.filter(m => !m.hidden)" :key="child.title">
                <i class="menu-icon" :class="child.icon"></i> {{ child.title }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item :index="menu.link || menu.path" v-else-if="!menu.hidden">
              <i class="menu-icon" :class="menu.icon"></i> {{ menu.title }}
            </el-menu-item>
          </div>
        </el-menu>
      </section>
      <section class="assistant-buttons">
        <slot name="extra-top-buttons" />
        <el-button type="text" v-popover:popProfile>
          <i class="fa fa-user"></i> {{ systemButtonText }}
        </el-button>
      </section>
    </el-header>
    <el-main>
      <div class="layout-content" v-loading="loading">
        <transition name="fade">
          <div class="layout-content-wrapper">
            <router-view></router-view>
          </div>
        </transition>
      </div>
    </el-main>
    <slot name="extra" />
  </el-container>
</template>
<script>
  import component from './component'
  export default component
</script>