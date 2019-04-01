<template>
  <child :data="data" @getData="getChildData">
    <button slot="button"></button>
  </child>
</template>

<script>
import child from './vueChild.vue'
export default {
  components:{
    child
  },
  methods: {
    getChildData(data){
      console.log('data', data)
    }
  }
}
</script>
