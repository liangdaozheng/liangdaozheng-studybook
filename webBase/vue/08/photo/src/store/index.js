import Vue from "vue";
import Vuex from "vuex";
import { apiLogin, apiGetPhotos } from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    photos: [],
  },
  mutations: {
    login(state, payload) {
      state.token = payload.token;
      localStorage.setItem("token", state.token);
    },
    updatePhotos(state, payload) {
      state.photos = payload.photos;
    },
  },

  getters: {
    getPhotoById(state) {
      return (id) => {
        return state.photos.find((photo) => photo.id === id);
      };
    },
  },
  actions: {
    async login({ commit }, payload) {
      const { username, password } = payload;
      const { data } = await apiLogin({
        username,
        password,
      });
      commit("login", {
        token: data.data.token,
      });
    },
    async updatePhotos({ commit }) {
      const { data } = await apiGetPhotos();
      commit("updatePhotos", {
        photos: data.data.photos,
      });
    },
  },
});
