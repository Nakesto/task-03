<template>
  <ValidationObserver v-slot="{ invalid, validate }">
    <b-progress
      v-if="isLoading"
      :value="progress"
      variant="success"
      animated
      height="5px"
      class="mb-2"
    ></b-progress>
    <b-form class="row px-2 px-md-4" @submit.prevent="checking">
      <ValidationProvider
        class="col-12 p-0 m-0"
        rules="required"
        v-slot="{ errors }"
      >
        <Editor
          label="Name Official Store"
          v-model="name"
          name="name"
          :active="activeInput"
          :focus="true"
          :penuh="true"
          :groupClass="errors.length > 0 ? 'has-error' : ''"
          :errMsg="errors[0]"
          @onFocus="onFocus"
          @onBlur="onBlur"
        />
      </ValidationProvider>
      <ValidationProvider
        class="col-12 p-0 m-0"
        rules="required"
        v-slot="{ errors }"
      >
        <b-form-group
          :class="[`mb-0 py-2 col-12`, { 'has-error': errors.length > 0 }]"
        >
          <label :for="`images`" class="mt-3">Product Image:</label>
          <div class="d-flex mb-2">
            <input
              :id="`images`"
              :placeholder="'Your Store Image URL'"
              :value="image"
              @input="updateValue($event.target.value)"
              class="form-control"
              autocomplete="off"
              @focus="onFocus(`images`)"
              @blur="onBlur"
            />
            <button
              type="button"
              class="btn btn-icon btn-round"
              id="popover-target-1"
              @click="onPreview()"
              :disabled="image == ''"
            >
              <b-spinner v-if="isLoadingImage" label="Spinning"></b-spinner>
              <b-icon
                v-else
                icon="card-image"
                style="height: 15px; width: 15px"
              ></b-icon>
            </button>
          </div>
          <small
            style="font-size: 10px"
            :style="
              activeInput == `images` ? 'display: block' : 'display: none'
            "
            :id="`images`"
            class="text-danger"
            v-if="errors.length > 0"
            >{{ errors[0] }}</small
          >
          <small
            style="font-size: 10px"
            :id="`images`"
            class="text-danger"
            v-if="errorImage !== '' && errors.length === 0"
            >{{ errorImage }}</small
          >
          <small
            style="font-size: 10px"
            :id="`images`"
            class="text-primary fw-bold"
            v-if="errorImage == '' && errors.length === 0"
            >Preview & Check image on the right button</small
          >
        </b-form-group>
      </ValidationProvider>
      <b-form-group
        class="col-12"
        :class="brand.length === 0 && isBrand ? 'has-error' : ''"
      >
        <label for="brand">Brands</label>
        <span
          class="select2 select2-container select2-container--bootstrap select2-container--below select2-container--focus"
          dir="ltr"
          data-select2-id="3"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          ><span class="selection"
            ><span
              class="select2-selection select2-selection--multiple"
              role="combobox"
              aria-haspopup="true"
              aria-expanded="false"
              tabindex="-1"
              ><ul class="select2-selection__rendered">
                <li
                  v-for="(val, index) in brand"
                  class="select2-selection__choice"
                  title="Alaska"
                  data-select2-id="610"
                  :key="'select' + val.brandId"
                >
                  <span
                    class="select2-selection__choice__remove"
                    role="presentation"
                    @click="onDelete(val.brandId)"
                    >x</span
                  >{{ val.brandName }}
                </li>
                <li class="select2-search select2-search--inline">
                  <input
                    class="select2-search__field"
                    type="search"
                    tabindex="0"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="none"
                    spellcheck="false"
                    role="textbox"
                    aria-autocomplete="list"
                    placeholder="Select Brand"
                    style="width: 120px"
                    id="brand"
                    v-model="search"
                    @focus="onFocus('brand')"
                    @onBlur="onBlur()"
                  />
                </li></ul></span></span
          ><span class="dropdown-wrapper" aria-hidden="true"></span
        ></span>
        <div
          class="dropdown-menu"
          x-placement="bottom-start"
          style="
            position: absolute;
            transform: translate3d(225px, 50px, 0px);
            top: 0px;
            left: 0px;
            max-height: 150px;
            overflow: auto;
            will-change: transform;
            width: calc(97%);
          "
        >
          <fragment v-for="(val, index) in searchBrand" :key="'search' + index">
            <button
              class="dropdown-item fw-bold"
              type="button"
              @click="
                onSelect({
                  brandId: val.brandid,
                  brandName: val.brand_name,
                })
              "
            >
              {{ val.brand_name }}
            </button>
          </fragment>
          <button v-if="searchBrand.length === 0" class="dropdown-item fw-bold">
            Brand not found
          </button>
        </div>
        <small
          style="font-size: 10px"
          :style="
            activeInput == 'brand' && brand.length === 0
              ? 'display: block'
              : 'display: none'
          "
          id="brand"
          class="text-danger"
          >This field is required</small
        >
      </b-form-group>
      <div class="col-12 mt-3 px-2">
        <button
          class="btn btn-black"
          type="submit"
          :disabled="
            invalid || brand.length === 0 || !isImageLoaded || isLoading
          "
        >
          {{ type }} Official Store
        </button>
        <button
          class="btn btn-danger"
          type="submit"
          @click="emit('closeModal')"
        >
          Cancel
        </button>
      </div>
      <fragment v-if="isMagnifier">
        <div
          class="mfp-bg"
          :style="
            !isLoadingImage && errorImage === ''
              ? 'visibility: visible'
              : 'visibility: hidden'
          "
          style="z-index: 1200; width: 100%; height: 100%; border-radius: 6px"
        ></div>
        <div
          class="mfp-wrap mfp-gallery mfp-close-btn-in mfp-auto-cursor mfp-with-zoom mfp-ready"
          tabindex="-1"
          style="overflow: hidden auto; z-index: 1500"
          :style="
            !isLoadingImage && errorImage === ''
              ? 'visibility: visible'
              : 'visibility: hidden'
          "
        >
          <div class="mfp-container mfp-s-ready mfp-image-holder">
            <div class="mfp-content">
              <div class="mfp-figure">
                <button
                  title="Close (Esc)"
                  type="button"
                  class="mfp-close"
                  @click="isMagnifier = false"
                >
                  ×
                </button>
                <figure>
                  <img
                    class="mfp-img"
                    alt="undefined"
                    :src="image"
                    @load="onImageLoaded"
                    @error="onImageError"
                    style="max-height: 270px"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </fragment>
    </b-form>
    <Modal
      styleModal="width: 80%"
      title="Banners"
      v-if="isChecking"
      :msg="`Are you sure want to ${type} the banner?`"
    >
      <template #icon>
        <div class="swal-icon swal-icon--success">
          <span
            class="swal-icon--success__line swal-icon--success__line--long"
          ></span>
          <span
            class="swal-icon--success__line swal-icon--success__line--tip"
          ></span>

          <div class="swal-icon--success__ring"></div>
          <div class="swal-icon--success__hide-corners"></div>
        </div>
      </template>
      <template #content>
        <b-progress
          v-if="isLoading"
          :value="progress"
          variant="success"
          animated
          height="5px"
          class="mb-2"
        ></b-progress>
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
                @click="submit"
              >
                Yes, {{ type }} it!
              </button>
            </div>
          </b-overlay>
          <div class="swal-button-container">
            <button
              class="swal-button swal-button--cancel btn btn-danger"
              @click="isChecking = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </ValidationObserver>
</template>

<script setup>
import { computed, getCurrentInstance, onUnmounted, ref, watch } from "vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Editor from "./base/Editor.vue";
import Modal from "./base/Modal.vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const $axios = $root.$axios;

const props = defineProps({
  imageVal: {
    type: String,
    default: "",
  },
  nameVal: {
    type: String,
    default: "",
  },
  brandVal: {
    type: Array,
    default: () => {
      return [];
    },
  },
  type: {
    type: String,
    required: true,
  },
});
const brand = ref(props.brandVal);
const name = ref(props.nameVal);
const image = ref(props.imageVal);
const isMagnifier = ref(false);
const isBrand = ref(false);
const emit = defineEmits(["closeModal"]);
const search = ref("");
const isChecking = ref(false);
const activeInput = ref("name");
const isLoadingImage = ref(false);
const progress = computed(() => $store.getters["official/getProgress"]);
const errorImage = ref("");
const brands = computed(() => $store.getters["official/getBrands"]);
const isLoading = computed(() => $store.getters["official/getIsLoading"]);
const isImageLoaded = ref(props.type === "Update" ? true : false);
const searchBrand = computed(() => {
  if (search.value === "") {
    return brands.value;
  }

  return brands.value.filter((val) =>
    val.brand_name.toUpperCase().includes(search.value.toUpperCase())
  );
});

//Menampilkan image
const onPreview = () => {
  isMagnifier.value = true;
  isLoadingImage.value = true;
  errorImage.value = "";
};

// Function ketika image berhasil ditampilkan
const onImageLoaded = () => {
  isLoadingImage.value = false;
  isImageLoaded.value = true;
  errorImage.value = "";
};

// Function ketika image error
const onImageError = () => {
  isLoadingImage.value = false;
  isImageLoaded.value = false;
  isMagnifier.value = false;
  errorImage.value = "Image url can't be opened";
};

const onFocus = (name) => {
  activeInput.value = name;
  if (activeInput.value === "brand") {
    isBrand.value = true;
  }
};

const onBlur = () => {
  activeInput.value = "";
};

// Function onClick select brand
const onSelect = (params) => {
  search.value = "";
  const checkValue = brand.value.filter(
    (val) => val.brandId === params.brandId
  );

  if (checkValue.length > 0) {
    brand.value = brand.value.filter((val) => val.brandId !== params.brandId);
  } else {
    const temp = brand.value.slice();
    temp.push(params);
    brand.value = temp;
  }
};

//Function to unselect brand in input
const onDelete = (id) => {
  brand.value = brand.value.filter((val) => val.brandId !== id);
};

const updateValue = (value) => {
  image.value = value;
};

const checking = () => {
  isChecking.value = true;
};

const submit = () => {
  emit(
    "onSubmit",
    props.type === "Update"
      ? {
          name: name.value,
          image: image.value,
          brands: brand.value,
        }
      : {
          name: name.value,
          image: image.value,
          brands: brand.value,
          totalFollowers: 0,
        }
  );
};

watch(image, () => {
  errorImage.value = "";
  isImageLoaded.value = false;
});

onUnmounted(() => {
  $store.commit("official/SET_PROGRESS", 25);
});
</script>

<style scoped>
@media screen and (min-width: 576px) {
  .posisi {
    top: -24.6% !important;
    left: calc((100vw - 458px) / 2 * -1) !important;
  }
}

.posisi {
  top: -24.6%;
  left: -20px;
}
</style>
