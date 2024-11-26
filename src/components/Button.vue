<script setup>
import { defineProps, computed, defineEmits } from 'vue'

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

const emit = defineEmits(["click"]);

function buttonClicked(pointerEvent) {
  emit("click", pointerEvent);
}
</script>

<template>
  <button :class="buttonClass" @click="buttonClicked">
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
  cursor: pointer;
}

button:focus {
  outline: 3px solid gray
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