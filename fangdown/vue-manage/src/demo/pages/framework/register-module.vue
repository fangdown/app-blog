<template>
  <div>
    vuex模块动态注册
    <div class="title">
      思路：动态注册模块store.registerModule(name, module)
      注意点： 会自动带前缀name/,不方便mapGetters使用
      优点：子模块定义，主模块调用
    </div>
    <div class="content">
      1. 在子模块里引用registerStoreModule方法，传入模块对象module <br>
      2. 模块对象包含 state、getters、mutations、actions、modules <br>
      3. registerStoreModule方法中执行store.registerModule(name, module)<br>
      4. 使用方法，this.$store.commit(name/mutation, data) <br>
      5. 获取数据方法， this.$store.getters.name/mutation(需设置getters)<br>
    </div>
    <div>
      <fd-button @click="setNameByVuex">设置姓名</fd-button>
      {{name}}
    </div>
  </div>
</template>
<script>
  // import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        name: ''
      }
    },
    // computed: {
    //   // 使用对象展开运算符将 getter 混入 computed 对象中
    //   ...mapGetters([
    //     'demo/name',
    //     // ...
    //   ])
    // },
    mounted () {
    },
    methods: {
      setNameByVuex () {
        this.$store.commit('demo/SET_NAME', 'fangdown')
        this.name = this.$store.getters['demo/name']
      }
    }
  }
</script>
<style scoped>
  .content {
    text-align: left;
  }
</style>
