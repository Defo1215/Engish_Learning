import { createRouter, createWebHistory } from "vue-router";

import Index from "../views/index/index.vue";
import WordBook from "../views/wordBook/index.vue";
import Word from "../views/word/index.vue";

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
  {
    path: "/word/:wordBookId",
    component: Word,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory("/englishLearning/"),
  routes,
});

export default router;
