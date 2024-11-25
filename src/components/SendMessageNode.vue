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
  <NodeCard :selected="selected" titleIconSrc="/message.png" titleIconAlt="message icon" titleText="Message">
    <div class="description">
      <span>Message:</span>
      <span class="italic">Message goes here</span>
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