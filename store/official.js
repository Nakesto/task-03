import { API_AUTH_URL } from "./regis";

export const state = () => ({
  brands: [],
  officialStore: [],
  isLoading: false,
  progress: 25,
});

export const getters = {
  getBrands(state) {
    return state.brands;
  },
  getOfficialStore(state) {
    return state.officialStore;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
  getProgress(state) {
    return state.progress;
  },
};

export const mutations = {
  SET_BRANDS(state, value) {
    state.brands = value;
  },
  SET_STORES(state, value) {
    state.officialStore = value;
  },
  SET_ISLOADING(state, value) {
    state.isLoading = value;
  },
  ADD_STORES(state, value) {
    state.officialStore.push(value);
  },
  UPDATE_STORES(state, value) {
    state.officialStore = state.officialStore.map((val) =>
      val.id === value.id ? value : val
    );
  },
  DELETE_STORES(state, value) {
    state.officialStore = state.officialStore.filter((val) => val.id !== value);
  },
  SET_PROGRESS(state, value) {
    state.progress = value;
  },
};

export const actions = {
  async fetchBrands({ commit }, axios) {
    try {
      const res = await axios.$get(API_AUTH_URL + "/brands");
      commit("SET_BRANDS", res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async fetchOfficialStore({ commit }, axiosInstance) {
    try {
      const res = await axiosInstance.$get(API_AUTH_URL + "/officialStores");
      commit("SET_STORES", res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async createOfficialStore({ commit }, { axiosInstance, value }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$post(
        API_AUTH_URL + "/officialStores",
        value
      );
      commit("ADD_STORES", res);
      return true;
    } catch (err) {
      return false;
    } finally {
      setTimeout(() => {
        commit("SET_ISLOADING", false);
      }, 600);
      commit("SET_PROGRESS", 100);
    }
  },
  async updateOfficialStore({ commit }, { axiosInstance, value, id }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$patch(
        API_AUTH_URL + "/officialStores/" + id,
        value
      );
      commit("UPDATE_STORES", res);
      return true;
    } catch (err) {
      return false;
    } finally {
      setTimeout(() => {
        commit("SET_ISLOADING", false);
      }, 600);
      commit("SET_PROGRESS", 100);
    }
  },
  async deleteOfficialStore({ commit }, { axiosInstance, id }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$delete(
        API_AUTH_URL + "/officialStores/" + id
      );
      commit("DELETE_STORES", id);
      return true;
    } catch (err) {
      return false;
    } finally {
      setTimeout(() => {
        commit("SET_ISLOADING", false);
      }, 600);
      commit("SET_PROGRESS", 100);
    }
  },
  async searchOfficialStore({ commit }, { axiosInstance, val }) {
    try {
      const res = await axiosInstance.$get(
        API_AUTH_URL + "/officialStores?q=" + val
      );
      commit("SET_STORES", res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};
