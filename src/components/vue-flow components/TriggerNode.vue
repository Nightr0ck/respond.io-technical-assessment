<script setup>
  import NodeCard from './NodeCard.vue';
  import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <NodeCard titleIconSrc="/trigger.png" titleIconAlt="trigger icon" titleText="Trigger">
    <span>Conversation Opened</span>
  </NodeCard>
  <Handle type="target" :position="Position.Bottom" />
</template>

<style scoped></style>