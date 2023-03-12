<template>
  <div class="container">
    <div class="page-inner">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
          <div class="row align-items-center">
            <div class="col">
              <h6 class="page-pretitle">Product Detail</h6>
              <h4 class="page-title">This is the information about product</h4>
            </div>
            <div class="col-auto">
              <NuxtLink to="/products" class="btn"
                ><i class="icon-arrow-left mr-2"></i>Products</NuxtLink
              >
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="card card-invoice">
                <div class="card-header">
                  <div class="row">
                    <div class="col-4 p-3">
                      <img
                        :src="product.product_images.url[0]"
                        :alt="product.product_name"
                        style="width: 100%; height: 100%"
                      />
                    </div>
                    <div class="col-8 py-3 px-5">
                      <p class="fw-bold mb-1">{{ product.product_sku }}</p>
                      <h2 class="fw-bold text-justify">
                        {{ product.product_name }}
                      </h2>
                      <div>
                        <del
                          class="text-muted small"
                          v-if="product.price > product.product_special_price"
                          >{{ product.price | toRp }}</del
                        >
                        <h2 class="text-danger mb-2 fw-bold">
                          {{ product.product_special_price | toRp }}
                        </h2>
                      </div>
                      <span class="badge badge-black mt-2">{{
                        product.product_category
                      }}</span>
                      <span
                        class="badge mt-2"
                        :class="
                          product.status == 1 ? 'badge-success' : 'badge-danger'
                        "
                        >{{ product.status == 1 ? "Active" : "Inactive" }}</span
                      >
                    </div>
                    <div class="col-12">
                      <h4 class="fw-bold">Description</h4>
                      <p class="text-justify">{{ product.product_desc }}</p>
                    </div>
                  </div>
                </div>
                <div class="card-body"></div>
                <div class="card-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { computed, getCurrentInstance } from "vue";

const props = defineProps({
  productId: {
    type: [String, Number],
    required: true,
  },
});
const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;

const product = computed(() => {
  const temp = $store.getters["products/getProducts"];
  if (temp != undefined) {
    return temp.filter((val) => val.product_id === props.productId)[0];
  }

  return [];
});
</script>

<style lang="scss" scoped></style>
