<template>
  <div class="tab-pane active" id="about">
    <ValidationObserver v-slot="{ invalid, validate }">
      <b-form
        class="row justify-content-center"
        @submit.prevent="emit('submit')"
      >
        <div class="col-md-12">
          <h4 class="info-text">Create Your Discount & Price</h4>
        </div>
        <ValidationProvider
          class="col-12 col-sm-6 col-md-4"
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
                v-if="index === 0"
                type="text"
                :name="field.name"
                v-model="field.ipt"
                class="form-control"
                aria-label="Amount (to the nearest dollar)"
                v-auto-focus
              />
              <input
                v-else
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
        <ValidationProvider
          class="col-md-6"
          :rules="
            product_special_price === null ||
            product_special_price === '' ||
            parseInt(product_special_price) <= 0 ||
            isNaN(product_special_price)
              ? ''
              : 'required'
          "
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label for="to-datepicker">Special price product from</label>
            <b-form-datepicker
              id="to-datepicker"
              v-model="product_special_price_from"
              class="mb-2 mt-2"
              :min="new Date()"
              :max="maxDates"
              :disabled="
                product_special_price === null ||
                product_special_price === '' ||
                parseInt(product_special_price) <= 0 ||
                isNaN(product_special_price)
              "
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
          :rules="
            product_special_price === null ||
            product_special_price === '' ||
            parseInt(product_special_price) <= 0 ||
            isNaN(product_special_price)
              ? ''
              : 'required'
          "
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label for="from-datepicker">Special price product to</label>
            <b-form-datepicker
              id="from-datepicker"
              v-model="product_special_price_to"
              class="mb-2 mt-2"
              :min="minDates"
              :disabled="
                product_special_price === null ||
                product_special_price === '' ||
                parseInt(product_special_price) <= 0 ||
                isNaN(product_special_price)
              "
            ></b-form-datepicker>
          </div>
          <small
            style="font-size: 10px"
            id="to-datepicker"
            class="text-danger"
            >{{ errors[0] }}</small
          >
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
              :value="type"
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
import { computed, getCurrentInstance, ref, watch } from "vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const props = defineProps(["type"]);
const emit = defineEmits(["onSection", "submit"]);
const minDates = computed(() => {
  if (
    product_special_price_from.value !== "" ||
    product_special_price_from.value !== null
  ) {
    const currentDate = new Date(product_special_price_from.value);
    currentDate.setDate(currentDate.getDate());
    return currentDate;
  }

  return new Date();
});
const maxDates = computed(() => {
  if (product_special_price_to.value !== "") {
    const currentDate = new Date(product_special_price_to.value);
    currentDate.setDate(currentDate.getDate());
    return currentDate;
  }
  return null;
});
const price = computed({
  get() {
    return $store.state.products.inputPrice.price;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputPrice",
      field: "price",
      value: formatRupiah(val),
    });
  },
});

function formatRupiah(angka, prefix) {
  let number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}

const product_special_price = computed({
  get() {
    return $store.state.products.inputPrice.product_special_price;
  },
  set(val) {
    $store.commit("products/SET_INPUT", {
      section: "inputPrice",
      field: "product_special_price",
      value: formatRupiah(val),
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
      value: formatRupiah(val),
    });
  },
});

const fields = ref([
  {
    ipt: price,
    label: "Price",
    name: "price",
    rules: "required|price",
  },
  {
    ipt: product_special_price,
    label: "Product Special Price",
    name: "product_special_price",
    rules: `price`,
  },
  {
    ipt: product_alfagift_price,
    label: "Product Alfagift Price",
    name: "product_alfagift_price",
    rules: "required|price",
  },
]);

watch(product_special_price, (val) => {
  if (val === "") {
    $store.commit("products/SET_INPUT", {
      section: "inputPrice",
      field: "product_special_price_to",
      value: val,
    });

    $store.commit("products/SET_INPUT", {
      section: "inputPrice",
      field: "product_special_price_from",
      value: val,
    });
  }
});

watch(price, (val) => {
  if (price.val !== "") {
    fields.value[1].rules = `price|comparePrice:${val}`;
  }
});
</script>

<style lang="scss" scoped></style>
