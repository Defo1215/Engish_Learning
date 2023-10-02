<template>
  <div>
    <div class="grid gap-4 grid-cols-1 p-4">
      <div class="flex justify-between items-center">
        <TitleBar title="单词" :text-size="'26px'" />
      </div>
      <n-input v-model:value="value" type="textarea" placeholder="请输入单词" />
      <div class="flex justify-right">
        <n-button class="w-15" type="info" @click="identifyHandler">
          添加
        </n-button>
      </div>
    </div>

    <n-drawer v-model:show="drawerVisible" placement="bottom" height="90%">
      <n-drawer-content header-style="display:block;">
        <template #header>
          <div class="flex justify-between items-center">
            <div>识别结果</div>
            <n-button class="" type="info" @click="submitHandler">
              确认添加
            </n-button>
          </div>
        </template>

        <div class="flex flex-wrap gap-3">
          <div
            class="flex justify-between items-center gap-3 px-3 py-2 border rounded-md"
            v-for="(data, index) in addWordsList"
            :key="index"
          >
            {{ data.word }} ->
            {{
              data.id !== null
                ? data.translation.split("；")[0] + "..."
                : "未找到"
            }}
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup>
import TitleBar from "../../components/TitleBar.vue";
import wordRequest from "../../api/methods/word.js";
import dictionaryRequest from "../../api/methods/dictionary.js";
import { create } from "naive-ui";

const value = ref(""); // 输入框的值
const addWordsList = ref([]); // 添加的单词列表
const drawerVisible = ref(false); // 抽屉是否可见

const identifyHandler = async () => {
  if (!value.value) {
    return;
  }

  const words = value.value.split("\n").map((word) => {
    return word.replace(/\s/g, "");
  });

  const res = await dictionaryRequest.findByWords(words); // 通过单词查找单词信息

  if (res.data.code === 200) {
    // 创建一个字典对象，以便更容易地将结果与单词关联起来
    const wordMap = {};
    for (const word of res.data.data) {
      wordMap[word.word] = word;
    }

    // 将结果转移到addWordsList
    addWordsList.value = words.map((word) => {
      if (wordMap.hasOwnProperty(word)) {
        return wordMap[word];
      } else {
        return {
          word: word,
          id: null,
        };
      }
    });
  }

  console.log(addWordsList.value);
  drawerVisible.value = true;
};

const submitHandler = async () => {
  const res = await wordRequest.addWord(
    [...addWordsList.value.map((word) => {
      if (word.id !== null) {
        return {
          ...word,
          word_book_id: props.wordBookId,
          id: "",
          create_time: 0,
          update_time: 0,
        };
      }
    })],
  );
  console.log(res.data);
};

const props = defineProps({
  wordBookId: String,
});
</script>
