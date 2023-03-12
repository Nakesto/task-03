<template>
  <b-alert class="my-3 mx-auto bawah" :variant="variant" fade show>{{
    msg
  }}</b-alert>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },
});
</script>

<style lang="css" scoped>
.bawah {
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 0;
  width: 65%;
}
</style>
