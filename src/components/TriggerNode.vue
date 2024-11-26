<script setup>
import { defineProps } from 'vue'
import NodeCard from './NodeCard.vue';
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({
  selected: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NodeCard :selected="selected" titleIconSrc="/trigger.png" titleIconAlt="trigger icon" :titleText="title">
    <span>{{ description }}</span>
  </NodeCard>
  <Handle type="source" :position="Position.Bottom" />
</template>

<style scoped></style>