<template>
  <div class="container container-full">
    <div class="page-navs bg-white">
      <div class="">
        <div
          class="nav nav-tabs nav-line nav-color-secondary d-flex align-items-center justify-contents-center w-100"
        >
          <a
            @click="changeFilter(1)"
            class="nav-link active show"
            data-toggle="tab"
            href="#tab1"
            >Active Products
          </a>
          <a
            @click="changeFilter(0)"
            class="nav-link mr-5"
            data-toggle="tab"
            href="#tab2"
            >Inactive Product</a
          >
          <div class="ml-auto">
            <NuxtLink to="/products/create" class="btn btn-secondary"
              >New Product</NuxtLink
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
              placeholder="Search Products"
              v-model="search"
              v-auto-focus
            />
            <span class="input-icon-addon">
              <i class="fa fa-search"></i>
            </span>
          </div>
        </div>
      </div>
      <div
        class="d-flex flex-column align-items-center justify-content-center"
        v-if="!isLoading && paginatedItems.length === 0 && search !== ''"
      >
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png"
          alt="not found"
          style="width: 300px; height: 300px"
        />
        <p class="text-muted text-center fw-bold">
          Product dengan keyword '{{ search }}' tidak ditemukan
        </p>
      </div>
      <div
        class="d-flex flex-column align-items-center justify-content-center"
        v-if="!isLoading && paginatedItems.length === 0 && search === ''"
      >
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png"
          alt="not found"
          style="width: 300px; height: 300px"
        />
        <p class="text-muted text-center fw-bold">
          Belum ada product, silahkan buat product
        </p>
      </div>
      <div class="row row-projects" v-if="isLoading">
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
          :key="product.id"
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
        v-if="!isLoading && paginatedItems.length > 0"
        v-model="currentPage"
        :total-rows="filterProducts.length"
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
            :show="deleteLoading"
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
  auth: true,
};
</script>
<script setup>
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";
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
let searchTimeout;
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;

  return filterProducts.value.slice(start, end);
});
const data = computed(() => $store.getters["products/getProducts"]);

const filterProducts = computed(() => {
  if (data.value !== undefined) {
    return data.value.filter((val) => val.status == filter.value).reverse();
  } else {
    return [];
  }
});

const isLoading = computed(() => $store.getters["products/getIsLoading"]);
const deleteLoading = ref(false);
const deleteProduct = async () => {
  deleteLoading.value = true;
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

  deleteLoading.value = false;
  isDelete.value = false;
};

const showModal = (id) => {
  activeId.value = id;
  isDelete.value = true;
};

const changeFilter = (val) => {
  filter.value = val;
  currentPage.value = 1;
};

watch(search, (val) => {
  clearTimeout(searchTimeout);
  currentPage.value = 1;
  $store.commit("products/SET_ISLOADING", true);
  searchTimeout = setTimeout(async () => {
    const completed = await $store.dispatch("products/searchProduct", {
      axiosInstance: $axios,
      val: val,
    });
    $store.commit("products/SET_ISLOADING", false);
  }, 1000);
});

onMounted(() => {
  $store.dispatch("products/fetchProducts", $axios);
});
</script>

<style lang="scss" scoped></style>
