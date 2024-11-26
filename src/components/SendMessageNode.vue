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
  <NodeCard :selected="selected" titleIconSrc="/message.png" titleIconAlt="message icon" :titleText="title">
    <div class="description">
      <span>Message:</span>
      <span class="italic">{{ description }}</span>
    </div>
  </NodeCard>

  <Handle type="target" :position="Position.Bottom" />
</template>

<style scoped>
.description {
  display: flex;
  flex-direction: column;

  >.italic {
    font-style: italic
  }
}
</style>