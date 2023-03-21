<template>
  <div class="card card-post card-round">
    <b-img :src="img" fluid aspect="16/9" class="card-img-top" />
    <div class="card-body">
      <h3 class="card-title fw-bold">{{ name }}</h3>
      <p class="card-text text-muted mt-2 fw-bold">
        <span class="fw-bold">Periode:</span>
        <span style="color: black" class="fw-bold">
          {{ startDate | convertDate }}
        </span>
        sampai
        <span style="color: black" class="fw-bold">
          {{ startDate | convertDate }}
        </span>
      </p>
      <div class="d-flex justify-content-between">
        <div style="flex: 1"></div>
        <div class="mr-4">
          <button
            type="button"
            class="btn btn-icon btn-round btn-warning"
            @click="emit('update', id)"
          >
            <b-icon icon="pencil-square"></b-icon>
          </button>
          <button
            type="button"
            class="btn btn-icon btn-round btn-danger"
            id="delete"
            @click="emit('delete', id)"
          >
            <b-icon icon="trash-fill"></b-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update", "delete"]);
</script>

<style lang="scss" scoped></style>
