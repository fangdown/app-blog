<template>
  <div>列表缓存
    <fd-button>自定义按钮</fd-button>
    <fd-custom name="fang">自定义组件</fd-custom>
    <el-button type="text"
               @click="open">点击打开 Dialog</el-button>
    <test-dialog :content="content"
                 ref="test"
                 v-if="dialogVisible"
                 @close="close"></test-dialog>
  </div>
</template>
<script>
  import testDialog from './dialog.vue'
  export default {
    components: {
      testDialog
    },
    data () {
      return {
        content: '',
        dialogVisible: false
      }
    },
    methods: {
      open () {
        this.dialogVisible = true
        this.content = 'hello'
        setTimeout(() => {
          this.$refs.test.open()
        }, 0)
      },
      close () {
        this.dialogVisible = false
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => { })
      }
    }
  }
</script>

