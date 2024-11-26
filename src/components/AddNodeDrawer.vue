<script setup>
import { ref, defineEmits, computed } from 'vue';
import Drawer from './Drawer.vue';
import Button from './Button.vue';

const title = ref("");
const description = ref("");
const nodeType = ref("");
const headerIconSrc = computed(() => {
  switch (nodeType.value) {
    case "businessHours":
      return "/businesshours.png";

    case "sendMessage":
      return "/message.png";

    case "addComment":
      return "/comment.png";

    default:
      return "/unknown.png";
  }
});
const emit = defineEmits(["cancel", "add"]);

function cancelClicked(pointerEvent) {
  emit('cancel', pointerEvent);
}

function addNodeClicked(pointerEvent) {
  emit('add', title.value, description.value, nodeType.value);
}

</script>

<template>
  <Drawer :headerIconSrc="headerIconSrc" v-model:title="title" v-model:description="description">
    <template #body>
      <label class="node-type-label" for="node-type">Node Type</label>
      <select class="node-type-dropdown" id="node-type" v-model="nodeType">
        <option value="businessHours">Business Hours</option>
        <option value="sendMessage">Send Message</option>
        <option value="addComment">Add Comment</option>
      </select>
    </template>
    <template #call-to-action>
      <Button type="secondary" style="margin-right: 3px;" @click="cancelClicked">Cancel</Button>
      <Button type="primary" style="margin-left: 3px;" @click="addNodeClicked">Add
        Node</Button>
    </template>
  </Drawer>
</template>

<style scoped>
.node-type-label {
  margin-right: 3px;
}

.node-type-dropdown {
  margin-left: 3px;
}
</style>