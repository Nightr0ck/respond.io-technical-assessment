<script setup>
import NodeCard from './NodeCard.vue';
import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <Handle type="source" :position="Position.Top" />
  <NodeCard titleIconSrc="/businesshours.png" titleIconAlt="business hours icon" titleText="Business Hours">
    <span>Business Hours</span>
  </NodeCard>
  <Handle type="target" :position="Position.Bottom" />
</template>

<style scoped></style>