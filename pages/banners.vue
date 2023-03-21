<template>
  <div class="container container-full">
    <div class="page-navs bg-white">
      <div class="page-header py-3">
        <h4 class="page-title">Banners</h4>
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
            <NuxtLink to="/banners">Banners</NuxtLink>
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
            placeholder="Search Banners"
            v-auto-focus
          />
        </div>
        <div
          class="mt-5 mt-sm-0 col-12 col-sm-4 col-md-6 col-xl-8 d-flex justify-content-end"
        >
          <span @click="onHandleCreate" class="btn btn-black text-white"
            >Create Banner</span
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
            <CardBanner
              :id="val.id"
              :img="val.bannerImageFileName"
              :name="val.bannerName"
              :startDate="val.startDate"
              :endDate="val.endDate"
              @update="onHandleUpdate"
              @delete="onHandleDelete"
            />
          </div>
        </fragment>
        <fragment v-else>
          <div v-for="val in [0, 1, 2, 3]" :key="val" class="col-12 col-md-6">
            <SkeletonBanner />
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
        :total-rows="banners.length"
        :per-page="perPage"
      />
    </div>
    <Modal
      title="Banners"
      :msg="section.isDelete ? 'Are you sure want to delete the banner?' : ''"
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
        <FormBanner
          v-if="section.isCreate"
          @onSubmit="onCreate"
          type="Create"
          @closeModal="closeModal"
        />
        <FormBanner
          v-if="section.isEdit"
          @onSubmit="onUpdate"
          :nameVal="activeBanner.bannerName"
          :imageVal="activeBanner.bannerImageFileName"
          :startDateVal="activeBanner.startDate"
          :endDateVal="activeBanner.endDate"
          type="Update"
          @closeModal="closeModal"
        />
        <div class="d-flex justify-content-center" v-if="section.isDelete">
          <b-overlay
            :show="isLoadingBanner"
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
    </Modal>
    <Alert v-if="isSuccess" :msg="msg.success" variant="success" />
    <Alert v-if="isError" :msg="msg.error" variant="danger" />
  </div>
</template>

<script setup>
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import CardBanner from "../components/base/CardBanner.vue";
import Modal from "../components/base/Modal.vue";
import SkeletonBanner from "../components/base/SkeletonBanner.vue";
import FormBanner from "../components/FormBanner.vue";
import Alert from "../components/base/Alert.vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const $axios = $root.$axios;
const search = ref("");
const isLoading = ref(false);
const isSuccess = ref(false);
const isError = ref(false);
const banners = computed(() => $store.getters["banners/getBanners"]);
const isLoadingBanner = computed(() => $store.getters["banners/getIsLoading"]);
const isModal = ref(false);
const isChecking = ref(false);
const activeId = ref(0);
const activeBanner = computed(() => {
  if (typeof banners.value === "undefined") {
    return [];
  }

  return banners.value.filter((val) => val.id === activeId.value)[0];
});
const msg = reactive({
  success: "",
  error: "",
});
const currentPage = ref(1);
const perPage = ref(4);
let searchTimeout;
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  if (typeof banners.value === "undefined") {
    return [];
  }

  return banners.value.slice(start, end);
});

const section = reactive({
  isCreate: false,
  isEdit: false,
  isDelete: false,
});

const closeModal = () => {
  isModal.value = false;
};

const onHandleCreate = () => {
  section.isCreate = true;
  section.isEdit = false;
  section.isDelete = false;
  isModal.value = true;
};

const onHandleUpdate = (id) => {
  section.isEdit = true;
  section.isDelete = false;
  section.isCreate = false;
  activeId.value = id;
  isModal.value = true;
};

const onHandleDelete = (id) => {
  section.isDelete = true;
  section.isEdit = false;
  section.isCreate = false;
  activeId.value = id;
  isModal.value = true;
};

const onCreate = async (val) => {
  const completed = await $store.dispatch("banners/createBanners", {
    axiosInstance: $axios,
    value: val,
  });

  if (completed) {
    msg.success = "Banner has been created";
    setTimeout(() => {
      isSuccess.value = true;
    }, 1000);

    setTimeout(() => {
      isSuccess.value = false;
    }, 3000);
  } else {
    msg.error = "Banner failed to create";
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
  const completed = await $store.dispatch("banners/updateBanners", {
    axiosInstance: $axios,
    value: val,
    id: activeBanner.value.id,
  });

  if (completed) {
    msg.success = "Banner has been updated";
    setTimeout(() => {
      isSuccess.value = true;
    }, 1000);

    setTimeout(() => {
      isSuccess.value = false;
    }, 3000);
  } else {
    msg.error = "Banner failed to updated";
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
  const completed = await $store.dispatch("banners/deleteBanners", {
    axiosInstance: $axios,
    id: activeBanner.value.id,
  });

  if (completed) {
    msg.success = "Banner has been deleted";
    setTimeout(() => {
      isSuccess.value = true;
    }, 1000);

    setTimeout(() => {
      isSuccess.value = false;
    }, 3000);
  } else {
    msg.error = "Banner failed to deleted";
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

watch(search, (val) => {
  clearTimeout(searchTimeout);
  currentPage.value = 1;
  isLoading.value = true;
  searchTimeout = setTimeout(async () => {
    const completed = await $store.dispatch("banners/searchOfficialStore", {
      axiosInstance: $axios,
      val: val,
    });
    isLoading.value = false;
  }, 1000);
});

const fetchBanners = async () => {
  isLoading.value = true;
  const completed = await $store.dispatch("banners/fetchBanners", $axios);
  if (completed) {
    isError.value = false;
  } else {
    isError.value = true;
  }
  isLoading.value = false;
};

onMounted(() => {
  fetchBanners();
});
</script>

<style lang="css" scoped></style>
