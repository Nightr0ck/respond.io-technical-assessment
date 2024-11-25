<script setup>
import { defineProps } from 'vue';
import NodeCard from './NodeCard.vue';
import { Handle, Position } from '@vue-flow/core';

const props = defineProps({
  selected: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <Handle type="source" :position="Position.Top" />
  <NodeCard :selected="selected" titleIconSrc="/comment.png" titleIconAlt="comment icon" titleText="Add Comment">
    <span>Comment here</span>
  </NodeCard>
  <Handle type="target" :position="Position.Bottom" />
</template>

<style scoped></style>