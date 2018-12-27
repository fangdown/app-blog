<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="160px">
        <sidebar />
      </el-aside>
      <el-main class="main-panel"
               ref="main">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>

</template>
<script>
  import sidebar from './sidebar.vue'
  export default {
    components: {
      sidebar
    }
  }
</script>

<style>
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
