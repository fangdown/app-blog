<template>
  <div>姓名：{{name}}
    <slot />
  </div>
</template>
<script>
  export default {
    name: 'fd-custom', // 组件使用的时候用的名字
    props: {
      name: {
        type: String,
        default: ''
      }
    }
  }
</script>

