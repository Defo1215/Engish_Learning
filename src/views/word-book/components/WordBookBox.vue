<template>
  <div >
    <!-- 单个显示模式 -->
    <div class="grid gap-2 grid-cols-1" v-if="props.showMode === 'single' && props.data !== null">
      <div
        class="p-4 w-full rounded-md bg-white"
        @click="emit('click', props.data)"
      >
        <div class="flex justify-between items-center">
          <div>{{ props.data.word_book_name }}</div>
          <div class="text-gray-3">总词数 · {{ props.data.word_count }}</div>
        </div>
      </div>
    </div>

    <!-- 多个显示模式 -->
    <div class="grid gap-2 grid-cols-1" v-if="props.showMode === 'multiple' && props.data.length > 0">
      <div
        class="p-4 w-full rounded-md bg-white"
        v-for="(item, index) in props.data"
        :key="index"
        @click="emit('click', item)"
      >
        <div class="flex justify-between items-center">
          <div>{{ item.word_book_name }}</div>
          <div class="text-gray-3">总词数 · {{ item.word_count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const emit = defineEmits(["click"]);

const props = defineProps({
  /**
   * 单词书数据
   * @type {Array || Object}
   */
  data: Array || Object,

  /**
   * 显示模式
   * @default single 单个显示
   * @type {String}
   * @values single, multiple
   */
  showMode: String,
});

console.log(props.data)
</script>
