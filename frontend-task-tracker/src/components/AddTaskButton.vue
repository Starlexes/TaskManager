<template>
  <button
    @click="addNewTask"
    class="tw-cursor-pointer tw-p-2 tw-max-h-[46px] tw-rounded-full tw-bg-[var(--main-color)] hover:tw-bg-[var(--main-color-hovered)]"
  >
    <ThePlus />
  </button>
</template>

<script setup lang="ts">
import { NEW_TASK_TITLE, NEW_TASK_CATEGORY } from '@/constants/newTaskData.constants';
import ThePlus from '@/icons/ThePlus.vue';
import type { Task } from '@/types/Task.interface';
import { useStore } from 'vuex';

const store = useStore();

const addNewTask = async () => {
  const newTask: Omit<Task, '_id'> = {
    title: `${NEW_TASK_TITLE}`,
    category: NEW_TASK_CATEGORY,
    completed: false,
  };
  store.dispatch('createTask', newTask);
};
</script>

<style scoped></style>
