<script setup>
  import { ref, onMounted } from 'vue';
  import { initCity } from './enter';
  import TodoMvc from './components/vue3demo/TodoMvc.vue'
  onMounted(() => {
    // 初始化三维场景
    initCity()
  })
</script>

<template>
  <!-- <TodoMvc /> -->
  <div>
    <canvas id="webgl">浏览器不支持canvas，请切换浏览器重试</canvas>
  </div>
</template>

<style scoped>

</style>
