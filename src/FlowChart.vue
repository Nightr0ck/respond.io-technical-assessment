<script setup>
import { ref, onMounted } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import TriggerNode from './components/TriggerNode.vue';
import BusinessHoursNode from './components/BusinessHoursNode.vue';
import SendMessageNode from './components/SendMessageNode.vue';
import AddCommentNode from './components/AddCommentNode.vue';
import TriggerDrawer from './components/TriggerDrawer.vue';
import BusinessHoursDrawer from './components/BusinessHoursDrawer.vue';
import SendMessageDrawer from './components/SendMessageDrawer.vue';
import AddCommentDrawer from './components/AddCommentDrawer.vue';

const vueFlowNodes = ref([
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
const selectedVueFlowNode = ref(null);
const vueFlowEdges = ref([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
    animated: true,
  }
]);

const title = ref("Business Hours");
const description = ref("Define business hours");

const attachments = ref(["https://fastly.picsum.photos/id/396/536/354.jpg?hmac=GmUosOuXb6nGkFhmTE-83i0ciQcaleMyvIyqzeFbW58"]);

const { addEdges } = useVueFlow();

function onConnect(connection) {
  console.log("on connect", connection);
  addEdges(connection);
}

function onNodeClick({ event, node }) {
  selectedVueFlowNode.value = node;
}

function drawerCancelClicked(pointerEvent) {
  selectedVueFlowNode.value = null;
}

onMounted(() => {
  console.log("flowchart mounted");
});

</script>

<template>
  <div class="flow-chart-main">
    <VueFlow class="vue-flow-component" :nodes="vueFlowNodes" :edges="vueFlowEdges" @connect="onConnect"
      @node-click="onNodeClick">
      <Background patternColor="black" />

      <template #node-trigger="triggerNodeProps">
        <TriggerNode :selected="triggerNodeProps.selected" />
      </template>

      <template #node-businessHours="businessHoursNodeProps">
        <BusinessHoursNode :selected="businessHoursNodeProps.selected" />
      </template>

      <template #node-sendMessage="sendMessageNodeProps">
        <SendMessageNode :selected="sendMessageNodeProps.selected" />
      </template>

      <template #node-addComment="addCommentNodeProps">
        <AddCommentNode :selected="addCommentNodeProps.selected" />
      </template>
    </VueFlow>
  </div>
  <TriggerDrawer v-if="selectedVueFlowNode?.type === 'trigger'" v-model:title="title" v-model:description="description"
    @cancel="drawerCancelClicked" />
  <BusinessHoursDrawer v-else-if="selectedVueFlowNode?.type === 'businessHours'" v-model:title="title"
    v-model:description="description" @cancel="drawerCancelClicked" />
  <SendMessageDrawer v-else-if="selectedVueFlowNode?.type === 'sendMessage'" v-model:title="title"
    v-model:description="description" v-model:attachments="attachments" @cancel="drawerCancelClicked" />
  <AddCommentDrawer v-else-if="selectedVueFlowNode?.type === 'addComment'" v-model:title="title"
    v-model:description="description" @cancel="drawerCancelClicked" />
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
