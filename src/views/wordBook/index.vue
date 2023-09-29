<template>
  <div>
    <div class="grid gap-2 grid-cols-1 p-4">
      <!--标题 -->
      <TitleBar title="单词书" :text-size="'26px'"/>

      <!-- 单词书数据 -->
      <WordBookBox show-mode="multiple" :data="word" />
    </div>
  </div>
</template>

<script setup>
import word from "../../config/word.json"
import TitleBar from "./components/TitleBar.vue";
import WordBookBox from "./components/WordBookBox.vue";


</script>
