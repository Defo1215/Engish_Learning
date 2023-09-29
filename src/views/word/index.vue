<template>
  <div>
    <div>当前词书ID为: {{ props.wordBookId }}</div>
  </div>
</template>

<script setup>

const props = defineProps({
  /**
   * 单词书ID
   * @type String
   */
  wordBookId: String,
});

console.log(props.wordBookId)
</script>