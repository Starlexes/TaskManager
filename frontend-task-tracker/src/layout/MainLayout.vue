<template>
  <div class="tw-flex tw-flex-col tw-w-full tw-flex-1 tw-items-center tw-gap-10 main-layout">
    <TheHeader />
    <MainContent />
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from './TheHeader.vue';
import MainContent from './MainContent.vue';
import { checkingTheme } from '../utils/checkingTheme';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import TheFooter from './TheFooter.vue';
const store = useStore();
onMounted(() => {
  const theme = checkingTheme();
  store.commit('setTheme', theme);
});
</script>

<style scoped></style>
