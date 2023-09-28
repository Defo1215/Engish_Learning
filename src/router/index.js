import { createRouter, createWebHistory } from "vue-router";

import Index from "../views/index/index.vue";

const routes = [
  {
    path: "/",
    component: Index
  },
];

const router = createRouter({
  history: createWebHistory("/englishLearning/"),
  routes,
});

export default router;
