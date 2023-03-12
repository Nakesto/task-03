<template>
  <b-button
    :id="'button-' + title + '-' + data"
    :class="classButton"
    :style="styleButton"
    :type="type"
    @click="emit('buttonClick')"
    :disabled="disable"
  >
    <b-icon :icon="icon" :font-scale="sizeIcon"></b-icon>
    <b-tooltip
      v-if="tooltip"
      :target="'button-' + title + '-' + data"
      placement="bottom"
      triggers="hover"
      >{{ title }}</b-tooltip
    >
    <slot></slot>
  </b-button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  styleButton: {
    type: String,
  },
  classButton: {
    type: String,
  },
  icon: {
    type: String,
  },
  sizeIcon: {
    type: String,
    default: "1",
  },
  disable: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  data: {
    type: [String, Number],
  },
  tooltip: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["buttonClick"]);
</script>

<style></style>
