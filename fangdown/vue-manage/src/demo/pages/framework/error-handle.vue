<template>
  <div>
    <div class="title">日志采集方式</div>
    <div class="content">
      1. 使用Vue.config.errorHandler函数采集错误信息<br>
      2. 将信息提交到后台存储<br>
      3. 将该函数install，通过Vue.use()的方式应用到全局<br>
      <p>
        <fd-button @click="doError">发生错误，点击采集</fd-button>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      doError () {
        const obj = {}
        obj.name.sex = 'man'
      }
    }
  }
</script>

