<script setup>
  import NodeCard from './NodeCard.vue';
  import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <NodeCard headerIconSrc="/trigger.png" headerIronAlt="trigger icon" headerText="Trigger" bodyText="Convo started"/>
  <Handle type="target" :position="Position.Bottom" />
</template>

<style scoped></style>