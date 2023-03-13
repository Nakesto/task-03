<template>
  <div class="container">
    <b-overlay :show="isLoading">
      <div class="page-inner">
        <div class="page-header">
          <h4 class="page-title">Create Product</h4>
          <ul class="breadcrumbs">
            <li class="nav-home">
              <a href="#">
                <i class="flaticon-home"></i>
              </a>
            </li>
            <li class="separator">
              <i class="flaticon-right-arrow"></i>
            </li>
            <li class="nav-item">
              <NuxtLink to="/products">Products</NuxtLink>
            </li>
            <li class="separator">
              <i class="flaticon-right-arrow"></i>
            </li>
            <li class="nav-item">
              <a href="#">Create Product</a>
            </li>
          </ul>
        </div>
        <div class="row">
          <div class="wizard-container wizard-round col-md-11">
            <div class="wizard-header text-center">
              <h3 class="wizard-title"><b>Register</b> Your Product</h3>
              <small
                >This information will let us know more about your
                product.</small
              >
            </div>
            <div class="wizard-body">
              <div class="row">
                <ul
                  ref="indicator"
                  class="wizard-menu nav nav-pills nav-primary"
                >
                  <li
                    v-for="(val, index) in tabs"
                    class="step"
                    style="width: 50%"
                    :key="index"
                  >
                    <a class="nav-link" style="cursor: pointer"
                      ><i class="fa fa-user mr-0"></i>{{ val.name }}</a
                    >
                  </li>
                  <div
                    class="moving-tab"
                    style="
                      transition: all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1) 0s;
                    "
                    :style="
                      active.length > 0
                        ? `width: ${
                            0.5 * indicator.clientWidth
                          }px ;transform: translate3d(${
                            active[0].position
                          }px, 0px, 0px);`
                        : ''
                    "
                  >
                    <i class="fa fa-user mr-0"></i>
                    {{ active.length > 0 ? active[0].name : "Detail" }}
                  </div>
                </ul>
              </div>
              <div class="tab-content">
                <DetailForm
                  v-if="active[0]?.name === 'Detail'"
                  @onSection="onSection"
                />
                <PriceForm
                  v-if="active[0]?.name === 'Disc & Price'"
                  @submit="onSubmit"
                  @onSection="onSection"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>
<script>
export default {
  head: {
    script: [
      {
        src: "/assets/js/core/bootstrap.min.js",
        body: true,
      },
    ],
  },
};
</script>
<script setup>
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import PriceForm from "../components/PriceForm.vue";
import DetailForm from "../components/DetailForm.vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const $axios = $root.$axios;
const router = getCurrentInstance().proxy.$router;
const inputDetail = computed(() => $store.getters["products/getInputDetail"]);
const inputPrice = computed(() => $store.getters["products/getInputPrice"]);
const isLoading = computed(() => $store.getters["products/getIsLoading"]);
const indicator = ref(null);
const activeTab = ref(0);
const observe = ref(null);
const inWidth = ref(0);
const tabs = computed(() => {
  if (indicator.value !== null) {
    return [
      {
        name: "Detail",
        position: 0,
      },
      {
        name: "Disc & Price",
        position: 0.5 * inWidth.value,
      },
    ];
  }

  return [];
});
const active = computed(() => {
  if (tabs.value !== null) {
    return tabs.value.filter(
      (val) => val.name === tabs.value[activeTab.value].name
    );
  }

  return [];
});

const onSection = (type) => {
  if (type === "prev") {
    activeTab.value = 0;
  } else {
    activeTab.value = 1;
  }
};

const onSubmit = async () => {
  const completed = await $store.dispatch("products/createProducts", {
    axiosInstance: $axios,
    value: {
      ...inputDetail.value,
      ...inputPrice.value,
      price: parseInt(inputPrice.value.price),
      product_special_price: parseInt(inputPrice.value.product_special_price),
      product_alfagift_price: parseInt(inputPrice.value.product_alfagift_price),
      product_images: {
        type: "Base Image",
        url: [inputDetail.value.product_images],
      },
      product_special_price_to:
        inputPrice.value.product_special_price_to === ""
          ? ""
          : new Date(inputPrice.value.product_special_price_to).toISOString(),
      product_special_price_from:
        inputPrice.value.product_special_price_from === ""
          ? ""
          : new Date(inputPrice.value.product_special_price_from).toISOString(),
      status: inputDetail.value.status ? 1 : 0,
      is_alfa_product: inputDetail.value.is_alfa_product ? 1 : 0,
      product_pickup_availability: inputDetail.value.product_pickup_availability
        ? 1
        : 0,
      product_is_groceries: inputDetail.value.product_is_groceries ? 1 : 0,
      product_visibility_pdp: 296,
      product_sub_category: null,
      product_stock: parseInt(inputDetail.value.product_stock),
      product_id: parseInt(inputDetail.value.product_id),
    },
  });

  if (completed) {
    router.push({ name: "products" });
  } else {
  }
};

onMounted(() => {
  observe.value = new ResizeObserver((entries) => {
    const { width } = entries[0].contentRect;
    inWidth.value = width;
  });

  observe.value.observe(indicator.value);
});

onUnmounted(() => {
  $store.commit("products/CLEAR_DATA_FORM");
  observe.value.disconnect();
});
</script>
<style scoped></style>
