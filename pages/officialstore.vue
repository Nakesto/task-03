<template>
  <div class="container container-full">
    <div class="page-navs bg-white">
      <div class="page-header py-3">
        <h4 class="page-title">Official Stores</h4>
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
            <NuxtLink to="/store">Official Stores</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="page-inner">
      <div class="row justify-content-end mb-4">
        <div class="input-group col-12 col-sm-8 col-md-6 col-xl-4">
          <div class="input-group-prepend">
            <span class="input-group-text bg-white">
              <i class="fa fa-search search-icon"></i>
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            aria-label="Text input with dropdown button"
            v-model="search"
            placeholder="Search Official Store"
            v-auto-focus
          />
        </div>
        <div
          class="mt-5 mt-sm-0 col-12 col-sm-4 col-md-6 col-xl-8 d-flex justify-content-end"
        >
          <span @click="onHandleCreate" class="btn btn-black text-white"
            >Create Official Store</span
          >
        </div>
      </div>
      <div class="row mt-5">
        <fragment v-if="!isLoading">
          <div
            class="col-12 col-md-6"
            v-for="val in paginatedItems"
            :key="val.id"
          >
            <CardStore
              :name="val.name"
              :followers="val.totalFollowers"
              :image="val.image"
              :brands="val.brands"
              :id="val.id"
              :key="val.id"
              @update="onHandleUpdate"
              @delete="onHandleDelete"
              @detail="onHandleDetail"
            />
          </div>
        </fragment>
        <fragment v-else>
          <div v-for="val in [0, 1, 2, 3]" :key="val" class="col-12 col-md-6">
            <SkeletonStore />
          </div>
        </fragment>

        <div
          class="d-flex flex-column align-items-center justify-content-center col-12"
          v-if="!isLoading && paginatedItems.length === 0 && search === ''"
        >
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png"
            alt="not found"
            style="width: 300px; height: 300px"
          />
          <p class="text-muted text-center fw-bold">Belum ada official store</p>
        </div>
        <div
          class="d-flex flex-column align-items-center justify-content-center col-12"
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
      </div>
      <b-pagination
        v-if="!isLoading && paginatedItems.length > 0"
        v-model="currentPage"
        :total-rows="stores.length"
        :per-page="perPage"
      />
    </div>
    <div style="position: relative">
      <Modal
        title="Official Store"
        :msg="
          section.isDelete
            ? 'Are you sure want to delete the official store?'
            : ''
        "
        v-if="isModal"
      >
        <template #icon>
          <div class="swal-icon swal-icon--error" v-if="section.isDelete">
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
          <FormStore
            @closeModal="closeModal"
            @onSubmit="onCreate"
            type="Create"
            :id="''"
            v-if="section.isCreate"
            @open="isOverlay = true"
            @close="isOverlay = false"
          />
          <FormStore
            @closeModal="closeModal"
            @onSubmit="onUpdate"
            type="Update"
            :id="activeStore.id"
            :imageVal="activeStore.image"
            :brandVal="activeStore.brands"
            :nameVal="activeStore.name"
            v-if="section.isEdit"
            @open="isOverlay = true"
            @close="isOverlay = false"
          />
          <DetailStore
            :imageVal="activeStore.image"
            :brandVal="activeStore.brands"
            :nameVal="activeStore.name"
            :followers="activeStore.totalFollowers"
            v-if="section.isDetail"
          />
          <div class="d-flex justify-content-center" v-if="section.isDelete">
            <b-overlay
              :show="isLoadingStore"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="primary"
              class="d-inline-block"
            >
              <div class="swal-button-container">
                <button
                  class="swal-button swal-button--confirm btn btn-success"
                  @click="onDelete"
                >
                  Yes, delete it!
                </button>
              </div>
            </b-overlay>
            <div class="swal-button-container">
              <button
                class="swal-button swal-button--cancel btn btn-danger"
                @click="closeModal"
              >
                Cancel
              </button>
            </div>
          </div>
        </template>
        <template #footer>
          <button
            @click="closeModal"
            class="btn btn-dark col-12 mt-4 fw-bold"
            v-if="section.isDetail"
          >
            Close
          </button>
        </template>
      </Modal>
      <Alert v-if="isSuccess" :msg="msg.success" variant="success" />
      <Alert v-if="isError" :msg="msg.error" variant="danger" />
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
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import CardStore from "../components/base/CardStore.vue";
import Modal from "../components/base/Modal.vue";
import SkeletonStore from "../components/base/SkeletonStore.vue";
import DetailStore from "../components/DetailStore.vue";
import FormStore from "../components/FormStore.vue";
import Alert from "../components/base/Alert.vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const $axios = $root.$axios;
const search = ref("");
const isLoading = ref(true);
const isSuccess = ref(false);
const isError = ref(false);
const isModal = ref(false);
const isOverlay = ref(false);
const activeId = ref("");
const activeStore = computed(() => {
  if (typeof stores.value === "undefined") {
    return [];
  }

  return stores.value.filter((val) => val.id === activeId.value)[0];
});

const section = reactive({
  isCreate: false,
  isEdit: false,
  isDetail: false,
  isDelete: false,
});
const msg = reactive({
  success: "",
  error: "",
});
const currentPage = ref(1);
const perPage = ref(8);
let searchTimeout;
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;

  return stores.value.slice(start, end).reverse();
});
const stores = computed(() => $store.getters["official/getOfficialStore"]);
const isLoadingStore = computed(() => $store.getters["official/getIsLoading"]);
const closeModal = () => {
  isModal.value = false;
};

const onCreate = async (val) => {
  const completed = await $store.dispatch("official/createOfficialStore", {
    axiosInstance: $axios,
    value: val,
  });

  if (completed) {
    msg.success = "Official Store has been created";
    setTimeout(() => {
      isSuccess.value = true;
    }, 1000);

    setTimeout(() => {
      isSuccess.value = false;
    }, 3000);
  } else {
    msg.error = "Official Store failed to create";
    setTimeout(() => {
      isError.value = true;
    }, 1000);

    setTimeout(() => {
      isError.value = false;
    }, 3000);
  }

  setTimeout(() => {
    closeModal();
  }, 600);
};

const onUpdate = async (val) => {
  const completed = await $store.dispatch("official/updateOfficialStore", {
    axiosInstance: $axios,
    value: val,
    id: activeStore.value.id,
  });

  if (completed) {
    msg.success = "Official Store has been updated";
    setTimeout(() => {
      isSuccess.value = true;
    }, 1000);

    setTimeout(() => {
      isSuccess.value = false;
    }, 3000);
  } else {
    msg.error = "Official Store failed to updated";
    setTimeout(() => {
      isError.value = true;
    }, 1000);

    setTimeout(() => {
      isError.value = false;
    }, 3000);
  }

  setTimeout(() => {
    closeModal();
  }, 600);
};

const onDelete = async () => {
  const completed = await $store.dispatch("official/deleteOfficialStore", {
    axiosInstance: $axios,
    id: activeStore.value.id,
  });

  if (completed) {
    msg.success = "Official Store has been deleted";
    setTimeout(() => {
      isSuccess.value = true;
    }, 1000);

    setTimeout(() => {
      isSuccess.value = false;
    }, 3000);
  } else {
    msg.error = "Official Store failed to deleted";
    setTimeout(() => {
      isError.value = true;
    }, 1000);

    setTimeout(() => {
      isError.value = false;
    }, 3000);
  }

  setTimeout(() => {
    closeModal();
  }, 600);
};

const onHandleCreate = () => {
  section.isCreate = true;
  section.isEdit = false;
  section.isDetail = false;
  section.isDelete = false;
  isModal.value = true;
};

const onHandleUpdate = (id) => {
  section.isEdit = true;
  section.isDetail = false;
  section.isDelete = false;
  section.isCreate = false;
  activeId.value = id;
  isModal.value = true;
};

const onHandleDelete = (id) => {
  section.isDelete = true;
  section.isDetail = false;
  section.isEdit = false;
  section.isCreate = false;
  activeId.value = id;
  isModal.value = true;
};

const onHandleDetail = (id) => {
  section.isDetail = true;
  section.isDelete = false;
  section.isEdit = false;
  section.isCreate = false;
  activeId.value = id;
  isModal.value = true;
};

watch(search, (val) => {
  clearTimeout(searchTimeout);
  currentPage.value = 1;
  isLoading.value = true;
  searchTimeout = setTimeout(async () => {
    const completed = await $store.dispatch("official/searchOfficialStore", {
      axiosInstance: $axios,
      val: val,
    });
    isLoading.value = false;
  }, 1000);
});

onMounted(async () => {
  try {
    const res = await Promise.all([
      $store.dispatch("official/fetchBrands", $axios),
      $store.dispatch("official/fetchOfficialStore", $axios),
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

<style lang="css" scoped></style>
