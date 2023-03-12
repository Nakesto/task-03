<template>
  <div class="d-flex justify-content-center">
    <b-overlay
      :show="isLoading"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
      class="d-inline-block"
    >
      <div class="swal-button-container">
        <button
          class="swal-button swal-button--confirm btn btn-success"
          @click="delUser"
        >
          Yes, delete it!
        </button>
      </div>
    </b-overlay>
    <div class="swal-button-container">
      <button
        class="swal-button swal-button--cancel btn btn-danger"
        @click="emit('hideModal')"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const $axios = $root.$axios;
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["hideModal", "showAlert"]);
const isLoading = computed(() => $store.getters["regis/getIsLoading"]);

const delUser = async () => {
  const completed = await $store.dispatch("regis/deleteUser", {
    axiosInstance: $axios,
    value: props.id,
  });

  if (completed) {
    emit("showAlert", {
      isSucc: completed,
      message: "Data successfull deleted",
    });
  } else {
    emit("showAlert", {
      isSucc: completed,
      message: "Data failed deleted",
    });
  }
  emit("hideModal");
};
</script>

<style lang="scss" scoped></style>
