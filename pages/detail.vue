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
                          v-if="
                            product.price > product.product_special_price &&
                            product.product_special_price !== null
                          "
                          >{{ product.price | toRp }}</del
                        >
                        <h2 class="text-danger mb-2 fw-bold">
                          {{
                            product.product_special_price == null
                              ? product.price
                              : product.product_special_price | toRp
                          }}
                        </h2>
                      </div>
                      <div class="d-flex justify-content-between">
                        <div>
                          <span class="badge badge-black mt-2">{{
                            product.product_category
                          }}</span>
                          <span
                            class="badge mt-2"
                            :class="
                              product.status == 1
                                ? 'badge-success'
                                : 'badge-danger'
                            "
                            >{{
                              product.status == 1 ? "Active" : "Inactive"
                            }}</span
                          >
                        </div>
                        <p></p>
                      </div>
                    </div>
                    <p
                      v-if="
                        product.product_special_price_from !== '' &&
                        product.product_special_price_from !== null
                      "
                      class="text-muted fw-bold col-12 mb-1"
                    >
                      Promo Special Price from :
                      <span>{{ product.product_special_price_from }}</span>
                    </p>
                    <p
                      v-if="
                        product.product_special_price_to !== '' &&
                        product.product_special_price_to !== null
                      "
                      class="text-muted col-12 mb-3 fw-bold"
                    >
                      Promo Special Price to :
                      <span>{{ product.product_special_price_to }}</span>
                    </p>
                    <p
                      class="col-12 col-xl-4 justify-content-center mb-2 fw-bold"
                    >
                      Pickup Avaibility
                      <span
                        class="badge ml-2"
                        :class="
                          product.product_pickup_availability == 1
                            ? 'badge-success'
                            : 'badge-danger'
                        "
                        >{{
                          product.product_pickup_availability == 1
                            ? "Yes"
                            : "No"
                        }}</span
                      >
                    </p>
                    <p
                      class="col-12 col-xl-4 justify-content-center mb-2 fw-bold"
                    >
                      Alfa Product
                      <span
                        class="badge ml-2"
                        :class="
                          product.is_alfa_product == 1
                            ? 'badge-success'
                            : 'badge-danger'
                        "
                        >{{ product.is_alfa_product == 1 ? "Yes" : "No" }}</span
                      >
                    </p>
                    <p
                      class="col-12 col-xl-4 justify-content-center mb-2 fw-bold"
                    >
                      Alfagift Platform
                      <span
                        class="badge ml-2"
                        :class="
                          product.alfagift_platform
                            ? 'badge-success'
                            : 'badge-danger'
                        "
                        >{{ product.alfagift_platform ? "Yes" : "No" }}</span
                      >
                    </p>
                    <p class="col-12 col-xl-4 fw-bold">
                      Groceries
                      <span
                        class="badge ml-2"
                        :class="
                          product.product_is_groceries
                            ? 'badge-success'
                            : 'badge-danger'
                        "
                        >{{ product.product_is_groceries ? "Yes" : "No" }}</span
                      >
                    </p>
                    <div class="col-12 mt-4">
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
    return temp.filter((val) => val.id === props.productId)[0];
  }

  return [];
});
</script>

<style lang="scss" scoped></style>
