import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const baseRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/buttons",
    name: "ButtonsDemo",
    component: () => import("@/views/ButtonsDemo.vue"),
  },
  {
    path: "/modals",
    name: "ModalsDemo",
    component: () => import("@/views/ModalsDemo.vue"),
  },
  {
    path: "/table",
    name: "TableDemo",
    component: () => import("@/views/TableDemo.vue"),
  },
];

const routes: RouteRecordRaw[] = baseRoutes;

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // NOTE: implement some activity before any redirection
    console.log("Hello I could be an authentication guard...");

    return next();
  }
);

export default router;
