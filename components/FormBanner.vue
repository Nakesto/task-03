<template>
  <ValidationObserver v-slot="{ invalid, validate }">
    <b-form class="row px-2 px-md-4" @submit.prevent="checking">
      <ValidationProvider
        class="col-12 p-0 m-0"
        rules="required"
        v-slot="{ errors }"
      >
        <Editor
          label="Name Banner"
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
          <label :for="`images`" class="mt-3">Banner Image:</label>
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
      <ValidationProvider
        class="col-12 p-0 m-0"
        :rules="'required'"
        v-slot="{ errors }"
      >
        <div class="form-group">
          <label for="to-datepicker">Start Date Banner</label>
          <b-form-datepicker
            id="to-datepicker"
            v-model="startDate"
            class="mb-2 mt-2"
            :min="new Date()"
            :max="maxDates"
          ></b-form-datepicker>
          <small
            style="font-size: 10px"
            id="to-datepicker"
            class="text-danger"
            >{{ errors[0] }}</small
          >
        </div>
      </ValidationProvider>
      <ValidationProvider
        class="col-12 p-0 m-0"
        :rules="'required'"
        v-slot="{ errors }"
      >
        <div class="form-group">
          <label for="from-datepicker">End Date Banner</label>
          <b-form-datepicker
            id="from-datepicker"
            v-model="endDate"
            class="mb-2 mt-2"
            :min="minDates"
          ></b-form-datepicker>
        </div>
        <small style="font-size: 10px" id="to-datepicker" class="text-danger">{{
          errors[0]
        }}</small>
      </ValidationProvider>
      <div class="col-12 mt-3 px-2">
        <button
          class="btn btn-black"
          type="submit"
          :disabled="invalid || !isImageLoaded || isLoading"
        >
          {{ type }} Banner
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
const convertDate = (val) => {
  const date = new Date(val);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
const activeInput = ref("name");
const isLoadingImage = ref(false);
const isMagnifier = ref(false);
const errorImage = ref("");
const isImageLoaded = ref(props.type === "Update" ? true : false);
const name = ref(props.nameVal);
const image = ref(props.imageVal);
const startDate = ref(convertDate(props.startDateVal));
const endDate = ref(convertDate(props.endDateVal));
const isLoading = computed(() => $store.getters["banners/getIsLoading"]);
const progress = computed(() => $store.getters["banners/getProgress"]);
const minDates = computed(() => {
  if (startDate.value !== "" || startDate.value !== null) {
    const currentDate = new Date(startDate.value);
    currentDate.setDate(currentDate.getDate());
    return currentDate;
  }

  return new Date();
});
const maxDates = computed(() => {
  if (endDate.value !== "") {
    const currentDate = new Date(endDate.value);
    currentDate.setDate(currentDate.getDate());
    return currentDate;
  }
  return null;
});

const props = defineProps({
  imageVal: {
    type: String,
    default: "",
  },
  nameVal: {
    type: String,
    default: "",
  },
  startDateVal: {
    type: [String, Date],
    default: "",
  },
  endDateVal: {
    type: [String, Date],
    default: "",
  },
  type: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["closeModal", "onSubmit"]);
const updateValue = (value) => {
  image.value = value;
};
const isChecking = ref(false);
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

const checking = () => {
  isChecking.value = true;
};

const submit = () => {
  emit("onSubmit", {
    bannerName: name.value,
    bannerImageFileName: image.value,
    startDate: new Date(startDate.value).toISOString(),
    endDate: new Date(endDate.value).toISOString(),
  });
};
</script>

<style lang="scss" scoped></style>
