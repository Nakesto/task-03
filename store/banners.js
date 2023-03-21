import { API_AUTH_URL } from "./regis";

export const state = () => ({
  banners: [],
  isLoading: false,
  progress: 25,
});

export const getters = {
  getBanners(state) {
    return state.banners;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
  getProgress(state) {
    return state.progress;
  },
};

export const mutations = {
  SET_BANNERS(state, value) {
    state.banners = value;
  },
  SET_ISLOADING(state, value) {
    state.isLoading = value;
  },
  ADD_BANNERS(state, value) {
    state.banners.push(value);
  },
  UPDATE_BANNERS(state, value) {
    state.banners = state.banners.map((val) =>
      val.id === value.id ? value : val
    );
  },
  DELETE_BANNERS(state, value) {
    state.banners = state.banners.filter((val) => val.id !== value);
  },
  SET_PROGRESS(state, value) {
    state.progress = value;
  },
};

export const actions = {
  async fetchBanners({ commit }, axios) {
    try {
      const res = await axios.$get(API_AUTH_URL + "/banners");
      commit("SET_BANNERS", res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async createBanners({ commit }, { axiosInstance, value }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$post(API_AUTH_URL + "/banners", value);
      commit("ADD_BANNERS", res);
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
  async updateBanners({ commit }, { axiosInstance, value, id }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$patch(
        API_AUTH_URL + "/banners/" + id,
        value
      );
      commit("UPDATE_BANNERS", res);
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
  async deleteBanners({ commit }, { axiosInstance, id }) {
    try {
      commit("SET_ISLOADING", true);
      const res = await axiosInstance.$delete(API_AUTH_URL + "/banners/" + id);
      commit("DELETE_BANNERS", id);
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
      const res = await axiosInstance.$get(API_AUTH_URL + "/banners?q=" + val);
      commit("SET_BANNERS", res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};
