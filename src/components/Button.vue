<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: "primary",
  },
});

const buttonClass = computed(() => {
  if (["secondary", "destructive"].includes(props.type)) {
    return [props.type];
  } else {
    return ["primary"];
  }
});

</script>

<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  min-width: 80px;
  height: 35px;
  border: 0;
  border-radius: 5px;
  font-size: medium;
}

button.primary {
  background-color: lightblue;
}

button.secondary {
  background-color: lightgray;
}

button.destructive {
  background-color: red;
  color: white;
}
</style>