<script setup>
import { defineProps } from 'vue'
import NodeCard from './NodeCard.vue';
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({
  selected: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <NodeCard :selected="selected" titleIconSrc="/trigger.png" titleIconAlt="trigger icon" titleText="Trigger">
    <span>Conversation Opened</span>
  </NodeCard>
  <Handle type="target" :position="Position.Bottom" />
</template>

<style scoped></style>