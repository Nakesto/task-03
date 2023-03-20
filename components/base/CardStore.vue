<template>
  <div class="card card-post card-round overflow-hidden">
    <div class="row">
      <div class="col-12 col-sm-5 p-0 m-0">
        <img
          :src="image"
          alt=""
          height="205px"
          width="100%"
          style="object-fit: contain; object-position: center"
        />
      </div>
      <div class="col-12 col-sm-7 px-5 px-sm-4 py-3">
        <h3 class="fw-bold"><i class="fas fa-store mr-3"></i>{{ name }}</h3>
        <p class="text-muted m-0">
          <span class="fw-bold mr-2">Followers:</span>{{ followers }}
        </p>
        <div
          class="mt-1 mb-3"
          style="overflow: hidden; width: calc(90%); height: 3.6rem"
        >
          <fragment v-for="val in brands" :key="val.brandid">
            <span
              class="badge mt-1 mr-2 fw-bold"
              :class="variant[Math.floor(Math.random() * 3)]"
              >{{ val.brandName }}</span
            >
          </fragment>
        </div>
        <div class="d-flex justify-content-between">
          <button
            type="button"
            href="#"
            class="btn btn-black btn-sm px-3 fw-bold"
            @click="emit('detail', id)"
          >
            Detail
          </button>
          <div class="mr-4">
            <button
              @click="emit('update', id)"
              type="button"
              class="btn btn-icon btn-round btn-warning btn-sm"
              style="font-size: 80%"
            >
              <b-icon icon="pencil-square"></b-icon>
            </button>
            <button
              @click="emit('delete', id)"
              type="button"
              class="btn btn-icon btn-round btn-danger btn-sm"
              style="font-size: 80%"
              id="delete"
            >
              <b-icon icon="trash-fill"></b-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  followers: {
    type: [String, Number],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brands: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["update", "detail", "delete"]);
const variant = ref(["badge-info", "badge-success", "badge-primary"]);
</script>

<style lang="scss" scoped></style>
