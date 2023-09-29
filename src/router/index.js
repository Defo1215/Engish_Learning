import { createRouter, createWebHistory } from "vue-router";

import Index from "../views/index/index.vue";
import WordBook from "../views/wordBook/index.vue";

const routes = [
  {
    path: "/",
    component: Index,
    children: [
      {
        path: "",
        component: WordBook,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/englishLearning/"),
  routes,
});

export default router;
