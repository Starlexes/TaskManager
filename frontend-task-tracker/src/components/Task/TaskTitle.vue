<template>
  <div @focus="changeEditable" tabindex="1">
    <input
      v-if="isEditable"
      type="text"
      v-model.trim="taskTitle"
      ref="input-title"
      @blur="onBlur"
      @focus="storeOriginalTitle"
      @keyup.enter="$refs['input-title'].blur()"
      class="tw-appearance-none tw-bg-transparent tw-text-lg tw-leading-normal tw-font-bold m-0 dark:tw-text-[var(--text-color-darkT)] tw-w-4/5 tw-border-b-[1px] dark:tw-border-b-[var(--second-text-color-darkT)] tw-border-b-[var(--second-text-color)] task-title"
    />
    <h3
      v-else
      class="tw-text-2xl tw-leading-normal tw-font-bold m-0 dark:tw-text-[var(--text-color-darkT)] task-title"
    >
      {{ taskTitle }}
    </h3>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/Task.interface';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const props = defineProps({
  taskTitle: {
    type: String,
    required: true,
  },
  taskId: {
    type: String,
    required: true,
  },
});
const isEditable = ref<boolean>(false);
const taskTitle = ref<Task['title']>(props.taskTitle);
const originalTaskTitle = ref<Task['title']>(props.taskTitle);
const taskId = ref<Task['_id']>(props.taskId);

const changeEditable = () => {
  isEditable.value = !isEditable.value;
};

const storeOriginalTitle = () => {
  originalTaskTitle.value = taskTitle.value;
};

const onBlur = () => {
  changeEditable();
  const title = taskTitle.value;
  if (title) {
    store.dispatch('updateTask', {
      taskId: taskId.value,
      data: {
        title: title,
      },
    });
  } else {
    taskTitle.value = originalTaskTitle.value;
  }
};
</script>

<style scoped>
.task-title {
  font-family: Nunito, Helvetica, Arial, sans-serif;
}
</style>
