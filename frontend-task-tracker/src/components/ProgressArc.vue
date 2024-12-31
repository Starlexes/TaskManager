<template>
  <div class="flex flex-col items-center justify-center tw-h-max tw-relative">
    <ProgressBarRing :ringRadius="ringRadius" :strokeDasharray="strokeDashCurrent" />
    <ProgressBarStroke />
    <div
      class="text-xl tw-font-bold tw-absolute tw-bottom-0 tw-left-1/2 tw-transform tw--translate-x-1/2 tw-text-[var(--main-color)] dark:tw-text-white tw-text-base tw-leading-4 progress-value"
    >
      {{ progress }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

import ProgressBarStroke from '@/icons/ProgressBar/ProgressBarStroke.vue';
import ProgressBarRing from '@/icons/ProgressBar/ProgressBarRing.vue';

const store = useStore();

const countCompletedTasks = computed(() => store.getters.countCompletedTasks);
const countTasks = computed(() => store.getters.countTasks);

const ringRadius = ref<number>(40);
const strokeDasharray = computed<number>(() => Math.ceil(Math.PI * ringRadius.value));

const strokeDashCurrent = ref<number>(strokeDasharray.value);

const progress = computed(() => {
  if (!countCompletedTasks.value || !countTasks.value) {
    return 0;
  } else {
    return Math.round((countCompletedTasks.value / countTasks.value) * 100);
  }
});

const animateProgress = (value: number) => {
  strokeDashCurrent.value =
    strokeDasharray.value + Math.ceil((strokeDasharray.value * value) / 100);
};

watch(progress, (newValue) => animateProgress(newValue));

onMounted(() => {
  animateProgress(progress.value);
});
</script>

<style scoped>
.progress-value {
  font-family: Nunito, Helvetica, Arial, sans-serif;
}
</style>
