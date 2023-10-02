<template>
  <div>
    <div class="grid gap-2 grid-cols-2">
      <div
        class="px-4 py-3 w-full border rounded-md bg-white border-gray-2 transition-all duration-150 active:bg-gray-1 active:border-gray-3 active:scale-95"
        v-for="(item, index) in props.data"
        :key="index"
        @touchstart="touchstart(index)"
        @touchmove="touchend"
        @touchend="touchend"
        @click="emit('click', item.word)"
      >
        <div class="flex justify-between items-center">
          <div>{{ item.word }}</div>
        </div>
      </div>
    </div>

    <!-- 悬浮框 -->
    <transition name="word_detail">
      <div
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid gap-3 grid-cols-1 p-4 w-90% bg-white rounded-md shadow"
        v-if="isLongPressIndex !== null"
      >
        <!-- 单词和音标 -->
        <div class="flex flex-nowrap justify-between items-center">
          <div class="mr-4 text-5 font-bold">
            {{ props.data[isLongPressIndex].word }}
          </div>
          <div>
            <div>
              英 · /{{ props.data[isLongPressIndex].pronunciation[0] }}/
            </div>
            <div>
              美 · /{{ props.data[isLongPressIndex].pronunciation[1] }}/
            </div>
          </div>
        </div>
        <!-- 单词翻译 -->
        <div class="flex flex-wrap gap-2">
          <div
            class="flex justify-center items-center mr-4"
            v-for="(item, index) in props.data[isLongPressIndex].translation"
            :key="index"
          >
            <div class="px-2 mr-1 bg-indigo-1 text-indigo-7 rounded-1">
              {{ item.pos }}
            </div>
            <div>{{ item.value }}</div>
          </div>
        </div>

        <!-- 单词例句 -->
        <div class="grid gap-y-2 grid-cols-1">
          <div class="text-4">例句</div>
          <div
            class="inline-block px-2 py-1 bg-gray-2 rounded-md"
            v-for="(item, index) in props.data[isLongPressIndex].sentence"
            :key="index"
          >
            <div>
              {{ item }}
            </div>
            <div>
              {{ props.data[isLongPressIndex].sentence_translation[index] }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const emit = defineEmits(["click"]);

const props = defineProps({
  /**
   * 单词
   * @type {Array}
   */
  data: {
    type: Array,
    default: () => [],
  },
});

const isLongPressIndex = ref(null); // 长按的索引

let touchTimer = null; // 触摸定时器
const touchstart = (index) => {
  touchTimer = setTimeout(() => {
    isLongPressIndex.value = index;
  }, 200);
};

const touchend = (e) => {
  clearTimeout(touchTimer);
  touchTimer = null;
  isLongPressIndex.value = null;
};
</script>

<style>
.word_detail-enter-active,
.word_detail-leave-active {
  transition: all 0.3s ease;
}

.word_detail-enter-from,
.word_detail-leave-to {
  opacity: 0;
  /* transform: translate(-50%, -50%) scale(0.8); */
}
</style>
