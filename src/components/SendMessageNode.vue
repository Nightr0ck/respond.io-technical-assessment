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
  attachments: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <Handle type="target" :position="Position.Top" />
  <NodeCard :selected="selected" titleIconSrc="/message.png" titleIconAlt="message icon" :titleText="title">
    <div class="description">
      <span>Message:</span>
      <span class="italic">{{ description }}</span>
      <span class="italic">{{ attachments.length }} attachment(s)</span>
    </div>
  </NodeCard>
  <Handle type="source" :position="Position.Bottom" />
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