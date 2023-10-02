<template>
  <div>
    <div class="grid gap-4 grid-cols-1 p-4">
      <!--标题 -->
      <TitleBar title="单词书" :text-size="'26px'"/>

      <!-- 单词书数据 -->
      <WordBookBox show-mode="multiple" :data="wordBookData" @click="wordBookBoxClick" />
    </div>
  </div>
</template>

<script setup>
import wordBook from "../../config/wordBook.json"
import router from "../../router";
import TitleBar from "../../components/TitleBar.vue";
import WordBookBox from "./components/WordBookBox.vue";
import wordBookRequest from "../../api/methods/word-book.js";

/**
 * 单词书点击事件
 * @param {Object} item 单词书数据
 */
const wordBookBoxClick = (item) => {
  router.push(`/word/${item.id}`)
};

const wordBookData = ref([]); // 单词书数据
/**
 * 获取单词书数据
 */
const getWordBookData = async () => {
  const { data } = await wordBookRequest.findAll();
  wordBookData.value = data.data;
  console.log(wordBookData.value)
};

onMounted(() => {
  getWordBookData()
})
</script>
