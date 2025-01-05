<template>
  <button
    @click="addNewTask"
    class="tw-cursor-pointer tw-p-2 tw-max-h-[46px] tw-rounded-full tw-bg-[var(--main-color)] hover:tw-bg-[var(--main-color-hovered)]"
  >
    <ThePlus />
  </button>
</template>

<script setup lang="ts">
import { newTaskTitle, newTaskCategory } from '@/constants/newTaskData.constants';
import ThePlus from '@/icons/ThePlus.vue';
import type { UpdateTask } from '@/types/UpdateTask.type';
import { useStore } from 'vuex';

const store = useStore();

const addNewTask = async () => {
  const count = store.getters.countTasks;
  const countTasks = count ? count + 1 : (store.getters.tasksLength as number) + 1;
  const newTask: UpdateTask = {
    title: `${newTaskTitle} ${countTasks}`,
    category: newTaskCategory,
    finishDate: null,
    completed: false,
  };
  store.dispatch('createTask', newTask);
};
</script>

<style scoped></style>
