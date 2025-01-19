<template>
  <footer class="tw-w-full tw-flex tw-justify-center tw-p-9 tw-bg-[var(--bg-second-darkT)]">
    <span class="tw-text-white tw-text-2xl tw-leading-none"
      >Developed by
      <a
        class="tw-appearance-none tw-no-underline tw-text-inherit hover:tw-opacity-70"
        target="_blank"
        href="https://github.com/Starlexes/"
        >Starlex</a
      >, {{ currentYear }}</span
    >
  </footer>
</template>

<script setup lang="ts">
import { getCurrentYear } from '@/utils/getCurrentYear';

const currentYear = getCurrentYear();
</script>

<style scoped></style>
