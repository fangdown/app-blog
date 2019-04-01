<template>
  <div>
    <span @click="sendData">{{data.name}}</span>
    <slot name="button"></slot>
  </div>
</template>
<script>
export default {
  props:{
    data:{
      type:Object,
      default: {}
    }
  },
  methods:{
    sendData(){
      this.$emit('getChildData', '发数据给父组件')
    }
  }
}
</script>

