import Vue from "vue";
import Router from "vue-router";
import { interopDefault } from "./.nuxt/utils";
import DashboardLayout from "./layouts/DashboardLayout.vue";

const index = () => interopDefault(import("~/pages/index.vue"));
const register = () => interopDefault(import("~/pages/register.vue"));
const users = () => interopDefault(import("~/pages/users.vue"));
const products = () => interopDefault(import("~/pages/products.vue"));
const login = () => interopDefault(import("~/pages/login.vue"));
const create = () => interopDefault(import("~/pages/createproduct.vue"));
const child = () => interopDefault(import("~/pages/child.vue"));
const detail = () => interopDefault(import("~/pages/detail.vue"));
const update = () => interopDefault(import("~/pages/updateproduct.vue"));
const error = () => interopDefault(import("~/pages/error.vue"));
const store = () => interopDefault(import("~/pages/officialstore.vue"));
const banners = () => interopDefault(import("~/pages/banners.vue"));

Vue.use(Router);
export function createRouter() {
  return new Router({
    routes: [
      {
        path: "/",
        component: DashboardLayout,
        children: [
          {
            path: "/",
            component: index,
            name: "index",
          },
          {
            path: "users",
            component: users,
            name: "users",
          },
          {
            path: "products",
            component: child,
            children: [
              {
                path: "/",
                component: products,
                name: "products",
              },
              {
                path: "create",
                component: create,
                name: "create",
              },
              {
                path: "detail",
                component: detail,
                name: "detail",
                props: true,
                beforeEnter(to, from, next) {
                  if (!to.params.productId) {
                    if (from.name === null) {
                      return next({
                        name: "products",
                      });
                    }
                    return next({
                      name: from.name,
                    });
                  }
                  return next();
                },
              },
              {
                path: "update",
                component: update,
                name: "update",
                props: true,
                beforeEnter(to, from, next) {
                  if (!to.params.productId) {
                    if (from.name === null) {
                      return next({
                        name: "products",
                      });
                    }
                    return next({
                      name: from.name,
                    });
                  }
                  return next();
                },
              },
            ],
          },
          {
            path: "store",
            component: store,
            name: "store",
          },
          {
            path: "banners",
            component: banners,
            name: "banners",
          },
        ],
      },
      {
        path: "/login",
        component: login,
        name: "login",
      },
      {
        path: "/register",
        component: register,
        name: "register",
      },
      {
        path: "*",
        component: error,
        name: "error",
      },
    ],
    linkActiveClass: "nuxt-link-active",
    linkExactActiveClass: "nuxt-link-exact-active",
    mode: "history",
  });
}
