<template>
  <div
    class="card card-post card-round"
    @mouseenter="onHover"
    @mouseleave="onHover"
  >
    <b-overlay :show="isHover" class="d-inline-block">
      <img
        class="card-img-top mt-3"
        height="150px"
        :src="img"
        style="object-fit: contain; object-position: center"
        alt="Card image cap"
      />
      <template #overlay>
        <div
          tabindex="-1"
          role="dialog"
          aria-modal="false"
          aria-labelledby="form-confirm-label"
          class="text-center p-3 d-flex justify-content-center align-items-center"
        >
          <button
            class="btn btn-secondary btn-border"
            @click="goDetail('detail')"
          >
            View Detail
          </button>
        </div>
      </template>
    </b-overlay>
    <div class="card-body px-4 py-2">
      <div class="separator-solid"></div>
      <p class="card-category text-info mb-1">
        <a class="fw-bold">{{ category }}</a>
      </p>
      <h4 class="mb-1 fw-bold overflow-ellipsis">{{ productName }}</h4>
      <div class="d-flex justify-content-between">
        <div>
          <del
            class="text-muted small"
            :style="
              price > special_price
                ? 'visibility: visible'
                : 'visibility: hidden'
            "
            >{{ price > special_price ? price : special_price | toRp }}</del
          >
          <h3 class="text-danger mb-2 fw-bold">{{ special_price | toRp }}</h3>
        </div>
        <span
          class="badge badge-success"
          style="height: fit-content"
          >{{
        }}</span>
      </div>
      <div class="d-flex justify-content-end mb-3">
        <div>
          <button
            @click="goDetail('update')"
            type="button"
            class="btn btn-icon btn-round btn-warning"
          >
            <b-icon icon="pencil-square"></b-icon>
          </button>
          <button
            @click="emit('show', idProduct)"
            type="button"
            class="btn btn-icon btn-round btn-danger"
          >
            <b-icon icon="trash-fill"></b-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
const props = defineProps({
  idProduct: {
    type: [String, Number],
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: [String, Number],
    required: true,
  },
  special_price: {
    type: [String, Number],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  status: {
    type: [String, Number],
    required: true,
  },
});
const emit = defineEmits(["show"]);
const isHover = ref(false);
const onHover = () => {
  isHover.value = !isHover.value;
};
const router = getCurrentInstance().proxy.$router;

const goDetail = (path) => {
  router.push({
    name: path,
    params: {
      productId: props.idProduct,
    },
  });
};
</script>

<style lang="css" scoped>
h4 {
  display: -webkit-box;
  max-width: calc(100%);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
