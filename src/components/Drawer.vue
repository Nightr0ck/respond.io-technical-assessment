<script setup>
import { defineProps, defineModel } from 'vue';

const props = defineProps({
  headerIconSrc: {
    type: String,
    required: true,
  },
  headerIconAlt: {
    type: String,
    required: false,
    default: "header icon",
  },
});

const title = defineModel("title", {
  type: String,
  required: true,
});
const description = defineModel("description", {
  type: String,
  required: true,
});

</script>

<template>
  <div class="drawer-main">
    <div class="header">
      <div class="header-row" style="margin-bottom: 10px;">
        <img :src="props.headerIconSrc" :alt="props.headerIconAlt">
        <input type="text" v-model="title">
      </div>
      <div class="header-row" style="margin-top: 10px;">
        <textarea rows="4" v-model="description"></textarea>
      </div>
    </div>
    <hr>
    <div class="body">
      <slot name="body"></slot>
    </div>
    <div class="call-to-action">
      <slot name="call-to-action"></slot>
    </div>
  </div>
</template>

<style scoped>
.drawer-main {
  position: absolute;
  top: 0;
  right: 0;
  height: calc(100% - 40px);
  width: 350px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;

  >.header {
    display: flex;
    flex-direction: column;

    >.header-row {
      display: flex;
      flex-direction: row;

      >img {
        margin-right: 3px;
        height: 25px;
        width: 25px;
      }

      >input {
        margin-left: 3px;
        border: 0;
        flex: 1;
        font-size: large;
        font-weight: bolder;

        &:hover {
          outline: 1px solid black;
        }
      }

      >textarea {
        border: 0;
        flex: 1;
        resize: none;

        &:hover {
          outline: 1px solid black;
        }
      }
    }
  }

  > hr {
    width: 100%;
  }

  > .body {
    flex: 1;
  }

  > .call-to-action {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>