import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import(/* webpackChunkName: "about" */ "@/views/Index")
  },
  {
    path: "/generate",
    name: "generate/index",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/generate/Index")
  },
  {
    path: "/apix",
    name: "apix/index",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/api/Index")
  },
  {
    path: "/json/format",
    name: "json/format",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/json/Format")
  },
  {
    path: "/regular",
    name: "regular/index",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/regular/Index")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
