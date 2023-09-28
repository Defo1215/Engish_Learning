<template>
  <div>
    <!-- 底部tabbar -->
    <div class="absolute bottom-0 w-full p-3 ">
      <Tabbar :tabs-content="tabsContent"/>
    </div>
    
  </div>
</template>

<script setup>
import Tabbar from "../../components/Tabbar.vue";

const tabsContent = [
  {
    text: "单词",
    icon: "i-carbon-book",
    path: "/",
  },
  {
    text: "短语",
    icon: "i-carbon-chart-custom",
    path: "/phrase",
  },
  {
    text: "语法",
    icon: "i-carbon-chart-bubble-packed",
    path: "/grammar",
  },
  {
    text: "写作",
    icon: "i-carbon-pen",
    path: "/composition",
  }
]
</script>
