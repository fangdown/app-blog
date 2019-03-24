<template>
  <el-dialog title="提示"
             :visible.sync="visible"
             width="30%"
             @close="close">
    <div>{{content}}</div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary"
                 @click="visible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    props: ['content', 'dialogVisible'],
    data () {
      return {
        visible: false
      }
    },
    created () {
      console.log('created')
    },
    methods: {
      open () {
        this.visible = true
      },
      close () {
        this.visible = false
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
