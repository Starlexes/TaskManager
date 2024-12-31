<template>
  <div class="tw-flex tw-flex-col tw-gap-10 main-layout">
    <TheHeader />
    <MainContent />
  </div>
</template>

<script setup lang="ts">
import TheHeader from './TheHeader.vue';
import MainContent from './MainContent.vue';
import { checkingTheme } from '../utils/checkingTheme';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
onMounted(() => {
  const theme = checkingTheme();
  store.commit('setTheme', theme);
});
</script>

<style scoped>
.main-layout {
  max-width: 1200px;
}
</style>
