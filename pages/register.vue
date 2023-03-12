<template>
  <div class="login">
    <b-overlay :show="isLoading">
      <div class="wrapper wrapper-login wrapper-login-full p-0">
        <div
          class="login-aside w-50 d-flex flex-column align-items-center justify-content-center text-center bg-secondary-gradient"
        >
          <h1 class="title fw-bold text-white mb-3">
            Global Loyalty Indonesia
          </h1>
          <p class="subtitle text-white op-7">
            Ayo bergabung dengan komunitas kami untuk masa depan yang lebih baik
          </p>
        </div>
        <div
          class="login-aside w-50 d-flex align-items-center justify-content-center bg-white"
        >
          <div class="container container-transparent animated fadeIn">
            <h3 class="text-center fw-bold my-4">Sign Up</h3>
            <b-form class="login-form row" @submit.prevent="onSubmit">
              <fragment v-for="(item, index) in items" :key="index">
                <editor
                  :label="item.label"
                  :name="item.name"
                  v-model="item.ipt"
                  :type="item.type && item.type"
                  :penuh="item.penuh ? true : false"
                  :inputClass="err[item.name] !== '' ? 'is-invalid' : ''"
                  :active="activeInput"
                  @onFocus="onFocus"
                  @onBlur="onBlur"
                  :groupClass="err[item.name] !== '' ? 'has-error' : ''"
                  :errMsg="err[item.name]"
                />
              </fragment>
              <div class="row col-12 form-sub m-0">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    name="agree"
                    id="agree"
                  />
                  <label class="custom-control-label" for="agree"
                    >I Agree the terms and conditions.</label
                  >
                </div>
              </div>
              <button
                :disabled="isError"
                type="submit"
                class="btn btn-secondary col-12 fw-bold mt-4"
              >
                Sign Up
              </button>
              <div class="d-flex justify-content-center w-100 mt-3">
                <span class="msg">Already have an account?</span>
                <NuxtLink to="/login" id="show-signup" class="link"
                  >Sign In</NuxtLink
                >
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </b-overlay>
    <Modal
      v-if="isModal"
      :title="!isErr ? 'Registration Success' : 'Registration Failed'"
      :msg="!isErr ? '' : errMsg"
      @hideModal="hideModal"
    >
      <template #icon>
        <div v-if="!isErr" class="swal-icon swal-icon--success">
          <span
            class="swal-icon--success__line swal-icon--success__line--long"
          ></span>
          <span
            class="swal-icon--success__line swal-icon--success__line--tip"
          ></span>

          <div class="swal-icon--success__ring"></div>
          <div class="swal-icon--success__hide-corners"></div>
        </div>
        <div v-else class="swal-icon swal-icon--error">
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
        <ul class="list-group list-group-bordered">
          <li class="list-group-item">FullName: {{ fName + " " + lName }}</li>
          <li class="list-group-item">Email: {{ email }}</li>
          <li class="list-group-item">Phone: {{ phone }}</li>
        </ul>
      </template>
      <template #footer>
        <div class="swal-button-container">
          <button
            class="swal-button swal-button--confirm btn btn-secondary fw-bold"
            style="cursor: pointer"
            @click="hideModal"
          >
            Close
          </button>
        </div>
      </template>
    </Modal>
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
};
</script>
<script setup>
import {
  ref,
  getCurrentInstance,
  computed,
  watch,
  onMounted,
  onUnmounted,
} from "vue";
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePass,
  validateConfirmPass,
} from "../utils/validation";
import Editor from "../components/base/Editor.vue";
import Modal from "../components/base/Modal.vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const isLoading = computed(() => $store.getters["regis/getIsLoading"]);
const err = computed(() => $store.getters["regis/getErrors"]);
const errMsg = computed(() => $store.getters["regis/getMsgLoginError"]);
const activeInput = ref("");
const isErr = ref(false);
const isModal = ref(false);
const fName = computed({
  get() {
    return $store.state.regis.input.fName;
  },
  set(val) {
    $store.commit("regis/SET_INPUT", { field: "fName", value: val });
  },
});
const lName = computed({
  get() {
    return $store.state.regis.input.lName;
  },
  set(val) {
    $store.commit("regis/SET_INPUT", { field: "lName", value: val });
  },
});
const email = computed({
  get() {
    return $store.state.regis.input.email;
  },
  set(val) {
    $store.commit("regis/SET_INPUT", { field: "email", value: val });
  },
});
const phone = computed({
  get() {
    return $store.state.regis.input.phone;
  },
  set(val) {
    $store.commit("regis/SET_INPUT", { field: "phone", value: val });
  },
});
const pass = computed({
  get() {
    return $store.state.regis.input.pass;
  },
  set(val) {
    $store.commit("regis/SET_INPUT", { field: "pass", value: val });
  },
});
const confirmPass = computed({
  get() {
    return $store.state.regis.input.confirmPass;
  },
  set(val) {
    $store.commit("regis/SET_INPUT", { field: "confirmPass", value: val });
  },
});
const isError = computed(() => {
  if (
    fName.value === "" ||
    lName.value === "" ||
    email.value === "" ||
    phone.value === "" ||
    pass.value === "" ||
    confirmPass.value === ""
  ) {
    return true;
  }
  let flag = false;
  Object.entries(err.value).forEach((val) => {
    if (val[1] !== "") {
      flag = true;
      return true;
    }
  });

  return flag;
});
const items = ref([
  {
    ipt: fName,
    label: "First Name",
    name: "fName",
    error: err,
  },
  {
    ipt: lName,
    label: "Last Name",
    name: "lName",
    error: err,
  },
  {
    ipt: email,
    label: "Email",
    name: "email",
    error: err,
  },
  {
    ipt: phone,
    label: "Phone Number",
    name: "phone",
    error: err,
  },
  {
    ipt: pass,
    label: "Password",
    name: "pass",
    type: "password",
    penuh: true,
    error: err,
  },
  {
    ipt: confirmPass,
    label: "Confirm Password",
    name: "confirmPass",
    type: "password",
    penuh: true,
    error: err,
  },
]);

const router = getCurrentInstance().proxy.$router;

const onSubmit = async () => {
  if (!isError.value) {
    const completed = await $store.dispatch("regis/postRegister", {
      firstName: fName.value,
      lastName: lName.value,
      email: email.value,
      phone: phone.value,
      password: confirmPass.value,
    });

    if (completed) {
      isModal.value = true;
      isErr.value = false;
    }
  } else {
    isModal.value = true;
    isErr.value = true;
  }
};

const onFocus = (name) => {
  activeInput.value = name;
};

const onBlur = () => {
  activeInput.value = "";
};

watch(fName, () => {
  const msg = validateName("First Name", fName.value);
  if (msg !== "") {
    // err.value = { ...err.value, ["fName"]: msg };
    $store.dispatch("regis/failedValidation", { field: "fName", value: msg });
  } else {
    // err.value = { ...err.value, ["fName"]: "" };
    $store.dispatch("regis/failedValidation", { field: "fName", value: "" });
  }
});

watch(lName, () => {
  const msg = validateName("Last Name", lName.value);
  if (msg !== "") {
    // err.value = { ...err.value, ["lName"]: msg };
    $store.dispatch("regis/failedValidation", { field: "lName", value: msg });
  } else {
    // err.value = { ...err.value, ["lName"]: "" };
    $store.dispatch("regis/failedValidation", { field: "lName", value: "" });
  }
});

watch(email, () => {
  const msg = validateEmail(email.value);
  if (msg !== "") {
    // err.value = { ...err.value, ["email"]: msg };
    $store.dispatch("regis/failedValidation", { field: "email", value: msg });
  } else {
    // err.value = { ...err.value, ["email"]: "" };
    $store.dispatch("regis/failedValidation", { field: "email", value: "" });
  }
});

watch(phone, () => {
  const msg = validatePhone(phone.value);
  if (msg !== "") {
    // err.value = { ...err.value, ["phone"]: msg };
    $store.dispatch("regis/failedValidation", { field: "phone", value: msg });
  } else {
    // err.value = { ...err.value, ["phone"]: "" };
    $store.dispatch("regis/failedValidation", { field: "phone", value: "" });
  }
});

watch(pass, () => {
  const msg = validatePass(pass.value);
  if (msg !== "") {
    // err.value = { ...err.value, ["pass"]: msg };
    $store.dispatch("regis/failedValidation", { field: "pass", value: msg });
  } else {
    // err.value = { ...err.value, ["pass"]: "" };
    $store.dispatch("regis/failedValidation", { field: "pass", value: "" });
  }
});

watch(confirmPass, () => {
  const msg = validateConfirmPass(pass.value, confirmPass.value);
  if (msg !== "") {
    // err.value = { ...err.value, ["confirmPass"]: msg };
    $store.dispatch("regis/failedValidation", {
      field: "confirmPass",
      value: msg,
    });
  } else {
    // err.value = { ...err.value, ["confirmPass"]: "" };
    $store.dispatch("regis/failedValidation", {
      field: "confirmPass",
      value: "",
    });
  }
});

const hideModal = () => {
  if (!isError.value) {
    isErr.value = false;
    router.push({ name: "login" });
  }
  isModal.value = false;
};

onUnmounted(() => {
  $store.commit("regis/RESET_INPUT");
  $store.commit("regis/RESET_VALIDATION");
});
</script>

<style lang="scss" scoped></style>
