<template>
  <button
    class="tw-flex tw-p-2 tw-max-h-[46px] tw-items-center tw-justify-center tw-rounded-[10px] tw-bg-[var(--main-color)] hover:tw-bg-[var(--main-color-hovered)]"
    @click="handleClick"
  >
    <TheSun v-if="theme === 'dark'" />
    <TheMoon v-else />
  </button>
</template>

<script setup lang="ts">
import TheMoon from '../icons/TheMoon.vue';
import TheSun from '../icons/TheSun.vue';
import { computed } from 'vue';
import { toggleTheme } from '../utils/toggleTheme';
import { useStore } from 'vuex';
import type { Theme } from '../types/Theme.type';
const store = useStore();
const theme = computed((): Theme => store.getters.theme);
const handleClick = () => {
  if (theme.value === 'dark') {
    store.commit('setTheme', 'light');
  } else store.commit('setTheme', 'dark');
  toggleTheme();
};
</script>

<style scoped></style>
