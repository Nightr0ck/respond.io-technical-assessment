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

const emit = defineEmits(["delete", "cancel", "apply"]);

function callToActionButtonClicked(eventName, pointerEvent) {
  emit(eventName, pointerEvent);
}

</script>

<template>
  <Drawer headerIconSrc="/businesshours.png" v-model:title="title" v-model:description="description">
    <template #body>
      <div class="day-row">
        <label class="day-label" for="mon-from-time">Mon</label>
        <input id="mon-from-time" type="time" title="From Time">
        <label for="mon-to-time">to</label>
        <input id="mon-to-time" type="time" title="To Time">
      </div>
      <div class="day-row">
        <label class="day-label" for="tue-from-time">Tue</label>
        <input id="tue-from-time" type="time" title="From Time">
        <label for="tue-to-time">to</label>
        <input id="tue-to-time" type="time" title="To Time">
      </div>
      <div class="day-row">
        <label class="day-label" for="wed-from-time">Wed</label>
        <input id="wed-from-time" type="time" title="From Time">
        <label for="wed-to-time">to</label>
        <input id="wed-to-time" type="time" title="To Time">
      </div>
      <div class="day-row">
        <label class="day-label" for="thu-from-time">Thu</label>
        <input id="thu-from-time" type="time" title="From Time">
        <label for="thu-to-time">to</label>
        <input id="thu-to-time" type="time" title="To Time">
      </div>
      <div class="day-row">
        <label class="day-label" for="fri-from-time">Fri</label>
        <input id="fri-from-time" type="time" title="From Time">
        <label for="fri-to-time">to</label>
        <input id="fri-to-time" type="time" title="To Time">
      </div>
      <div class="day-row">
        <label class="day-label" for="sat-from-time">Sat</label>
        <input id="sat-from-time" type="time" title="From Time">
        <label for="sat-to-time">to</label>
        <input id="sat-to-time" type="time" title="To Time">
      </div>
      <div class="day-row">
        <label class="day-label" for="sun-from-time">Sun</label>
        <input id="sun-from-time" type="time" title="From Time">
        <label for="sun-to-time">to</label>
        <input id="sun-to-time" type="time" title="To Time">
      </div>
      <div class="time-zone">
        <label class="time-zone-label" for="time-zone">Time Zone</label>
        <select class="time-zone-dropdown" id="time-zone">
          <option value="+0">(GMT +00:00) UTC</option>
          <option value="+8">(GMT +08:00) MYT</option>
        </select>
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
.day-row {
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  >.day-label {
    flex: 0.5;
    font-weight: bold;
  }
}

.time-zone {
  padding: 0 8px;
  display: flex;
  flex-direction: row;

  > .time-zone-label {
    font-weight: bold;
    margin-right: 3px;
  }

  > .time-zone-dropdown {
    flex: 1;
    margin-left: 3px;
  }

}
</style>