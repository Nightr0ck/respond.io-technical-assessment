<script setup>
  import NodeCard from './NodeCard.vue';
  import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <Handle type="source" :position="Position.Top" />
  <NodeCard headerIconSrc="/message.png" headerIronAlt="message icon" headerText="Message" bodyText="Message"/>
  <Handle type="target" :position="Position.Bottom" />
</template>

<style scoped></style>