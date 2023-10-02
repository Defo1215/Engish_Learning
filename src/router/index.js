import { createRouter, createWebHistory } from "vue-router";

import Index from "../views/index/index.vue";
import WordBook from "../views/word-book/index.vue";
import Word from "../views/word/index.vue";
import AddWord from "../views/add-word/index.vue";

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
    path: "/phrase",
    component: Index
  },
  {
    path: "/word/:wordBookId",
    component: Word,
    props: true
  },
  {
    path: "/add-word/:wordBookId",
    component: AddWord,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory("/englishLearning/"),
  routes,
});

export default router;
