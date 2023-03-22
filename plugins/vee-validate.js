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

extend("maxlength", {
  params: ["max"],
  validate(value, { max }) {
    return value.length <= max;
  },
  message: "This field must less than {max} character",
});

extend("minlength", {
  params: ["min"],
  validate(value, { min }) {
    return value.length > min;
  },
  message: "This field must more than {min} character",
});

extend("comparePrice", {
  params: ["price"],
  validate(value, { price }) {
    return parseInt(value.replace(".", "")) <= parseInt(price.replace(".", ""));
  },
  message: "Special Price must be less than or equals to Price",
});
