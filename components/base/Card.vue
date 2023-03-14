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
              price > special_price && special_price != ''
                ? 'visibility: visible'
                : 'visibility: hidden'
            "
            >{{ price > special_price ? price : special_price | toRp }}</del
          >
          <h3 class="text-danger mb-2 fw-bold">
            {{ special_price == "" ? price : special_price | toRp }}
          </h3>
        </div>
        <span
          class="badge"
          :class="isActive ? 'badge-success' : 'badge-danger'"
          style="height: fit-content"
          >{{ isActive ? "Active" : "Inactive" }}</span
        >
      </div>
      <p class="text-muted fw-bold" style="font-size: 12px">
        Stock: {{ stock }}
      </p>
      <div class="d-flex justify-content-between mb-3">
        <b-overlay :show="isLoading">
          <div
            class="toggle btn btn-round"
            :class="isActive ? 'btn-success' : 'btn-black'"
            style="width: 92.9062px; height: 43.7969px"
            @click="onToggle(!isActive)"
          >
            <div
              class="toggle-group"
              style="transition: all 0.5s cubic-bezier(0.29, 1.2, 0.79, 1) 0s"
              :style="
                !isActive
                  ? 'transform: translate3d(-88px, 0px, 0px)'
                  : 'transform: translate3d(0px, 0px, 0px)'
              "
            >
              <label class="btn btn-success toggle-on">Active</label
              ><label class="btn btn-black active toggle-off ml-1"
                >Inactive</label
              ><span class="toggle-handle btn btn-black"></span>
            </div>
          </div>
        </b-overlay>
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
import { computed, getCurrentInstance, ref, toRefs, watchEffect } from "vue";
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
  stock: {
    type: [String, Number],
    required: true,
  },
});
const emit = defineEmits(["show"]);
const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const $axios = $root.$axios;
const isHover = ref(false);
const { status } = toRefs(props);
const isActive = ref(false);
const isClicked = ref(false);
const onHover = () => {
  isHover.value = !isHover.value;
};
const router = getCurrentInstance().proxy.$router;
const isLoading = ref(false);
const goDetail = (path) => {
  router.push({
    name: path,
    params: {
      productId: props.idProduct,
    },
  });
};

const onToggle = async (val) => {
  isLoading.value = true;
  if (!isClicked.value) {
    const completed = await $store.dispatch("products/changeStatus", {
      axiosInstance: $axios,
      id: props.idProduct,
      val: val,
    });

    if (completed) {
      isClicked.value = true;
      isActive.value = val;
    }

    isLoading.value = false;
  }
};

watchEffect(() => {
  isActive.value = status.value;
});
</script>

<style lang="css" scoped>
h4 {
  display: -webkit-box;
  max-width: calc(100%);
  height: 3.2rem;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
