<template>
  <div class="container">
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div
          class="d-flex align-items-left align-items-md-center flex-column flex-md-row"
        >
          <div>
            <h2 class="text-white pb-2 fw-bold">Dashboard</h2>
            <h5 class="text-white op-7 mb-2">
              Admin for Alfagift (PT GLOBAL LOYALTY INDONESIA)
            </h5>
          </div>
          <div class="ml-md-auto py-2 py-md-0">
            <NuxtLink
              to="/users"
              class="btn btn-white btn-border btn-round mr-2"
              >User</NuxtLink
            >
            <NuxtLink to="/products" class="btn btn-secondary btn-round"
              >Products</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="page-inner mt--5">
      <div class="row mt--2">
        <div class="col-md-6">
          <div class="card" v-if="isLoading">
            <div class="card-body">
              <b-skeleton width="40%"></b-skeleton>
              <b-skeleton class="mt-3" width="80%"></b-skeleton>
              <div
                class="d-flex flex-wrap justify-content-around pb-2 pt-4 col-12"
              >
                <div
                  class="px-2 pb-2 pb-md-0 d-flex flex-column align-items-center col-4"
                >
                  <b-skeleton-img
                    style="border-radius: 100%"
                    no-aspect
                    height="130px"
                  ></b-skeleton-img>
                  <b-skeleton class="mt-3" width="35%"></b-skeleton>
                </div>
                <div
                  class="px-2 pb-2 pb-md-0 d-flex flex-column align-items-center col-4"
                >
                  <b-skeleton-img
                    style="border-radius: 100%"
                    no-aspect
                    height="130px"
                  ></b-skeleton-img>
                  <b-skeleton class="mt-3" width="40%"></b-skeleton>
                </div>
                <div
                  class="px-2 pb-2 pb-md-0 d-flex flex-column align-items-center col-4"
                >
                  <b-skeleton-img
                    style="border-radius: 100%"
                    no-aspect
                    height="130px"
                  ></b-skeleton-img>
                  <b-skeleton class="mt-3" width="55%"></b-skeleton>
                </div>
              </div>
            </div>
          </div>
          <StatisticInfo
            :userLength="users.length"
            :activeProduct="activeProduct.length"
            :promoProduct="promoProduct.length"
            v-else
          />
        </div>
        <!-- TOP PRODUCTS -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="card-title fw-bold" v-if="!isLoading">
                Top Products
              </div>
              <b-skeleton v-else class="mt-3" width="35%"></b-skeleton>
            </div>
            <div
              class="card-body pb-0"
              style="height: 400px"
              :style="!isLoading ? 'overflow: auto' : 'overflow: hidden'"
            >
              <fragment
                v-for="val in salesProduct"
                :key="val.id"
                v-if="!isLoading"
              >
                <div class="d-flex" style="height: 65px">
                  <div class="avatar">
                    <img
                      :src="val.product_images.url[0]"
                      :alt="val.product_name"
                      class="avatar-img rounded-circle"
                    />
                  </div>
                  <div class="flex-1 pt-1 ml-2">
                    <h6 class="fw-bold mb-1 limit">
                      {{ val.product_name }}
                    </h6>
                    <small class="text-muted" style="">
                      {{ val.product_category }}</small
                    >
                  </div>
                  <div class="d-flex flex-column ml-auto align-items-center">
                    <h3 class="text-info fw-bold">
                      {{ val.sales_quantity }}
                    </h3>
                    <small class="text-muted">Sales</small>
                  </div>
                </div>
                <div class="separator-dashed"></div>
              </fragment>
              <fragment v-for="val in [0, 1, 2, 3]" :key="val" v-else>
                <div class="d-flex" style="height: 65px">
                  <div class="avatar">
                    <b-skeleton-img
                      style="border-radius: 100%"
                      no-aspect
                      height="60px"
                      width="65px"
                    ></b-skeleton-img>
                  </div>
                  <div class="flex-1 ml-4">
                    <b-skeleton class="mt-3" width="80%"></b-skeleton>
                    <b-skeleton class="mt-3" width="30%"></b-skeleton>
                  </div>
                  <div class="d-flex flex-column ml-auto align-items-center">
                    <b-skeleton
                      class="mt-2"
                      width="30px"
                      height="50px"
                    ></b-skeleton>
                    <b-skeleton class="mt-2" width="40px"></b-skeleton>
                  </div>
                </div>
                <div class="separator-dashed"></div>
              </fragment>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="card card-profile">
            <div
              class="card-header"
              style="background-image: url('../assets/img/blogpost.jpg')"
            >
              <div class="profile-picture">
                <div class="avatar avatar-xl">
                  <img
                    src="../assets/img/profile.jpg"
                    alt="..."
                    class="avatar-img rounded-circle"
                  />
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="user-profile text-center">
                <div class="name">{{ data.firstName }}, 19</div>
                <div class="job">Frontend Developer</div>
                <div class="desc">A man who hates loneliness</div>
                <div class="social-media">
                  <a class="btn btn-info btn-twitter btn-sm btn-link" href="#">
                    <span class="btn-label just-icon"
                      ><i class="flaticon-twitter"></i>
                    </span>
                  </a>
                  <a
                    class="btn btn-danger btn-sm btn-link"
                    rel="publisher"
                    href="#"
                  >
                    <span class="btn-label just-icon"
                      ><i class="flaticon-google-plus"></i>
                    </span>
                  </a>
                  <a
                    class="btn btn-primary btn-sm btn-link"
                    rel="publisher"
                    href="#"
                  >
                    <span class="btn-label just-icon"
                      ><i class="flaticon-facebook"></i>
                    </span>
                  </a>
                  <a
                    class="btn btn-danger btn-sm btn-link"
                    rel="publisher"
                    href="#"
                  >
                    <span class="btn-label just-icon"
                      ><i class="flaticon-dribbble"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="row user-stats text-center">
                <div class="col">
                  <div class="number">125</div>
                  <div class="title">Post</div>
                </div>
                <div class="col">
                  <div class="number">25K</div>
                  <div class="title">Followers</div>
                </div>
                <div class="col">
                  <div class="number">134</div>
                  <div class="title">Following</div>
                </div>
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
  auth: true,
};
</script>
<script setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import StatisticInfo from "../components/StatisticInfo.vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const $axios = $root.$axios;
const data = computed(() => $store.getters["regis/getData"] || {});
const users = computed(() => $store.getters["regis/getUsers"] || []);
const products = computed(() => $store.getters["products/getProducts"] || []);
const activeProduct = computed(() =>
  products.value.filter((val) => val.status === 1)
);
const promoProduct = computed(() =>
  products.value.filter(
    (val) =>
      val.product_special_price < val.price &&
      val.product_special_price !== null
  )
);
const salesProduct = computed(() => {
  let temp = products.value.slice();

  return temp.sort((a, b) => b.sales_quantity - a.sales_quantity).slice(0, 10);
});
const isLoading = ref(true);
const isError = ref(false);

onMounted(async () => {
  try {
    const res = await Promise.all([
      $store.dispatch("regis/fetchUser", $axios),
      $store.dispatch("products/fetchProducts", $axios),
    ]);
    if (!res[0] || !res[1]) {
      isError.value = true;
    }
  } catch (err) {
    console.log(err);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="css" scoped>
.limit {
  display: -webkit-box;
  max-width: calc(100%);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
h6 {
  height: 2.2 rem;
}
</style>
