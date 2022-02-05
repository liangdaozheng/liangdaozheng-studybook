import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Photo from "../views/Photo.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/Photo",
    name: "Photo",
    component: Photo,
    meta: {
      isAuth: true,// 当前路由需要验证
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/details/:id",
    name: "Details",
    component: () =>
      import(/* webpackChunkName: "details" */ "../views/Details.vue"),
    props: true,
    meta: {
      isAuth: true,
    },
  },
  {
    path:'*',
    redirect:'/'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // token
  if (to.meta.isAuth) {
    const token = store.state.token;
    if (token) {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  } else {
    next();
  }
});

export default router;
