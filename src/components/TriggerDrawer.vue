<script setup>
import { defineModel, defineEmits } from 'vue';
import Drawer from './Drawer.vue';
import Button from './Button.vue';

const title = defineModel("title", {
  type: String,
  required: true,
});
const description = defineModel("description", {
  type: String,
  required: true,
});
const emit = defineEmits(["cancel", "apply"]);

function callToActionButtonClicked(eventName, pointerEvent) {
  emit(eventName, pointerEvent);
}

</script>

<template>
  <Drawer headerIconSrc="/trigger.png" v-model:title="title" v-model:description="description">
    <template #call-to-action>
      <Button type="secondary" style="margin-right: 3px;"
        @click="callToActionButtonClicked('cancel', $event)">Cancel</Button>
      <Button type="primary" style="margin-left: 3px;" @click="callToActionButtonClicked('apply', $event)">Apply
        Changes</Button>
    </template>
  </Drawer>
</template>

<style scoped></style>