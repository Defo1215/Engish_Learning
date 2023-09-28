<template>
  <GlobalProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </GlobalProvider>
</template>

<script setup>
import GlobalProvider from "./components/GlobalProvider.vue";
</script>
