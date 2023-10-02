<template>
  <div>
    <!-- 单词页面顶部 -->
    <div class="grid gap-2 grid-cols-1 px-4 pb-4">
      <div
        class="sticky top-0 flex justify-between items-center pb-2 pt-4 bg-[#f0f2f5]"
      >
        <!-- 标题栏 -->
        <TitleBar title="单词" :text-size="'26px'" />
        <div class="flex justify-between items-center">
          <!-- 发音类型切换开关 -->
          <n-switch
            v-model:value="pronounceType"
            class="mr-4"
            :round="false"
            :rail-style="railStyle"
            :loading="audio.loading.value"
          >
            <template #checked> 美 </template>
            <template #unchecked> 英 </template>
          </n-switch>
          <!-- 添加单词按钮 -->
          <n-button
            strong
            secondary
            type="primary"
            @click="$router.push(`/add-word/${wordBookId}`)"
          >
            添加单词
          </n-button>
        </div>
      </div>

      <!-- 单词加载骨架屏 -->
      <div class="grid gap-2 grid-cols-2" v-if="wordData.length === 0">
        <n-skeleton class="rounded-md" height="47px" v-for="n in 5" :key="n" />
      </div>

      <!-- 单词展示组件 -->
      <WordBox :data="wordData" @click="playAudio" />
    </div>
  </div>
</template>

<script setup>
import TitleBar from "../../components/TitleBar.vue";
import WordBox from "./components/WordBox.vue";
import wordRequest from "../../api/methods/word.js";
import { useAudio } from "../../utils/audio";
import { ref } from "vue";

const props = defineProps({
  /**
   * 单词书ID
   * @type String
   */
  wordBookId: String,
});

const wordData = ref([]); // 单词数据

const audio = useAudio(); // 播放器实例
const pronounceType = ref(true); // 发音类型(true: 美音, false: 英音)

/**
 * 获取单词数据
 */
const getWordData = async () => {
  const { data } = await wordRequest.findByWordBookId(props.wordBookId);
  wordData.value = data.data;
  console.log(wordData.value);
  wordDataFormat();
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
    item.translation = item.translation.map((item) => {
      return {
        pos: item.split(".")[0], // 词性
        value: item.split(".")[1], // 词义
      };
    });
  });
};

/**
 * 播放音频
 * @param {String} word 单词
 */
const playAudio = (word) => {
  const url = `https://dict.youdao.com/dictvoice?audio=${word}&type=${
    pronounceType.value ? 2 : 1
  }`;
  audio.set(url);
};

/**
 * 美英切换按钮
 */
const railStyle = ({ focused, checked }) => {
  const style = {};
  if (checked) {
    style.backgroundColor = "#6cc095";
    if (focused) {
      style.boxShadow = "0 0 0 2px #6cc09540";
    }
  } else {
    style.backgroundColor = "#2080f0";
    if (focused) {
      style.boxShadow = "0 0 0 2px #2080f040";
    }
  }

  return style;
};

onMounted(() => {
  getWordData();
});
</script>
