<script setup>
import { defineProps } from 'vue';
import NodeCard from './NodeCard.vue';
import { Handle, Position } from '@vue-flow/core';

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
  <Handle type="source" :position="Position.Top" />
  <NodeCard :selected="selected" titleIconSrc="/businesshours.png" titleIconAlt="business hours icon"
    :titleText="title">
    <span>{{ description }}</span>
  </NodeCard>
  <Handle type="target" :position="Position.Bottom" />
</template>

<style scoped></style>