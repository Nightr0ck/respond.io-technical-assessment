<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { VueFlow, Panel } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import TriggerNode from './components/TriggerNode.vue';
import BusinessHoursNode from './components/BusinessHoursNode.vue';
import SendMessageNode from './components/SendMessageNode.vue';
import AddCommentNode from './components/AddCommentNode.vue';
import EdgeWithButton from './components/EdgeWithButton.vue';
import AddNodeDrawer from './components/AddNodeDrawer.vue';
import TriggerDrawer from './components/TriggerDrawer.vue';
import BusinessHoursDrawer from './components/BusinessHoursDrawer.vue';
import SendMessageDrawer from './components/SendMessageDrawer.vue';
import AddCommentDrawer from './components/AddCommentDrawer.vue';
import { usePayload } from './stores/payload'
const payload = usePayload();

const vueFlowNodes = ref([]);
const vueFlowEdges = ref([]);

const showAddNodeDrawer = ref(false);
function addNodeClicked() {
  showAddNodeDrawer.value = true;
}

function loadFromPayload() {
  vueFlowNodes.value = payload.payload.nodes;
  nextTick(vueFlowEdges.value = payload.payload.edges);
}

function addNodeDrawerCancelClicked(pointerEvent) {
  showAddNodeDrawer.value = false;
}

function addNodeDrawerAddClicked(title, description, nodeType) {
  let newNode = {
    id: crypto.randomUUID(),
    position: { x: 100, y: 100 },
    type: nodeType,
    data: { title, description },
  };

  switch (nodeType) {
    case 'businessHours':
      newNode.data.times = {
        mon: {
          from: '09:00',
          to: '17:00',
        },
        tue: {
          from: '09:00',
          to: '17:00',
        },
        wed: {
          from: '09:00',
          to: '17:00',
        },
        thu: {
          from: '09:00',
          to: '17:00',
        },
        fri: {
          from: '09:00',
          to: '17:00',
        },
        sat: {
          from: '09:00',
          to: '17:00',
        },
        sun: {
          from: '09:00',
          to: '17:00',
        },
      };
      newNode.data.timeZone = "+8";
      break;

    case 'sendMessage':
      newNode.data.attachments = [];
      break;
  }

  vueFlowNodes.value = [...vueFlowNodes.value, newNode];
  showAddNodeDrawer.value = false;
}


const selectedVueFlowNode = ref(null);
const drawerTitle = ref("");
const drawerDescription = ref("");
const drawerAttachments = ref([]);
const drawerTimes = ref(null);
const drawerTimeZone = ref("");

function onConnect({ source, target }) {
  if (vueFlowEdges.value.find(edge => edge.source === source && edge.target === target)) {
    return; // if the edge already exists, don't create another copy of it
  }

  const sourceNode = vueFlowNodes.value.find(node => node.id === source);
  const maxSourceEdges = sourceNode.type === 'businessHours' ? 2 : 1;
  const existingSourceEdges = vueFlowEdges.value.filter(edge => edge.source === source);
  if (existingSourceEdges.length >= maxSourceEdges) {
    return;
  }

  const maxTargetConnections = 1;
  if (vueFlowEdges.value.filter(edge => edge.target === target).length >= maxTargetConnections) {
    return;
  }

  let edgeDetails = {
    id: crypto.randomUUID(),
    type: 'edgeWithButton',
    source,
    target,
    animated: true,
  };

  if (sourceNode.type === 'businessHours') {
    if (existingSourceEdges.length === 0) {
      edgeDetails.label = 'Success';
    } else {
      edgeDetails.label = existingSourceEdges[0].label === 'Success' ? 'Failure' : 'Success';
    }
  }

  vueFlowEdges.value = [...vueFlowEdges.value, edgeDetails];
}

function deleteEdgeClicked(id) {
  vueFlowEdges.value = vueFlowEdges.value.filter(edge => edge.id !== id);
}

function onNodeClick({ event, node }) {
  selectedVueFlowNode.value = node;
  drawerTitle.value = node.data.title;
  drawerDescription.value = node.data.description;

  switch (node.type) {
    case 'sendMessage':
      drawerAttachments.value = node.data.attachments;
      break;

    case 'businessHours':
      drawerTimes.value = node.data.times;
      drawerTimeZone.value = node.data.timeZone;
      break;
  }
}

function onNodeDragStop({ event, node, nodes }) {
  const draggedNodeIndex = vueFlowNodes.value.findIndex(refNode => refNode.id === node.id);
  vueFlowNodes.value.splice(draggedNodeIndex, 1, node);
}

function editNodeDrawerDeleteClicked() {
  vueFlowNodes.value = vueFlowNodes.value.filter(node => node.id !== selectedVueFlowNode.value.id);
  selectedVueFlowNode.value = null;
}

function editNodeDrawerCancelClicked(pointerEvent) {
  selectedVueFlowNode.value = null;
  drawerTitle.value = "";
  drawerDescription.value = "";
  drawerAttachments.value = [];
  drawerTimeZone.value = "";
  drawerTimes.value = null;
}

function editNodeDrawerApplyClicked(pointerEvent) {
  selectedVueFlowNode.value.data.title = drawerTitle.value;
  selectedVueFlowNode.value.data.description = drawerDescription.value;

  switch (selectedVueFlowNode.value.type) {
    case 'sendMessage':
      selectedVueFlowNode.value.data.attachments = drawerAttachments.value;
      break;

    case 'businessHours':
      selectedVueFlowNode.value.data.times = drawerTimes.value;
      selectedVueFlowNode.value.data.timeZone = drawerTimeZone.value;
      break;
  }

  selectedVueFlowNode.value = null;
}


onMounted(() => {
  payload.initialise();
});

</script>

<template>
  <div class="flow-chart-main">
    <VueFlow class="vue-flow-component" :nodes="vueFlowNodes" :edges="vueFlowEdges" @connect="onConnect"
      @node-click="onNodeClick" @node-drag-stop="onNodeDragStop">
      <Background patternColor="black" />

      <Panel>
        <button @click="addNodeClicked">Add Node</button>
        <button @click="loadFromPayload">Load from Payload.json</button>
      </Panel>

      <template #node-trigger="triggerNodeProps">
        <TriggerNode :selected="triggerNodeProps.selected" :title="triggerNodeProps.data.title"
          :description="triggerNodeProps.data.description" />
      </template>

      <template #node-businessHours="businessHoursNodeProps">
        <BusinessHoursNode :selected="businessHoursNodeProps.selected" :title="businessHoursNodeProps.data.title"
          :description="businessHoursNodeProps.data.description" />
      </template>

      <template #node-sendMessage="sendMessageNodeProps">
        <SendMessageNode :selected="sendMessageNodeProps.selected" :title="sendMessageNodeProps.data.title"
          :description="sendMessageNodeProps.data.description" :attachments="sendMessageNodeProps.data.attachments" />
      </template>

      <template #node-addComment="addCommentNodeProps">
        <AddCommentNode :selected="addCommentNodeProps.selected" :title="addCommentNodeProps.data.title"
          :description="addCommentNodeProps.data.description" />
      </template>

      <template #edge-edgeWithButton="edgeWithButtonProps">
        <EdgeWithButton :id="edgeWithButtonProps.id" :sourceX="edgeWithButtonProps.sourceX"
          :sourceY="edgeWithButtonProps.sourceY" :targetX="edgeWithButtonProps.targetX"
          :targetY="edgeWithButtonProps.targetY" :sourcePosition="edgeWithButtonProps.sourcePosition"
          :targetPosition="edgeWithButtonProps.targetPosition" :label="edgeWithButtonProps.label"
          @delete="deleteEdgeClicked" />
      </template>
    </VueFlow>
  </div>

  <AddNodeDrawer v-if="showAddNodeDrawer" @cancel="addNodeDrawerCancelClicked" @add="addNodeDrawerAddClicked" />
  <TriggerDrawer v-else-if="selectedVueFlowNode?.type === 'trigger'" v-model:title="drawerTitle"
    v-model:description="drawerDescription" @cancel="editNodeDrawerCancelClicked" @apply="editNodeDrawerApplyClicked" />
  <BusinessHoursDrawer v-else-if="selectedVueFlowNode?.type === 'businessHours'" v-model:title="drawerTitle"
    v-model:description="drawerDescription" v-model:times="drawerTimes" v-model:timeZone="drawerTimeZone"
    @delete="editNodeDrawerDeleteClicked" @cancel="editNodeDrawerCancelClicked" @apply="editNodeDrawerApplyClicked" />
  <SendMessageDrawer v-else-if="selectedVueFlowNode?.type === 'sendMessage'" v-model:title="drawerTitle"
    v-model:description="drawerDescription" v-model:attachments="drawerAttachments"
    @delete="editNodeDrawerDeleteClicked" @cancel="editNodeDrawerCancelClicked" @apply="editNodeDrawerApplyClicked" />
  <AddCommentDrawer v-else-if="selectedVueFlowNode?.type === 'addComment'" v-model:title="drawerTitle"
    v-model:description="drawerDescription" @delete="editNodeDrawerDeleteClicked" @cancel="editNodeDrawerCancelClicked"
    @apply="editNodeDrawerApplyClicked" />
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
