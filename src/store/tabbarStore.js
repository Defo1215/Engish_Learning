import { defineStore } from "pinia";

export const useTabbarStore = defineStore("tabbar", {
  persist: false,
  state: () => ({
    index: 0,
  }),

  actions:{
    changeIndex(index) {
      this.index = index;
    },
  }
});
