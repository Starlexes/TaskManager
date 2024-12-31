<template>
  <svg
    width="100"
    height="50"
    viewBox="0 0 100 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g fill="none" class="tw-stroke-white">
      <circle cx="50" cy="50" :r="ringRadius" :stroke-width="strokeDashWidth" />
      <circle
        cx="50"
        cy="50"
        :r="ringRadius"
        class="tw-stroke-[var(--main-color)] dark:tw-stroke-[var(--main-color)] tw-duration-[1s]"
        :stroke-width="strokeDashWidth"
        :stroke-dasharray="strokeDasharray"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
const props = defineProps({
  ringRadius: {
    type: Number,
    required: true,
  },
  strokeDasharray: {
    type: Number,
    required: true,
  },
});

const ringRadius = ref<number>(props.ringRadius);
const strokeDasharray = computed<number>(() => props.strokeDasharray);
const strokeDashWidth = computed<number>(() => Math.ceil(ringRadius.value / 2));
</script>

<style scoped>
svg {
  overflow: visible;
  max-width: 100%;
}

svg {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
}
</style>
