import { API_URL, API_AUTH_URL } from "./regis";

export const state = () => ({
  products: [],
  searchProducts: [],
  isLoading: false,
  searchLoading: false,
  inputDetail: {
    id: "",
    product_id: "",
    product_sku: "",
    product_name: "",
    product_desc: "",
    product_category: "",
    product_images: [""],
    status: true,
    product_stock: "",
    is_alfa_product: true,
    alfagift_platform: true,
    product_pickup_availability: true,
    product_is_groceries: true,
  },
  inputPrice: {
    price: "",
    product_special_price: "",
    product_special_price_to: "",
    product_special_price_from: "",
    product_alfagift_price: "",
  },
});

export const getters = {
  getProducts(state) {
    return state.products;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
  getInputDetail(state) {
    return state.inputDetail;
  },
  getInputPrice(state) {
    return state.inputPrice;
  },
};

export const mutations = {
  SET_PRODUCTS(state, value) {
    state.products = value;
  },
  SET_ISLOADING(state, value) {
    state.isLoading = value;
  },
  SET_STEP_VALIDATE(state, { field, value }) {
    state.stepValidate = { ...state.stepValidate, [field]: value };
  },
  SET_ERROR_DETAIL(state, { field, value }) {
    state.errDetail = { ...state.err, [field]: value };
  },
  SET_INPUT(state, { section, field, value }) {
    state[section] = { ...state[section], [field]: value };
  },
  SET_UPDATE_INPUT(state, product) {
    Object.entries(state.inputDetail).forEach((val) => {
      if (val[0] == "product_images") {
        state.inputDetail[val[0]] = product[val[0]].url;
      } else {
        state.inputDetail[val[0]] = product[val[0]];
      }
    });
    Object.entries(state.inputPrice).forEach((val) => {
      if (
        val[0] === "product_special_price_to" ||
        val[0] === "product_special_price_from"
      ) {
        if (product[val[0]] !== "") {
          const date = new Date(product[val[0]]);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          state.inputPrice[val[0]] = `${year}-${month}-${day}`;
        }
      } else {
        if (product[val[0]] === "" || product[val[0]] === null) {
          state.inputPrice[val[0]] = "";
        } else {
          state.inputPrice[val[0]] = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
            .format(product[val[0]])
            .slice(3);
        }
      }
    });
  },
  DEL_PRODUCTS(state, value) {
    state.products = state.products.filter((val) => val.id !== value);
  },
  CLEAR_DATA_FORM(state, value) {
    state.inputDetail = {
      product_id: "",
      product_sku: "",
      product_name: "",
      product_desc: "",
      product_category: "",
      product_images: [""],
      product_stock: "",
      status: true,
      is_alfa_product: true,
      alfagift_platform: true,
      product_pickup_availability: true,
      product_is_groceries: true,
      id: "",
    };
    state.inputPrice = {
      price: "",
      product_special_price: "",
      product_special_price_to: "",
      product_special_price_from: "",
      product_alfagift_price: "",
    };
    state.stepValidate = {
      first: false,
      second: false,
    };
  },
  ADD_PRODUCT(state, value) {
    state.products.push(value);
  },
  UPDATE_PRODUCT(state, value) {
    state.products = state.products.map((val) =>
      val.product_id === value.product_id ? value : val
    );
  },
  ADD_ROW_IMAGE(state, { section, field, row, value }) {
    const temp = state.inputDetail[field];
    temp.push(value);
    state.inputDetail = { ...state.inputDetail, [field]: temp };
  },
  UPDATE_IMAGE(state, { section, field, row, value }) {
    state[section][field][row] = value;
  },
  REMOVE_ROW_IMAGE(state, { section, field, row }) {
    state[section][field].splice(row, 1);
  },
};

export const actions = {
  async fetchProducts({ commit }, axiosInstance) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$get(API_AUTH_URL + "/products");
      commit("SET_PRODUCTS", res);
    } catch (err) {
      console.log(err);
    } finally {
      commit("SET_ISLOADING", false);
    }
  },
  async createProducts({ commit }, { axiosInstance, value }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$post(API_AUTH_URL + "/products", value);
      commit("ADD_PRODUCT", res);
      return true;
    } catch (err) {
      return false;
    } finally {
      commit("SET_ISLOADING", false);
    }
  },

  async updateProducts({ commit }, { axiosInstance, value }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$put(
        API_AUTH_URL + "/products/" + value.id,
        value
      );
      commit("UPDATE_PRODUCT", res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      commit("SET_ISLOADING", false);
    }
  },
  async deleteProducts({ commit }, { axiosInstance, value }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$delete(
        API_AUTH_URL + "/products/" + value
      );
      commit("DEL_PRODUCTS", value);
      return true;
    } catch (err) {
      return false;
    } finally {
      commit("SET_ISLOADING", false);
    }
  },
  setDataForm({ commit }, product) {
    commit("SET_UPDATE_INPUT", product);
  },
  async changeStatus({ commit }, { axiosInstance, id, val }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$patch(API_AUTH_URL + "/products/" + id, {
        status: val ? 1 : 0,
      });
      setTimeout(() => {
        commit("UPDATE_PRODUCT", res);
      }, 500);

      return true;
    } catch (err) {
      return false;
    } finally {
      commit("SET_ISLOADING", false);
    }
  },
  async searchProduct({ commit }, { axiosInstance, val }) {
    try {
      const res = axiosInstance.$get(API_AUTH_URL + "/products/q=" + val);
      return true;
    } catch (err) {
      return false;
    } finally {
    }
  },
};
