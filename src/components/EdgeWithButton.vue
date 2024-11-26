<script setup>
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useVueFlow } from '@vue-flow/core';
import { defineProps, computed, defineEmits } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
});

const bezierPath = computed(() => {
  return getBezierPath(props);
});

const emit = defineEmits(["delete"]);


function deleteEdge() {
  emit("delete", props.id);
}
</script>

<template>
  <BaseEdge :id="id" :path="bezierPath[0]" />
  <EdgeLabelRenderer>
    <div :style="{
      transform: `translate(-50%, -50%) translate(${bezierPath[1]}px,${bezierPath[2]}px)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }" class="label-container nodrag nopan">
      <span>{{ label }}</span>
      <button @click="deleteEdge">×</button>
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.label-container {
  position: absolute;
  pointer-events: all;

  >span {
    background-color: lightblue;
    justify-content: center;
    align-items: center;
  }

  >button {
    border-radius: 5px;
    height: 25px;
    width: 25px;
    font-size: large

  }
}
</style>