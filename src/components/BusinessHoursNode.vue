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
  <NodeCard :selected="selected" titleIconSrc="/businesshours.png" titleIconAlt="business hours icon" titleText="Business Hours">
    <span>Business Hours</span>
  </NodeCard>
  <Handle type="target" :position="Position.Bottom" />
</template>

<style scoped></style>