<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    // 使用reactive创建响应式数据
    const state = reactive({
      count: 0,
      message: 'Hello Vue3!'
    });

    // 增加计数器的函数
    const increment = () => {
      state.count++;
    };

    // 返回数据和方法
    return {
      message: state.message,
      count: state.count,
      increment
    };
  }
};
</script>
