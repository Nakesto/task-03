<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-center">
      <img :src="imageVal" :alt="nameVal" style="height: 250px; width: 250px" />
    </div>
    <h1 class="col-12 fw-bold mb-1">{{ nameVal }}</h1>
    <p class="text-muted m-0 col-12">
      <span class="fw-bold mr-2">Followers:</span>{{ followers }}
    </p>
    <h6 class="col-12 fw-bold mt-3">Brands</h6>
    <div class="col-12">
      <fragment v-for="val in brandVal" :key="val.brandid">
        <span
          class="badge mt-1 mr-2 fw-bold"
          :class="variant[Math.floor(Math.random() * 3)]"
          >{{ val.brandName }}</span
        >
      </fragment>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  imageVal: {
    type: String,
    required: true,
  },
  nameVal: {
    type: String,
    required: true,
  },
  followers: {
    type: [String, Number],
    required: true,
  },
  brandVal: {
    type: Array,
    required: true,
  },
});
const variant = ref(["badge-info", "badge-success", "badge-primary"]);
</script>

<style lang="css" scoped></style>
