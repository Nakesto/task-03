import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import Vue from "vue";
import {
  required,
  email,
  alpha_spaces,
  numeric,
  alpha_num,
} from "vee-validate/dist/rules";

Vue.use("ValidationObserver", ValidationObserver);
Vue.use("ValidationProvider", ValidationProvider);

extend("required", {
  ...required,
  message: "This field is required",
});

extend("numeric", {
  ...numeric,
  message: "This field only contain numeric",
});

extend("price", {
  validate(value) {
    return parseInt(value) > 0;
  },
  message: "This field must greater than 0",
});
