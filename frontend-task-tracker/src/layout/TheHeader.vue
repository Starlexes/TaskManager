<template>
  <header class="tw-sticky tw-top-0 tw-z-10 tw-bg-[--bg-main] dark:tw-bg-[var(--bg-main-darkT)]">
    <div class="tw-flex tw-flex-col tw-gap-8 tw-items-center">
      <TheLogo />
      <ActionMenu />
    </div>
  </header>
</template>

<script setup lang="ts">
import TheLogo from '../components/TheLogo.vue';
import ActionMenu from './ActionMenu.vue';
</script>

<style scoped></style>
