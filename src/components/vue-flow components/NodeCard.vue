<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  headerIconSrc: {
    type: String,
    required: true,
  },
  headerIronAlt: {
    type: String,
    required: false,
    default: "header icon",
  },
  headerText: {
    type: String,
    required: true,
  },
  bodyText: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <div class="node-card-main">
    <div class="header">
      <img :src="props.headerIconSrc" :alt="props.headerIronAlt">
      <span>{{ props.headerText }}</span>
    </div>
    <div class="body">
      <span>{{ props.bodyText }}</span>
    </div>
  </div>
</template>

<style scoped>

.node-card-main {
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 200px;
  max-height: 150px;
  background-color: white;

  > .header {
    display: flex;
    padding: 5px;
    border-bottom: 1px solid lightgray;

    > img {
      height: 25px;
      width: 25px;
    }

    > span {
      font-weight: bold;
    }
  }

  > .body {
    display: flex;
    padding: 10px 5px;
  }
}

</style>