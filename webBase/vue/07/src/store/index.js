/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import { apiGetUsers, apiModifyUser, apiDeleteUser } from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    users: [],
    currentModifyIndex: 0,
  },

  getters: {
    currentModifyItem(state) {
      return state.users[state.currentModifyIndex];
    },
  },
  mutations: {
    initUsers(state, { users }) {
      console.log(users,'users');
      state.users = users;
    },
    deleteUser(state, { index }) {
      // 删除指定的数据
      state.users.splice(index, 1);
    },

    changeModifyIndex(state, { index }) {
      state.currentModifyIndex = index;
    },

    modifyUser(state, { id, hobby, username, email, gender }) {
      function findDataById(id) {
        return state.users.find((user) => user.id === id);
      }

      const item = findDataById(id);
      if (item) {
        item.hobby = hobby;
        item.username = username;
        item.email = email;
        item.gender = gender;
      }
    },
    login(state, { username }) {
      state.username = username;

      const userInfo = {
        username,
      };
      localStorage.setItem("user", JSON.stringify(userInfo));
    },
  },
  actions: {
    async fetchUsers({ commit }, payload) {
      console.log(payload);
      const { data } = await apiGetUsers();
      commit("initUsers", { users: data.data });
    },

    async modifyUser({ commit }, payload) {
      const { data } = await apiModifyUser(payload);
      commit("initUsers", { users: data.data });
    },

    async deleteUser({ commit }, { id }) {
      const { data } = await apiDeleteUser(id);
      commit("initUsers", { users: data.data });
    },
  },
  modules: {},
});
