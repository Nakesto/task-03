<template>
  <fragment>
    <div v-if="isLoading">
      <p class="text-center my-0">Loading...</p>
      <b-progress :value="progress" variant="success" animated></b-progress>
    </div>
    <b-form ref="myForm" class="row" @submit.prevent="onUpdate">
      <fragment v-for="(item, index) in items" :key="index">
        <editor
          :label="item.label"
          :name="item.name"
          v-model="item.ipt"
          :type="item.type && item.type"
          :penuh="true"
          :inputClass="item.error[item.name] !== '' ? 'is-invalid' : ''"
          @onFocus="onFocus"
          @onBlur="onBlur"
        />
        <p
          class="text-danger px-3 col-12 mb-2"
          :style="
            item.error[item.name] === ''
              ? 'display: none'
              : item.name === activeInput
              ? 'display: block'
              : 'display: none'
          "
        >
          {{ item.error[item.name] }}
        </p>
      </fragment>
      <IconButton
        type="submit"
        classButton="mt-2 bg-success font-weight-bold"
        styleButton="margin: 0 15px"
        icon="check-circle"
        :disable="isErr"
      >
        Update Account
      </IconButton>
      <IconButton
        type="button"
        classButton="mt-2 bg-danger font-weight-bold"
        styleButton="margin: 0 15px"
        icon="check-circle"
        :disable="isLoading"
        @buttonClick="onCancel"
      >
        Cancel
      </IconButton>
    </b-form>
  </fragment>
</template>

<script setup>
import { computed, getCurrentInstance, reactive, ref, watch } from "vue";
import {
  validateEmail,
  validateName,
  validatePhone,
} from "../utils/validation";
import Editor from "./base/Editor.vue";
import IconButton from "./base/IconButton.vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const $axios = $root.$axios;
const props = defineProps([
  "firstName",
  "lastName",
  "mail",
  "phonenum",
  "id",
  "pass",
]);
const emit = defineEmits(["hideModal", "showAlert"]);
const fName = ref(props.firstName);
const lName = ref(props.lastName);
const email = ref(props.mail);
const phone = ref(props.phonenum);
const err = reactive({
  fName: "",
  lName: "",
  email: "",
  phone: "",
});
const activeInput = ref("");
const isLoading = computed(() => $store.getters["regis/getIsLoading"]);
const progress = ref(25);
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
]);
const isErr = computed(() => {
  if (isLoading.value) {
    return true;
  }

  if (
    err.fName === "" &&
    err.lName === "" &&
    err.email === "" &&
    err.phone === ""
  ) {
    return false;
  }

  return true;
});

const onUpdate = async () => {
  const completed = await $store.dispatch("regis/updateUser", {
    axiosInstance: $axios,
    value: {
      firstName: fName.value,
      lastName: lName.value,
      email: email.value,
      phone: phone.value,
      id: props.id,
    },
  });
  if (completed) {
    progress.value = 100;
    setTimeout(() => {
      emit("showAlert", {
        isSucc: completed,
        message: "Data successfull updated",
      });
    }, 900);
  } else {
    setTimeout(() => {
      emit("showAlert", {
        isSucc: false,
        message: "Data failed updated",
      });
    }, 900);
  }
  setTimeout(() => {
    emit("hideModal");
  }, 900);
};

const onFocus = (name) => {
  activeInput.value = name;
};

const onBlur = () => {
  activeInput.value = "";
};

const onCancel = () => {
  emit("hideModal");
};

watch(fName, (val) => {
  const msg = validateName("First Name", val);
  if (msg !== "") {
    err.fName = msg;
  } else {
    err.fName = "";
  }
});

watch(lName, (val) => {
  const msg = validateName("Last Name", val);
  if (msg !== "") {
    err.lName = msg;
  } else {
    err.lName = "";
  }
});

watch(email, (val) => {
  const msg = validateEmail(val);
  if (msg !== "") {
    err.email = msg;
  } else {
    err.email = "";
  }
});

watch(phone, (val) => {
  const msg = validatePhone(val);
  if (msg !== "") {
    err.phone = msg;
  } else {
    err.phone = "";
  }
});
</script>

<style lang="css" scoped></style>
