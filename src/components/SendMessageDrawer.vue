<script setup>
import { defineModel, computed, defineEmits } from 'vue';
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
const attachments = defineModel("attachments", {
  type: Array,
  required: true,
});
const groupedAttachments = computed(() => {
  if (attachments.value.length === 0) {
    return [];
  }

  let grouped = [];
  const attachmentsList = [...attachments.value, "fileinput"];

  // group into sub-arrays with 3 items each
  attachmentsList.forEach((attachment, index) => {
    if (index % 3 === 0) {
      grouped.push([attachment]);
    } else {
      grouped[Math.floor(index / 3)].push(attachment);
    }
  });

  // if the last array in grouped doesn't have 3 elements, push enough nulls to fill it up until it has 3 items
  grouped.at(-1).push(...Array.from({ length: 3 - grouped.at(-1).length }, () => null));
  return grouped;
});

function fileInputChanged(event) {
  const fileList = event.target.files;
  if (fileList.length === 0) {
    return;
  }

  const blobURL = URL.createObjectURL(fileList[0]); // the multiple attribute isn't set on the file input, should only have one file
  attachments.value = [...attachments.value, blobURL];
}

const emit = defineEmits(["delete", "cancel", "apply"]);

function callToActionButtonClicked(eventName, pointerEvent) {
  emit(eventName, pointerEvent);
}

</script>

<template>
  <Drawer headerIconSrc="/message.png" v-model:title="title" v-model:description="description">
    <template #body>
      <div class="label">
        <span>Attachments</span>
      </div>
      <div v-for="group of groupedAttachments" class="tile-row">
        <div v-for="attachment of group" class="tile">
          <div v-if="attachment === 'fileinput'" class="add-attachment" title="Add Attachment">
            <input type="file" accept=".jpg, .jpeg, .png" @change="fileInputChanged">
            <div class="plus">
              <span>+</span>
            </div>
          </div>
          <img v-else-if="attachment !== null" :src="attachment" class="attachment-preview">
          <div v-else class="tile"></div>
        </div>
      </div>
    </template>
    <template #call-to-action>
      <Button type="destructive" style="margin-right: 3px;" @click="callToActionButtonClicked('delete', $event)">Delete</Button>
      <Button type="secondary" style="margin: 0 3px;" @click="callToActionButtonClicked('cancel', $event)">Cancel</Button>
      <Button type="primary" style="margin-left: 3px;" @click="callToActionButtonClicked('apply', $event)">Apply Changes</Button>
    </template>
  </Drawer>
</template>

<style scoped>
.label {
  margin-bottom: 5px;
}

.tile-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  >.tile {
    height: 100px;
    width: 100px;

    >.add-attachment {
      height: 84px;
      width: 84px;
      border: 8px dashed gray;
      cursor: pointer;

      >input {
        position: absolute;
        height: 84px;
        width: 84px;
        opacity: 0;
        cursor: pointer;
      }

      >.plus {
        margin-top: -37px;
        text-align: center;
        font-size: 100px;
        color: gray;
        cursor: default;
      }
    }

    >.attachment-preview {
      height: 100px;
      width: 100px;
    }
  }
}
</style>