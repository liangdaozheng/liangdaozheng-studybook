import axios from "axios";
import store from "../store";
import Vue from "vue";
import router from "../router";

const myAxios = axios.create({});

myAxios.interceptors.request.use((config) => {
  const token = store.state.token;
  
  // Bearer jwt 要求的配置字段名称前缀
  token && (config.headers.authorization = "Bearer " + token);

  return config;
});

myAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    // 401 ->
    if (err.response.status === 401) {
      Vue.prototype.$alert("请去登录", "提示", {
        confirmButtonText: "确定",
        callback: () => {
          router.push({
            name: "Login",
          });
        },
      });
    }
  }
);

export default myAxios;
