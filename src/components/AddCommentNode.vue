<script setup>
import NodeCard from './NodeCard.vue';
import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <Handle type="source" :position="Position.Top" />
  <NodeCard titleIconSrc="/comment.png" titleIconAlt="comment icon" titleText="Add Comment">
    <span>Comment here</span>
  </NodeCard>
  <Handle type="target" :position="Position.Bottom" />
</template>

<style scoped></style>