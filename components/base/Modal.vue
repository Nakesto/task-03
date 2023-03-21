<template>
  <div class="swal-overlay swal-overlay--show-modal" tabindex="-1">
    <div class="swal-modal" :style="styleModal">
      <slot name="icon"></slot>
      <div class="swal-title" style="">{{ title }}</div>
      <div class="swal-text text-center">{{ msg }}</div>
      <div class="swal-content text-left">
        <slot name="content"></slot>
      </div>
      <div class="swal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  styleModal: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
