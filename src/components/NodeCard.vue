<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  selected: {
    type: Boolean,
    required: true,
  },
  titleIconSrc: {
    type: String,
    required: true,
  },
  titleIconAlt: {
    type: String,
    required: false,
    default: "header icon",
  },
  titleText: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <div :class="['node-card-main', { 'node-selected': selected }]">
    <div class="title">
      <img :src="props.titleIconSrc" :alt="props.titleIconAlt">
      <span>{{ props.titleText }}</span>
    </div>
    <div class="description">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.node-card-main {
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 200px;
  max-height: 150px;
  background-color: white;

  >.title {
    display: flex;
    padding: 5px;
    border-bottom: 1px solid lightgray;

    >img {
      height: 25px;
      width: 25px;
      margin-right: 3px;
    }

    >span {
      margin-left: 3px;
      font-weight: bold;
    }
  }

  >.description {
    display: flex;
    padding: 10px 5px;
  }
}

.node-selected {
  outline: 3px solid black;
}
</style>