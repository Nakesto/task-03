import axios from "axios";
import { getCookie, setCookie } from "../utils/cookies";

export const API_URL = "http://localhost:3200";
export const API_AUTH_URL = "http://localhost:3200/660";

export const state = () => ({
  input: {
    fName: "",
    lName: "",
    email: "",
    phone: "",
    pass: "",
    confirmPass: "",
  },
  data: localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : null,
  accessToken:
    getCookie("accessToken") !== "" ? getCookie("accessToken") : null,
  err: {
    fName: "",
    lName: "",
    email: "",
    phone: "",
    pass: "",
    confirmPass: "",
  },
  users: [],
  errLoginMsg: "",
  errRegisMsg: "",
  isLoading: false,
  isLogin: localStorage.getItem("isLogin")
    ? JSON.parse(localStorage.getItem("isLogin"))
    : false,
});

export const getters = {
  getData(state) {
    return state.data;
  },
  getErrors(state) {
    return state.err;
  },
  getUsers(state) {
    return state.users;
  },
  getMsgLoginError(state) {
    return state.errLoginMsg;
  },
  getMsgRegisError(state) {
    return state.errRegisMsg;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
  getIsLogin(state) {
    return state.isLogin;
  },
};

export const mutations = {
  SET_INPUT(state, { field, value }) {
    state.input = { ...state.input, [field]: value };
  },
  SET_DATA(state, { field, value }) {
    state.data = { ...state.data, [field]: value };
    localStorage.setItem(
      "data",
      JSON.stringify({ ...state.data, [field]: value })
    );
  },
  SET_ERROR(state, { field, value }) {
    state.err = { ...state.err, [field]: value };
  },
  SET_USER(state, value) {
    state.users = value;
  },
  SET_ERR_LOGIN_MESSAGE(state, value) {
    state.errLoginMsg = value;
  },
  SET_ERR_REGIS_MESSAGE(state, value) {
    state.errRegisMsg = value;
  },
  UPDATE_USER(state, value) {
    state.users = state.users.map((val) => (val.id === value.id ? value : val));
  },
  DEL_USER(state, value) {
    state.users = state.users.filter((val) => val.id !== value);
  },
  SET_ISLOADING(state, value) {
    state.isLoading = value;
  },
  SET_ISLOGIN(state, value) {
    state.isLogin = value;
    localStorage.setItem("isLogin", value);
  },
  SET_ACCESSTOKEN(state, value) {
    state.accessToken = value;
    // localStorage.setItem("accessToken", value);
    setCookie("accessToken", value, 30);
  },
  RESET_INPUT(state, value) {
    state.err = {
      fName: "",
      lName: "",
      email: "",
      phone: "",
      pass: "",
      confirmPass: "",
    };
  },
  RESET_VALIDATION(state, value) {
    state.input = {
      fName: "",
      lName: "",
      email: "",
      phone: "",
      pass: "",
      confirmPass: "",
    };
  },
};

export const actions = {
  successRegis({ commit }, value) {
    Object.entries(value).forEach((val) => {
      commit("SET_DATA", { field: val[0], value: val[1] });
    });
  },
  failedValidation({ commit }, value) {
    commit("SET_ERROR", value);
  },
  async postRegister({ commit }, value) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axios.post(API_URL + "/register", value);
      if (res.status === 201) {
        Object.entries(res.data.user).forEach((val) => {
          if (val[0] !== "pass" || val[0] !== "confirmPass") {
            commit("SET_DATA", { field: val[0], value: val[1] });
          }
        });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      commit("SET_ERR_REGIS_MESSAGE", err.data);
      return false;
    } finally {
      commit("SET_ISLOADING", false);
    }
  },
  async fetchUser({ commit }, axiosInstance) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$get(API_AUTH_URL + "/users");
      commit("SET_USER", res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      commit("SET_ISLOADING", false);
    }
  },
  async updateUser({ commit }, { axiosInstance, value }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$patch(
        API_AUTH_URL + "/users/" + value.id,
        value
      );
      setTimeout(() => {
        commit("UPDATE_USER", value);
      }, 850);
      return true;
    } catch (err) {
      return false;
    } finally {
      setTimeout(() => {
        commit("SET_ISLOADING", false);
      }, 850);
    }
  },
  async deleteUser({ commit }, { axiosInstance, value }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$delete(API_AUTH_URL + "/users/" + value);
      commit("DEL_USER", value);
      return true;
    } catch (err) {
      return false;
    } finally {
      commit("SET_ISLOADING", false);
    }
  },
  async loginUser({ commit }, { axiosInstance, value }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$post(API_URL + "/login", value);
      Object.entries(res.user).forEach((val) => {
        if (val[0] !== "pass" || val[0] !== "confirmPass") {
          commit("SET_DATA", { field: val[0], value: val[1] });
        }
      });
      commit("SET_ACCESSTOKEN", res.accessToken);
      commit("SET_ISLOGIN", true);
      return true;
    } catch (err) {
      commit("SET_ERR_LOGIN_MESSAGE", err.data);
      return false;
    } finally {
      commit("SET_ISLOADING", false);
    }
  },
  logout({ commit }, value) {
    localStorage.removeItem("data");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("accessToken");
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },
};
