<template>
  <div>
    <div class="grid gap-4 grid-cols-1 p-4">
      <div class="flex justify-between items-center">
        <TitleBar title="单词" :text-size="'26px'" />
        <n-button
          strong
          secondary
          type="primary"
          @click="$router.push(`/add-word/${wordBookId}`)"
        >
          添加单词
        </n-button>
      </div>

      <WordBox :data="wordData" @click="playAudio"/>
      <audio ref="audioRef" class="hidden" controls="controls"></audio>
    </div>
  </div>
</template>

<script setup>
import TitleBar from "../../components/TitleBar.vue";
import WordBox from "./components/WordBox.vue"
import wordRequest from "../../api/methods/word.js";

import word from "../../config/word.json";

const props = defineProps({
  /**
   * 单词书ID
   * @type String
   */
  wordBookId: String,
});

const wordData = ref([]); // 单词数据
/**
 * 获取单词数据
 */
const getWordData = async () => {
  const { data } = await wordRequest.findByWordBookId(props.wordBookId);
  wordData.value = data.data;
  console.log(wordData.value)
  wordDataFormat()
};

/**
 * 单词数据格式化
 */
const wordDataFormat = () => {
  wordData.value.forEach((item) => {
    item.pronunciation = item.pronunciation.split("/");
    item.sentence = item.sentence.split("/");
    item.sentence_translation = item.sentence_translation.split("/");
    item.translation = item.translation.split("/");
  });

  console.log(wordData.value);
}

const audioRef = ref(null); // 音频ref
/**
 * 播放音频
 * @param {String} word 单词
 */
const playAudio = (word) => {
  audioRef.value.src = `https://dict.youdao.com/dictvoice?audio=${word}&type=2`; //默认美英
  audioRef.value.play();
}

onMounted(() => {
  getWordData()

})
</script>
