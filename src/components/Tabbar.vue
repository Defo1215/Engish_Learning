<template>
  <div class="w-full py-3 bg-[#A5B4FC] rounded-4 overflow-hidden">
    <!-- 选择框 -->
    <div
      class="absolute left-0 h-10 rounded-xl bg-[#6366F1] transition-all duration-300"
      :style="{
        width: selectBox.width + 'px',
        transform: 'translateX(' + selectBox.translateX + 'px)',
      }"
    />
    <!-- 图标与标题 -->
    <div ref="tabItemRef" class="flex justify-around items-center">
      <div
        class="flex items-center px-3 py-1 gap-2 text-white font-bold z-100"
        v-for="(data, index) in tabsContent"
        :key="index"
        @click="changeTab(index)"
      >
        <div class="text-3xl" :class="data.icon" />
        <div
          class="text-sm transition-all duration-300"
          :class="
            tabbarStore.index === index
              ? 'opacity-100'
              : 'opacity-0 -translate-x-10'
          "
        >
          {{ tabbarStore.index === index ? data.text : "" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick } from "vue";
import { useTabbarStore } from "../store/tabbarStore";

const tabbarStore = useTabbarStore(); // 获取tabbar的store

const props = defineProps({
  tabsContent: Array, // tabbar的内容
});

const tabItemRef = ref(null); // 获取tabbar的dom节点

const selectBox = ref({ // 选择框的宽度与偏移量
  width: 0,
  translateX: 0,
});

/**
 * 切换tab
 * @param {number} index 选中的tab索引
 */
const changeTab = (index) => {
  tabbarStore.changeIndex(index); // 改变tabbar的索引

  // 通过nextTick确保dom已经渲染完毕
  nextTick(() => {
    const tabItem = tabItemRef.value.children[index]; // 获取选中的tab

    const tabItemWidth = tabItem.offsetWidth; // 获取选中的tab的宽度
    const tabItemLeft = tabItem.offsetLeft; // 获取选中的tab的偏移量

    selectBox.value.width = tabItemWidth; // 设置选择框的宽度
    selectBox.value.translateX = tabItemLeft; // 设置选择框的偏移量
  });
};

onMounted(() => {
  changeTab(tabbarStore.index); // 初始化tabbar的索引
});
</script>

<style></style>
