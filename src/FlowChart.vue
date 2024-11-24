<script setup>
import { ref, onMounted } from 'vue'

const counter = ref(0);

onMounted(() => {
  console.log("flowchart mounted");
});

</script>

<template>
  Hello World
  {{ counter }}
</template>

<style scoped>

</style>
