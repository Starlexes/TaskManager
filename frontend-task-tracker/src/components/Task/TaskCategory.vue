<template>
  <div @focus="changeEditable" tabindex="1">
    <input
      v-if="isEditable"
      type="text"
      v-model.trim="taskCategory"
      ref="input-category"
      @blur="onBlur"
      @focus="storeOriginalCategory"
      @keyup.enter="$refs['input-category'].blur()"
      class="tw-appearance-none tw-bg-transparent tw-text-sm tw-leading-normal m-0 tw-w-4/5 tw-border-b-[0.5px] tw-border-b-[var(--second-text-color)] task-title dark:tw-border-b-[var(--second-text-color-darkT)] dark:tw-text-[var(--second-text-color-darkT)] task-category"
    />
    <h4
      v-else
      class="tw-text-base tw-leading-normal m-0 tw-text-[var(--second-text-color)] dark:tw-text-[var(--second-text-color-darkT)] task-category"
    >
      {{ taskCategory }}
    </h4>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/Task.interface';
import { ref } from 'vue';
const emit = defineEmits(['update-category']);
const props = defineProps({
  taskCategory: {
    type: String,
    required: true,
  },
});
const isEditable = ref<boolean>(false);
const taskCategory = ref<Task['title']>(props.taskCategory);
const originalTaskCategory = ref<Task['title']>(props.taskCategory);

const changeEditable = () => {
  isEditable.value = !isEditable.value;
};

const storeOriginalCategory = () => {
  originalTaskCategory.value = taskCategory.value;
};
const onBlur = () => {
  changeEditable();
  const category = taskCategory.value;
  if (category) {
    const data: Partial<Omit<Task, '_id'>> = {
      category,
    };
    emit('update-category', data);
  } else {
    taskCategory.value = originalTaskCategory.value;
  }
};
</script>

<style scoped>
.task-category {
  font-family: Inter, Helvetica, Arial, sans-serif;
}
</style>
