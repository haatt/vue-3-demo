import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const baseRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
];

const routes: RouteRecordRaw[] = baseRoutes;

const router = createRouter({
  routes,
});

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    // TODO: implement some activity

    return next();
  }
);

export default router;
