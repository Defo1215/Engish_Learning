<template>
  <div>
    <div class="grid gap-4 grid-cols-1 p-4">
      <div class="flex justify-between items-center">
        <TitleBar title="单词" :text-size="'26px'" />
      </div>
      <n-input
        v-model:value="value"
        type="textarea"
        placeholder="请输入单词"
        :autosize="{
          minRows: 3,
          maxRows: 10,
        }"
      />
      <div class="flex flex-row-reverse">
        <n-button class="w-25" type="primary" @click="identifyHandler">
          识别并添加
        </n-button>
        <div class="mr-4">
          <n-upload
            ref="upload"
            :default-upload="false"
            :multiple="false"
            :show-file-list="false"
            @change="fileHanlder"
          >
            <n-button>选择文件</n-button>
          </n-upload>
        </div>
      </div>
    </div>

    <n-drawer v-model:show="drawerVisible" placement="bottom" height="90%">
      <n-drawer-content header-style="display:block;">
        <template #header>
          <div class="flex justify-between items-center">
            <div>识别结果</div>
            <div
              class="i-ep-close-bold text-5"
              @click="drawerVisible = false"
            />
          </div>
        </template>

        <template #footer>
          <div class="flex justify-between items-center">
            <n-button class="mr-4" type="primary" @click="submitSuccessHandler">
              仅添加识别成功的
            </n-button>
            <n-button class="" type="default" @click="submitAllHandler">
              全部添加
            </n-button>
          </div>
        </template>

        <div class="flex flex-wrap gap-3">
          <div
            class="flex justify-between items-center gap-3 px-3 py-1 bg-pink-50 ring-offset-1 ring-2 ring-red-200 rounded-md text-red-6"
            v-for="(data, index) in addWordsList.fail"
            :key="index"
          >
            {{ data.word }}
          </div>
          <div
            class="flex justify-between items-center gap-3 px-3 py-1 bg-green-50 ring-offset-1 ring-2 ring-green-200 rounded-2 text-green-6"
            v-for="(data, index) in addWordsList.success"
            :key="index"
          >
            {{ data.word }}
            <div class="i-uil-arrow-right text-6 text-green-5" />
            {{ data.translation?.split("；")[0] }}
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

  const result = {
    success: [],
    fail: [],
  };

  if (res.data.code === 200) {
    // 创建一个字典对象，以便更容易地将结果与单词关联起来
    const wordMap = {};
    for (const word of res.data.data) {
      wordMap[word.word] = word;
    }

    // 将结果分别添加到 success 和 fail 数组中
    for (const word of words) {
      if (wordMap.hasOwnProperty(word)) {
        result.success.push(wordMap[word]);
      } else {
        result.fail.push({
          word: word,
          id: null,
        });
      }
    }
  } else {
    // 如果请求失败，将所有单词都添加到 fail 数组中
    result.fail = words.map((word) => ({
      word: word,
      id: null,
    }));
  }

  console.log(result);
  addWordsList.value = result;
  drawerVisible.value = true;
};

const submitAllHandler = async () => {
  const res = await wordRequest.addWord([
    ...addWordsList.value.fail.map((word) => {
      return {
        ...word,
        word_book_id: props.wordBookId,
        id: "",
        create_time: 0,
        update_time: 0,
      };
    }),
    ...addWordsList.value.success.map((word) => {
      return {
        ...word,
        word_book_id: props.wordBookId,
        id: "",
        create_time: 0,
        update_time: 0,
      };
    }),
  ]);

  if (res.data.code !== 200) {
    window.$message.fail("添加失败");
    return;
  }

  drawerVisible.value = false;
  window.$message.success("添加成功");
};

const submitSuccessHandler = async () => {
  const res = await wordRequest.addWord([
    ...addWordsList.value.success.map((word) => {
      return {
        ...word,
        word_book_id: props.wordBookId,
        id: "",
        create_time: 0,
        update_time: 0,
      };
    }),
  ]);
  console.log(res.data);

  if (res.data.code !== 200) {
    window.$message.fail("添加失败");
    return;
  }

  drawerVisible.value = false;
  window.$message.success("添加成功");
};

const fileHanlder = (option) => {

  console.log(option)

  const reader = new FileReader();
  reader.readAsText(option.file.file);
  reader.onload = (e) => {
    console.log(e.target.result);
    value.value = e.target.result;
  };
}

const props = defineProps({
  wordBookId: String,
});
</script>
