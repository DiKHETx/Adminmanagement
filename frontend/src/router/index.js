import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/loginView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: function () {
      return import("../views/registerView.vue");
    },
  },
  {
    path: "/home",
    name: "homePage",
    component: function () {
      return import("../views/homeView.vue");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("accessToken");
  if (to.path !== "/" && to.path !== "/register" && !accessToken) {
    next("/");
  } else {
    next();
  }
});

export default router;
