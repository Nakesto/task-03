<template>
  <b-overlay :show="isLoading">
    <div class="login">
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
          <div
            class="container container-login container-transparent animated fadeIn"
          >
            <h3 class="text-center">Sign In To Admin</h3>
            <b-form @submit.prevent="onSubmit" class="login-form">
              <div class="form-group">
                <label for="email" class="placeholder"><b>Email</b></label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  class="form-control"
                  required
                  v-model="email"
                  v-auto-focus
                />
              </div>
              <div class="form-group">
                <label for="password" class="placeholder"
                  ><b>Password</b></label
                >
                <div class="position-relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    class="form-control"
                    required
                    v-model="pass"
                  />
                </div>
              </div>
              <div class="d-flex">
                <div style="flex: 1"></div>
                <NuxtLink to="/register" class="link float-right"
                  >Forget Password ?</NuxtLink
                >
              </div>
              <div class="form-group form-action-d-flex mb-3 mt-2">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="rememberme"
                  />
                  <label class="custom-control-label m-0" for="rememberme"
                    >Remember Me</label
                  >
                </div>
                <button
                  type="submit"
                  class="btn btn-secondary col-md-5 float-right mt-3 mt-sm-0 fw-bold"
                  :disabled="isErr"
                >
                  Sign In
                </button>
              </div>
              <div class="login-account">
                <span class="msg">Don't have an account yet ?</span>
                <NuxtLink to="/register" id="show-signup" class="link"
                  >Sign Up</NuxtLink
                >
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-if="isError"
      :msg="errMsg"
      title="Login Failed"
      @hideModal="hideModal"
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
      <template #footer>
        <div class="swal-button-container">
          <button
            class="swal-button swal-button--confirm btn btn-danger"
            @click="hideModal"
          >
            OK
          </button>
        </div>
      </template>
    </Modal>
  </b-overlay>
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
  auth: "guest",
};
</script>
<script setup>
import { ref, getCurrentInstance, computed } from "vue";
import Modal from "../components/base/Modal.vue";
// import { validateEmail, validatePass } from "../utils/validation";

const $root = getCurrentInstance().proxy.$root;
const $auth = $root.$auth;
const $store = $root.$store;
const $axios = $root.$axios;
const email = ref("");
const pass = ref("");
const errMsg = computed(() => $store.getters["regis/getMsgLoginError"]);
const isLoading = computed(() => $store.getters["regis/getIsLoading"]);
const isErr = computed(() => {
  if (email.value === "" || pass.value === "") {
    return true;
  }

  return false;
});

const isError = ref(false);

const router = getCurrentInstance().proxy.$router;

const onSubmit = async () => {
  // const completed = await $store.dispatch("regis/loginUser", {
  //   axiosInstance: $axios,
  //   value: {
  //     email: email.value,
  //     password: pass.value,
  //   },
  // });

  try {
    $store.commit("regis/SET_ISLOADING", true);
    const res = await $auth.loginWith("local", {
      data: {
        email: email.value,
        password: pass.value,
      },
    });
    console.log(res);

    if (res.status === 200) {
      localStorage.setItem("data", JSON.stringify(res.data.user));
      Object.entries(res.data.user).forEach((val) => {
        $store.commit("regis/SET_DATA", { field: val[0], value: val[1] });
      });
    }
    isError.value = false;
  } catch (err) {
    isError.value = true;
    $store.commit("regis/SET_ERR_LOGIN_MESSAGE", err.data);
  } finally {
    $store.commit("regis/SET_ISLOADING", false);
  }

  // router.push({ name: "index" });

  // const res = await auth.loginWith("local", {
  //   data: {
  //     email: email.value,
  //     password: pass.value,
  //   },
  //   headers: {
  //     "content-type": "application/json",
  //   },
  // });
  // console.log(res.data);
  //   const customUser = {
  //     ...res.data.user,
  //     fullName: res.data.user.firstName + " " + res.data.user.lastName,
  //     roles: ["user"],
  //   };
  // auth.setUser(res.data.user);
  //   auth.$storage.setUniversal("user", res.data.user);

  //   router.push({ name: "users" });

  // if (completed) {
  //   isError.value = false;
  //   router.push({ name: "index" });
  // } else {
  //   isError.value = true;
  // }
};

const hideModal = () => {
  isError.value = false;
  if (!isErr.value) {
    email.value = "";
    pass.value = "";
  }
};
</script>

<style lang="scss" scoped></style>
