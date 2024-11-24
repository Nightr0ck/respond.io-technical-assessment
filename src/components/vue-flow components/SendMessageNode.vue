<script setup>
import NodeCard from './NodeCard.vue';
import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <Handle type="source" :position="Position.Top" />
  <NodeCard titleIconSrc="/message.png" titleIconAlt="message icon" titleText="Message" bodyText="Message">
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