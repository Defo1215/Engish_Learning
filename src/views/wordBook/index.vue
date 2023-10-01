<template>
  <div>
    <div class="grid gap-4 grid-cols-1 p-4">
      <!--标题 -->
      <TitleBar title="单词书" :text-size="'26px'"/>

      <!-- 单词书数据 -->
      <WordBookBox show-mode="multiple" :data="wordBook" @click="wordBookBoxClick" />
    </div>
  </div>
</template>

<script setup>
import wordBook from "../../config/wordBook.json"
import router from "../../router";
import TitleBar from "../../components/TitleBar.vue";
import WordBookBox from "./components/WordBookBox.vue";

/**
 * 单词书点击事件
 * @param {Object} item 单词书数据
 */
const wordBookBoxClick = (item) => {
  router.push(`/word/${item.id}`)
};
</script>
