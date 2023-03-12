<template>
  <div class="tab-pane active" id="about">
    <ValidationObserver v-slot="{ invalid, validate }">
      <b-form
        class="row justify-content-md-center"
        @submit.prevent="emit('submit')"
      >
        <div class="col-md-12">
          <h4 class="info-text">Create Your Discount & Price</h4>
        </div>
        <ValidationProvider
          class="col-md-6"
          rules="required"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label for="to-datepicker">Special price product from</label>
            <b-form-datepicker
              id="to-datepicker"
              v-model="product_special_price_from"
              class="mb-2 mt-2"
              :min="new Date()"
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
          class="col-md-6"
          rules="required"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label for="from-datepicker">Special price product to</label>
            <b-form-datepicker
              id="from-datepicker"
              v-model="product_special_price_to"
              class="mb-2 mt-2"
              :min="minDates"
            ></b-form-datepicker>
          </div>
          <small
            style="font-size: 10px"
            id="to-datepicker"
            class="text-danger"
            >{{ errors[0] }}</small
          >
        </ValidationProvider>
        <ValidationProvider
          class="col-md-6"
          :rules="field.rules"
          v-slot="{ errors }"
          v-for="(field, index) in fields"
          :key="index"
        >
          <div class="form-group">
            <label :for="field.name">{{ field.label }}</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Rp.</span>
              </div>
              <input
                type="text"
                :name="field.name"
                v-model="field.ipt"
                class="form-control"
                aria-label="Amount (to the nearest dollar)"
              />
            </div>
            <small
              style="font-size: 10px"
              id="to-datepicker"
              class="text-danger"
              >{{ errors[0] }}</small
            >
          </div>
        </ValidationProvider>
        <div class="wizard-action col-12 mt-3">
          <div class="pull-left">
            <input
              type="button"
              class="btn btn-previous btn-black"
              name="Previous"
              value="Previous"
              @click="emit('onSection', 'prev')"
            />
          </div>
          <div class="pull-right">
            <input
              type="submit"
              class="btn btn-next btn-danger"
              name="next"
              value="Next"
              :disabled="invalid"
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
    </ValidationObserver>
  </div>
</template>

<script setup>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { computed, getCurrentInstance, ref } from "vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const emit = defineEmits(["onSection", "submit"]);
const minDates = computed(() => {
  if (product_special_price_from.value !== "") {
    const currentDate = new Date(product_special_price_from.value);
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate;
  }
  return new Date();
});
const isLoading = computed(() => $store.getters["regis/getIsLoading"]);
const price = computed({
  get() {
    return $store.state.products.inputPrice.price;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputPrice",
      field: "price",
      value: val,
    });
  },
});
const product_special_price = computed({
  get() {
    return $store.state.products.inputPrice.product_special_price;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputPrice",
      field: "product_special_price",
      value: val,
    });
  },
});
const product_special_price_to = computed({
  get() {
    return $store.state.products.inputPrice.product_special_price_to;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputPrice",
      field: "product_special_price_to",
      value: val,
    });
  },
});
const product_special_price_from = computed({
  get() {
    return $store.state.products.inputPrice.product_special_price_from;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputPrice",
      field: "product_special_price_from",
      value: val,
    });
  },
});
const product_alfagift_price = computed({
  get() {
    return $store.state.products.inputPrice.product_alfagift_price;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputPrice",
      field: "product_alfagift_price",
      value: val,
    });
  },
});

const fields = ref([
  {
    ipt: price,
    label: "Price",
    name: "price",
    rules: "required|numeric",
  },
  {
    ipt: product_special_price,
    label: "Product Special Price",
    name: "product_special_price",
    rules: "required|numeric",
  },
  {
    ipt: product_alfagift_price,
    label: "Product Alfagift Price",
    name: "product_alfagift_price",
    rules: "required|numeric",
  },
]);
</script>

<style lang="scss" scoped></style>
