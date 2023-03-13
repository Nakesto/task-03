<template>
  <div class="container container-full">
    <div class="page-navs bg-white">
      <div class="">
        <div
          class="nav nav-tabs nav-line nav-color-secondary d-flex align-items-center justify-contents-center w-100"
        >
          <a
            @click="filter = 1"
            class="nav-link active show"
            data-toggle="tab"
            href="#tab1"
            >Active Products
          </a>
          <a
            @click="filter = 0"
            class="nav-link mr-5"
            data-toggle="tab"
            href="#tab2"
            >Inactive Product</a
          >
          <div class="ml-auto">
            <NuxtLink to="/products/create" class="btn btn-secondary"
              >New Project</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="page-inner">
      <div class="row justify-content-end mb-4">
        <div class="form-group col-md-6">
          <div class="input-icon">
            <input
              type="text"
              class="form-control"
              placeholder="Search for..."
              v-model="search"
            />
            <span class="input-icon-addon">
              <i class="fa fa-search"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="row row-projects" v-if="isLoading && data?.length === 0">
        <div
          v-for="val in [0, 1, 2, 3]"
          class="col-sm-6 col-lg-4 col-xl-3"
          :key="val"
        >
          <div class="card card-post card-round">
            <b-skeleton-img
              class="card-img-top"
              style="height: 150px"
            ></b-skeleton-img>
            <div class="card-body">
              <b-skeleton animation="wave" width="35%"></b-skeleton>
              <b-skeleton
                animation="wave"
                width="90%"
                class="mt-3"
              ></b-skeleton>
              <b-skeleton animation="wave" width="30%"></b-skeleton>
              <b-skeleton
                animation="wave"
                width="28%"
                class="mt-2"
              ></b-skeleton>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row row-projects">
        <div
          v-for="(product, index) in paginatedItems"
          class="col-sm-6 col-lg-4 col-xl-3"
          :key="index"
        >
          <Card
            :img="product.product_images.url[0]"
            :productName="product.product_name"
            :price="product.price"
            :category="product.product_category"
            :idProduct="product.id"
            :status="product.status"
            :special_price="
              product.product_special_price === null
                ? ''
                : product.product_special_price
            "
            :stock="product.product_stock"
            @show="showModal"
          />
        </div>
      </div>
      <b-pagination
        v-model="currentPage"
        :total-rows="products.length"
        :per-page="perPage"
      />
    </div>
    <Modal
      v-if="isDelete"
      :title="'Delete Product'"
      :msg="'Are you sure want to delete the product?'"
    >
      <template #icon>
        <div class="swal-icon swal-icon--error">
          <div class="swal-icon--error__x-mark">
            <span
              class="swal-icon--error__line swal-icon--error__line--left"
            ></span>
            <span
              class="swal-icon--error__line swal-icon--error__line--right"
            ></span>
          </div>
        </div>
      </template>
      <template #content>
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
                @click="deleteProduct"
              >
                Yes, delete it!
              </button>
            </div>
          </b-overlay>
          <div class="swal-button-container">
            <button
              class="swal-button swal-button--cancel btn btn-danger"
              @click="isDelete = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </template>
    </Modal>
    <Alert v-if="isSuccess" msg="product success deleted" variant="success" />
    <Alert v-if="isError" msg="product failed deleted" variant="danger" />
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
  components: { Modal, Alert },
};
</script>
<script setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import Alert from "../components/base/Alert.vue";
import Card from "../components/base/Card.vue";
import Modal from "../components/base/Modal.vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const $axios = $root.$axios;
const search = ref("");
const activeId = ref("");
const isDelete = ref(false);
const isSuccess = ref(false);
const isError = ref(false);
const filter = ref(1);
const currentPage = ref(1);
const perPage = ref(8);
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return products.value.slice(start, end);
});
const data = computed(() => $store.getters["products/getProducts"]);

const products = computed(() => {
  if (data.value !== undefined) {
    if (search.value !== "") {
      return data.value.filter(
        (val) =>
          val.status == filter.value &&
          val.product_name.toUpperCase().includes(search.value.toUpperCase())
      );
    }
    return data.value.filter((val) => val.status == filter.value);
  } else {
    return [];
  }
});
const isLoading = computed(() => $store.getters["products/getIsLoading"]);

const deleteProduct = async () => {
  const completed = await $store.dispatch("products/deleteProducts", {
    axiosInstance: $axios,
    value: activeId.value,
  });

  if (completed) {
    isSuccess.value = true;
    setTimeout(() => {
      isSuccess.value = false;
    }, 4000);
  } else {
    isError.value = true;
    setTimeout(() => {
      isError.value = false;
    }, 4000);
  }

  isDelete.value = false;
};

const showModal = (id) => {
  activeId.value = id;
  isDelete.value = true;
};

onMounted(() => {
  $store.dispatch("products/fetchProducts", $axios);
});
</script>

<style lang="scss" scoped></style>
