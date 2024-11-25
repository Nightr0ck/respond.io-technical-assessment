<script setup>
import { ref, onMounted } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import TriggerNode from './components/vue-flow components/TriggerNode.vue';
import BusinessHoursNode from './components/vue-flow components/BusinessHoursNode.vue';
import SendMessageNode from './components/vue-flow components/SendMessageNode.vue';
import AddCommentNode from './components/vue-flow components/AddCommentNode.vue';
import Drawer from './components/Drawer.vue';

const nodes = ref([
  {
    id: '1',
    type: 'addComment',
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    type: 'sendMessage',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },
  {
    id: '3',
    type: 'trigger',
    position: { x: 400, y: 200 },
    data: { label: 'Node 3' },
  },
  {
    id: '4',
    type: 'businessHours',
    position: { x: 500, y: 200 },
    data: { label: 'Node 3' },
  },
]);
const edges = ref([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
    animated: true,
  }
]);

const title = ref("Business Hours");
const description = ref("Define business hours")

const { addEdges } = useVueFlow();

function onConnect(connection) {
  console.log("on connect", connection);
  addEdges(connection);
}

onMounted(() => {
  console.log("flowchart mounted");
});

</script>

<template>
  <div class="flow-chart-main">
    <VueFlow class="vue-flow-component" :nodes="nodes" :edges="edges" @connect="onConnect">
      <Background patternColor="black" />

      <template #node-trigger="triggerNodeProps">
        <TriggerNode />
      </template>

      <template #node-businessHours="businessHoursNodeProps">
        <BusinessHoursNode />
      </template>

      <template #node-sendMessage="sendMessageNodeProps">
        <SendMessageNode />
      </template>

      <template #node-addComment="addCommentNodeProps">
        <AddCommentNode />
      </template>
    </VueFlow>
  </div>
  <Drawer headerIconSrc="/businesshours.png" v-model:title="title" v-model:description="description">

  </Drawer>
</template>

<style scoped>
.flow-chart-main {
  height: 98vh;
  width: 99vw;

  >.vue-flow-component {
    background-color: #f2f5f3;
  }
}
</style>
