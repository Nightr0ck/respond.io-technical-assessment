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
    data: { title: 'Add Comment', description: 'Comment here' },
  },
  {
    id: '2',
    type: 'sendMessage',
    position: { x: 100, y: 100 },
    data: { title: 'Send Message', description: 'Sending this message' },
  },
  {
    id: '3',
    type: 'trigger',
    position: { x: 400, y: 200 },
    data: { title: 'Trigger', description: 'Trigger on certain conditions' },
  },
  {
    id: '4',
    type: 'businessHours',
    position: { x: 500, y: 200 },
    data: { title: 'Business Hours', description: 'it is business hours my dude' },
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

const title = ref("");
const description = ref("");

const attachments = ref(["https://fastly.picsum.photos/id/396/536/354.jpg?hmac=GmUosOuXb6nGkFhmTE-83i0ciQcaleMyvIyqzeFbW58"]);

const { addEdges } = useVueFlow();

function onConnect(connection) {
  console.log("on connect", connection);
  addEdges(connection);
}

function onNodeClick({ event, node }) {
  selectedVueFlowNode.value = node;
  title.value = node.data.title;
  description.value = node.data.description;
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
        <TriggerNode :selected="triggerNodeProps.selected" :title="triggerNodeProps.data.title" :description="triggerNodeProps.data.description" />
      </template>

      <template #node-businessHours="businessHoursNodeProps">
        <BusinessHoursNode :selected="businessHoursNodeProps.selected" :title="businessHoursNodeProps.data.title" :description="businessHoursNodeProps.data.description" />
      </template>

      <template #node-sendMessage="sendMessageNodeProps">
        <SendMessageNode :selected="sendMessageNodeProps.selected" :title="sendMessageNodeProps.data.title" :description="sendMessageNodeProps.data.description" />
      </template>

      <template #node-addComment="addCommentNodeProps">
        <AddCommentNode :selected="addCommentNodeProps.selected" :title="addCommentNodeProps.data.title" :description="addCommentNodeProps.data.description" />
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
