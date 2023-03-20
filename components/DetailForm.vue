<template>
  <ValidationObserver v-slot="{ invalid, validate }">
    <b-form class="tab-pane active" @submit.prevent="onSubmit(invalid)">
      <div class="row justify-content-lg-center">
        <div class="col-md-12">
          <h4 class="info-text">Create Your Detail Product</h4>
        </div>
        <fragment v-for="(item, index) in fields" :key="index">
          <ValidationProvider
            v-if="index !== 2"
            :class="[`col-12`, { 'col-md-6': !item.penuh }]"
            :rules="item.rules"
            v-slot="{ errors }"
          >
            <editor
              :label="item.label"
              :name="item.name"
              v-model="item.ipt"
              :type="item.type && item.type"
              :penuh="true"
              :inputClass="errors.length > 0 ? 'is-invalid' : ''"
              :active="activeInput"
              :focus="index === 0 ? true : false"
              @onFocus="onFocus"
              @onBlur="onBlur"
              :groupClass="errors.length > 0 ? 'has-error' : ''"
              :errMsg="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider
            v-if="index === 2"
            :class="[`col-12`, { 'col-md-6': !item.penuh }]"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="form-group">
              <label :for="item.name">{{ item.label }}</label>
              <select
                v-model="item.ipt"
                name="item.name"
                class="form-control form-control"
                id="defaultSelect"
                placeholder="Select Your Category"
              >
                <option disabled selected value="">Select Your Category</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
              </select>
            </div>
            <small
              style="font-size: 10px"
              :style="
                activeInput == item.name ? 'display: block' : 'display: none'
              "
              :id="item.name"
              class="text-danger"
              >{{ errors[0] }}</small
            >
          </ValidationProvider>
        </fragment>
        <ValidationProvider class="col-md-6 col-xl-4 mt-2 mt-2">
          <b-form-group class="mb-0 py-2 d-flex">
            <label class="mr-2">Product Status </label>
            <div
              class="toggle btn btn-round"
              :class="status ? 'btn-success' : 'btn-black'"
              style="width: 92.9062px; height: 43.7969px"
              @click="onToggle('status', !status)"
            >
              <div
                class="toggle-group"
                style="transition: all 0.5s cubic-bezier(0.29, 1.2, 0.79, 1) 0s"
                :style="
                  !status
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
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider class="col-md-6 col-xl-4 mt-2 mt-2">
          <b-form-group class="mb-0 py-2">
            <label class="mr-2">Alfa Product </label>
            <div
              class="toggle btn btn-round"
              :class="is_alfa_product ? 'btn-info' : 'btn-secondary'"
              style="width: 92.9062px; height: 43.7969px"
              @click="onToggle('is_alfa_product', !is_alfa_product)"
            >
              <div
                class="toggle-group"
                style="transition: all 0.5s cubic-bezier(0.29, 1.2, 0.79, 1) 0s"
                :style="
                  !is_alfa_product
                    ? 'transform: translate3d(-88px, 0px, 0px)'
                    : 'transform: translate3d(0px, 0px, 0px)'
                "
              >
                <label class="btn btn-info toggle-on">Alfa</label
                ><label class="btn btn-secondary active toggle-off"
                  >Seller</label
                ><span class="toggle-handle btn btn-secondary"></span>
              </div>
            </div>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider class="col-md-6 col-xl-4 mt-2 mt-2">
          <b-form-group class="mb-0 py-2">
            <label class="mr-2">Alfagift Platform </label>
            <div
              class="toggle btn btn-round"
              :class="alfagift_platform ? 'btn-success' : 'btn-danger'"
              style="width: 92.9062px; height: 43.7969px"
              @click="onToggle('alfagift_platform', !alfagift_platform)"
            >
              <div
                class="toggle-group"
                style="transition: all 0.5s cubic-bezier(0.29, 1.2, 0.79, 1) 0s"
                :style="
                  !alfagift_platform
                    ? 'transform: translate3d(-88px, 0px, 0px)'
                    : 'transform: translate3d(0px, 0px, 0px)'
                "
              >
                <label class="btn btn-success toggle-on">Yes</label
                ><label class="btn btn-danger active toggle-off">No</label
                ><span class="toggle-handle btn btn-danger"></span>
              </div>
            </div>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider class="col-md-6 col-xl-4 mt-2">
          <b-form-group class="mb-0 py-2">
            <label class="mr-2">Pickup Avaibility </label>
            <div
              class="toggle btn btn-round"
              :class="
                product_pickup_availability ? 'btn-success' : 'btn-danger'
              "
              style="width: 92.9062px; height: 43.7969px"
              @click="
                onToggle(
                  'product_pickup_availability',
                  !product_pickup_availability
                )
              "
            >
              <div
                class="toggle-group"
                style="transition: all 0.5s cubic-bezier(0.29, 1.2, 0.79, 1) 0s"
                :style="
                  !product_pickup_availability
                    ? 'transform: translate3d(-88px, 0px, 0px)'
                    : 'transform: translate3d(0px, 0px, 0px)'
                "
              >
                <label class="btn btn-success toggle-on">Yes</label
                ><label class="btn btn-danger active toggle-off">No</label
                ><span class="toggle-handle btn btn-danger"></span>
              </div>
            </div>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider class="col-md-6 col-xl-4 mt-2">
          <b-form-group class="mb-0 py-2">
            <label class="mr-2">Groceries </label>
            <div
              class="toggle btn btn-round"
              :class="product_is_groceries ? 'btn-success' : 'btn-danger'"
              style="width: 92.9062px; height: 43.7969px"
              @click="onToggle('product_is_groceries', !product_is_groceries)"
            >
              <div
                class="toggle-group"
                style="transition: all 0.5s cubic-bezier(0.29, 1.2, 0.79, 1) 0s"
                :style="
                  !product_is_groceries
                    ? 'transform: translate3d(-88px, 0px, 0px)'
                    : 'transform: translate3d(0px, 0px, 0px)'
                "
              >
                <label class="btn btn-success toggle-on">Yes</label
                ><label class="btn btn-danger active toggle-off">No</label
                ><span class="toggle-handle btn btn-danger"></span>
              </div>
            </div>
          </b-form-group>
        </ValidationProvider>
        <div class="d-flex justify-content-end col-12 mt-5">
          <span @click="addInputImage" class="btn btn-primary">Add Image</span>
        </div>
        <ValidationProvider
          :class="[`col-12 mt-2`]"
          rules="required"
          v-slot="{ errors }"
          v-for="(val, index) in imageRow"
          :key="index"
        >
          <b-form-group :class="[`mb-0 py-2 col-12`]">
            <div class="d-flex justify-content-between mb-2">
              <label :for="`images-${index}`" class="mt-3"
                >Product Image:</label
              >
              <button
                @click="removeInputImage(index)"
                type="button"
                class="btn btn-icon btn-round btn-danger"
              >
                <b-icon
                  icon="trash-fill"
                  style="height: 15px; width: 15px"
                ></b-icon>
              </button>
            </div>
            <div class="d-flex mb-2">
              <input
                :id="`images-${index}`"
                :placeholder="'Your Product Image'"
                :value="$store.state.products.inputDetail.product_images[index]"
                @input="updateValue($event.target.value, index)"
                class="form-control"
                autocomplete="off"
                @focus="onFocus(`images-${index}`)"
                @blur="onBlur"
              />
              <button
                type="button"
                class="btn btn-icon btn-round"
                :id="'button-image-' + index"
                @click="onPreview(index)"
                :disabled="
                  $store.state.products.inputDetail.product_images[index] == ''
                "
              >
                <b-spinner
                  v-if="isLoadingImage && activeImage == index"
                  label="Spinning"
                ></b-spinner>
                <b-icon
                  v-else
                  icon="card-image"
                  style="height: 15px; width: 15px"
                ></b-icon>
              </button>
              <b-tooltip
                v-if="isMagnifier == false"
                :target="'button-image-' + index"
                placement="bottom"
                triggers="hover"
                >View Image</b-tooltip
              >
            </div>
            <small
              style="font-size: 10px"
              :style="
                activeInput == `images-${index}`
                  ? 'display: block'
                  : 'display: none'
              "
              :id="`images-${index}`"
              class="text-danger"
              v-if="errors.length > 0"
              >{{ errors[0] }}</small
            >
            <small
              style="font-size: 10px"
              :id="`images-${index}`"
              class="text-danger"
              v-if="errorImage[index] !== '' && errors.length == 0"
              >{{ errorImage[index] }}</small
            >
            <small
              style="font-size: 10px"
              :id="`images-${index}`"
              class="text-primary fw-bold"
              v-if="errorImage[index] == '' && errors.length == 0"
              >Preview image on the right button</small
            >
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider
          class="col-12"
          rules="required|maxlength:1000"
          v-slot="{ errors }"
        >
          <div
            class="form-group col-12 mt-3"
            :class="errors.length > 0 ? 'has-error' : ''"
          >
            <label :for="product_desc">Description Product</label>
            <textarea
              placeholder="Your Description Product"
              class="form-control"
              id="product_desc"
              name="product_desc"
              rows="7"
              v-model="product_desc"
              @focus="onFocus('product_desc')"
              @blur="onBlur"
            ></textarea>
            <div class="d-flex justify-content-between mt-2">
              <label
                id="about-error"
                :style="
                  activeInput === 'product_desc'
                    ? 'visibility: visible'
                    : 'visibility: hidden'
                "
                class="error"
                :for="product_desc"
                >{{ errors[0] }}</label
              >
              <p class="text-muted fw-bold">{{ product_desc.length }}/1000</p>
            </div>
          </div>
        </ValidationProvider>
      </div>
      <div class="wizard-action">
        <div class="pull-right">
          <input
            type="submit"
            class="btn btn-next btn-danger"
            name="next"
            value="Next"
            :disabled="invalid || imageError"
          />
          <input
            type="button"
            class="btn btn-finish btn-danger"
            name="finish"
            value="Finish"
            style="display: none"
          />
        </div>
        <div class="clearfix"></div>
      </div>
    </b-form>

    <fragment v-if="isMagnifier">
      <div
        class="mfp-bg mfp-with-zoom mfp-ready"
        :style="
          !isLoadingImage && errorImage[activeImage] === ''
            ? 'visibility: visible'
            : 'visibility: hidden'
        "
        style="z-index: 1200"
      ></div>
      <div
        class="mfp-wrap mfp-gallery mfp-close-btn-in mfp-auto-cursor mfp-with-zoom mfp-ready"
        tabindex="-1"
        style="overflow: hidden auto; z-index: 1500"
        :style="
          !isLoadingImage && errorImage[activeImage] === ''
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
                  :src="
                    $store.state.products.inputDetail.product_images[
                      activeImage
                    ]
                  "
                  @load="onImageLoaded"
                  @error="onImageError"
                  style="max-height: 821px"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </fragment>
  </ValidationObserver>
</template>

<script setup>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import Editor from "./base/Editor.vue";
const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});
const myTooltipRef = ref(null);
const activeInput = ref("");
const isMagnifier = ref(false);
const activeImage = ref(0);
const errorImage = ref([""]);
const isImageValidate = ref([props.type === "Create" ? false : true]);
const isLoadingImage = ref(false);
const isImageLoaded = ref(false);
const emit = defineEmits(["onSection"]);
const product_id = computed({
  get() {
    return $store.state.products.inputDetail.product_id;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputDetail",
      field: "product_id",
      value: val,
    });
  },
});
const imageError = computed(() => {
  let flag = false;

  isImageValidate.value.forEach((val) => {
    if (!val) {
      flag = true;
    }
  });

  return flag;
});
const product_sku = computed({
  get() {
    return $store.state.products.inputDetail.product_sku;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputDetail",
      field: "product_sku",
      value: val,
    });
  },
});
const product_name = computed({
  get() {
    return $store.state.products.inputDetail.product_name;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputDetail",
      field: "product_name",
      value: val,
    });
  },
});
const product_desc = computed({
  get() {
    return $store.state.products.inputDetail.product_desc;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputDetail",
      field: "product_desc",
      value: val,
    });
  },
});
const product_category = computed({
  get() {
    return $store.state.products.inputDetail.product_category;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputDetail",
      field: "product_category",
      value: val,
    });
  },
});
const product_stock = computed({
  get() {
    return $store.state.products.inputDetail.product_stock;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputDetail",
      field: "product_stock",
      value: val,
    });
  },
});
// const product_images = computed({
//   get() {
//     return $store.state.products.inputDetail.product_images;
//   },
//   set(val) {
//     $store.commit("products/SET_INPUT", {
//       section: "inputDetail",
//       field: "product_images",
//       value: val,
//     });
//   },
// });

const imageRow = computed(
  () => $store.state.products.inputDetail.product_images
);

const onPreview = (index) => {
  activeImage.value = index;
  isMagnifier.value = true;
  isLoadingImage.value = true;
  const temp = errorImage.value.slice();
  temp[index] = "";
  errorImage.value = temp;
};

const onImageLoaded = () => {
  isLoadingImage.value = false;
  isImageLoaded.value = true;
  const temp = errorImage.value.slice();
  const temp2 = isImageValidate.value.slice();
  temp[activeImage.value] = "";
  errorImage.value = temp;
  temp2[activeImage.value] = true;
  isImageValidate.value = temp2;
  console.log("loaded");
};

const onImageError = () => {
  isLoadingImage.value = false;
  isImageLoaded.value = false;
  isMagnifier.value = false;
  const temp = errorImage.value.slice();
  const temp2 = isImageValidate.value.slice();
  temp[activeImage.value] = "Image url can't be opened";
  errorImage.value = temp;
  temp2[activeImage.value] = false;
  isImageValidate.value = temp2;
};

const addInputImage = () => {
  $store.commit("products/ADD_ROW_IMAGE", {
    section: "inputDetail",
    field: "product_images",
    row: imageRow.value.length - 1,
    value: "",
  });
  errorImage.value.push("");
  isImageValidate.value.push(false);
};

const updateValue = (val, index) => {
  const temp = errorImage.value.slice();
  const temp2 = isImageValidate.value.slice();
  temp[index] = "";
  errorImage.value = temp;
  temp2[index] = false;
  isImageValidate.value = temp2;
  $store.commit("products/UPDATE_IMAGE", {
    section: "inputDetail",
    field: "product_images",
    row: index,
    value: val,
  });
};

const removeInputImage = (index) => {
  $store.commit("products/REMOVE_ROW_IMAGE", {
    section: "inputDetail",
    field: "product_images",
    row: index,
  });
  errorImage.value.splice(index, 1);
};
const status = computed(() => $store.state.products.inputDetail.status);
const is_alfa_product = computed(
  () => $store.state.products.inputDetail.is_alfa_product
);
const alfagift_platform = computed(
  () => $store.state.products.inputDetail.alfagift_platform
);
const product_pickup_availability = computed(
  () => $store.state.products.inputDetail.product_pickup_availability
);
const product_is_groceries = computed(
  () => $store.state.products.inputDetail.product_is_groceries
);

const fields = ref([
  {
    ipt: product_id,
    label: "ID Product",
    name: "product_id",
    rules: "required|numeric",
    focus: true,
  },
  {
    ipt: product_sku,
    label: "No SKU Product",
    name: "product_sku",
    rules: "required",
  },
  {
    ipt: product_category,
    label: "Category",
    name: "product_category",
    rules: "required",
  },
  {
    ipt: product_stock,
    label: "Product Stock",
    name: "product_stock",
    rules: "required|numeric",
  },
  {
    ipt: product_name,
    label: "Product Name",
    name: "product_name",
    rules: "required",
    penuh: true,
  },
]);
const onFocus = (name) => {
  activeInput.value = name;
};

const onBlur = () => {
  activeInput.value = "";
};

const onToggle = (field, value) => {
  $store.commit("products/SET_INPUT", {
    section: "inputDetail",
    field: field,
    value: value,
  });
};

const onSubmit = (invalid) => {
  if (!invalid) {
    emit("onSection", "next");
    $store.commit("products/SET_STEP_VALIDATE", {
      field: "first",
      value: true,
    });
  } else {
    $store.commit("products/SET_STEP_VALIDATE", {
      field: "first",
      value: false,
    });
  }
};

const onEscapeKeyUp = (event) => {
  if (event.which === 27 && isMagnifier.value) {
    isMagnifier.value = false;
  }
};

onMounted(() => {
  window.addEventListener("keyup", onEscapeKeyUp);
});

onUnmounted(() => {
  window.removeEventListener("keyup", onEscapeKeyUp);
});
</script>
