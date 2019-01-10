<template>
  <el-menu default-active="1"
           class="el-menu-vertical-demo"
           :default-openeds="['1', '1-2']"
           @open="handleOpen"
           @close="handleClose">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>示例</span>
      </template>
      <el-submenu index="1-1">
        <template slot="title">基础架构</template>
        <el-menu-item index="1-1-1"
                      @click="pushRoute('/demo/base/component')">组件设计</el-menu-item>
        <el-menu-item index="1-1-2">指令设计</el-menu-item>
      </el-submenu>
      <el-submenu index="1-2">
        <template slot="title">应用架构</template>
        <el-menu-item index="1-2-1"
                      @click="pushRoute('/demo/framework/list-cache')">列表缓存</el-menu-item>
        <el-menu-item index="1-2-2"
                      @click="pushRoute('/demo/framework/canvas-table')">canvas表格</el-menu-item>
        <el-menu-item index="1-2-3">通用表单</el-menu-item>
        <el-menu-item index="1-2-4">监控字段</el-menu-item>
        <el-menu-item index="1-2-5">上下页</el-menu-item>
        <el-menu-item index="1-2-6"
                      @click="pushRoute('/demo/framework/error-handle')">错误采集</el-menu-item>
        <el-menu-item index="1-2-7"
                      @click="pushRoute('/demo/framework/http')">请求封装</el-menu-item>
        <el-menu-item index="1-2-8"
                      @click="pushRoute('/demo/framework/register-module')">动态注册vuex模块</el-menu-item>
        <el-menu-item index="1-2-9"
                      @click="pushRoute('/demo/framework/tag')">同一模块tag的使用</el-menu-item>
      </el-submenu>
      <el-submenu index="1-3">
        <template slot="title">其他</template>
        <el-menu-item index="1-3-1"
                      @click="pushRoute('/demo/system/log')">日志查看</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>
<script>
  export default {
    methods: {
      handleOpen (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        // console.log(key, keyPath)
      },
      pushRoute (path) {
        this.$router.push(path)
      }
    }
  }
</script>
<style>
  .el-submenu .el-menu-item {
    min-width: 160px;
  }
</style>
