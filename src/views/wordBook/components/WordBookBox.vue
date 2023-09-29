<template>
  <div >
    <!-- 单个显示模式 -->
    <div class="grid gap-2 grid-cols-1" v-if="props.showMode === 'single'">
      <div
        class="p-4 w-full rounded-md bg-white"
      >
        <div class="flex justify-between items-center">
          <div>{{ props.data.WordBookName }}</div>
          <div class="text-gray-3">总词数 · {{ props.data.quantity }}</div>
        </div>
      </div>
    </div>

    <!-- 多个显示模式 -->
    <div class="grid gap-2 grid-cols-1" v-if="props.showMode === 'multiple'">
      <div
        class="p-4 w-full rounded-md bg-white"
        v-for="(item, index) in props.data"
        :key="index"
      >
        <div class="flex justify-between items-center">
          <div>{{ item.WordBookName }}</div>
          <div class="text-gray-3">总词数 · {{ item.quantity }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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

console.log(props.data);
</script>
