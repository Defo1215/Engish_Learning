<template>
  <div>
    <div class="grid gap-4 grid-cols-1 p-4">
      <div class="flex justify-between items-center">
        <TitleBar title="单词" :text-size="'26px'" />
        <n-button strong secondary type="primary"> 添加单词 </n-button>
      </div>

      <WordBox :data="word" />
    </div>
  </div>
</template>

<script setup>
import TitleBar from "../../components/TitleBar.vue";
import WordBox from "./components/WordBox.vue";

import word from "../../config/word.json";

const props = defineProps({
  /**
   * 单词书ID
   * @type String
   */
  wordBookId: String,
});

console.log(props.wordBookId);
</script>
