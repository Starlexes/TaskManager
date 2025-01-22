<template>
  <li>
    <div
      class="tw-flex tw-flex-col tw-gap-3 tw-p-8 tw-bg-white dark:tw-bg-[var(--bg-second-darkT)] tw-w-[28em] tw-relative task-item"
    >
      <CompleteTaskLabel v-if="task.completed" />
      <div class="tw-flex tw-flex-col tw-gap-2 tw-relative">
        <TaskTitle :taskTitle="task.title" @update-title="updateTask" />
        <TaskCategory :taskCategory="task.category" @update-category="updateTask" />
        <CompleteTaskButton :isChecked="task.completed" @btn-clicked="onClickComplete" />
      </div>
      <hr class="tw-m-0 dark:tw-border-t-[var(--second-text-color-darkT)]" />
      <div class="tw-flex tw-justify-between">
        <div
          class="tw-mt-1.5 tw-font-light tw-italic tw-text-base tw-leading-normal tw-text-[var(--second-text-color)] dark:tw-text-[var(--text-color-darkT)] task-date"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <span class="tw-text-base dark:tw-text-[var(--second-text-color-darkT)]">Дэдлайн:</span>
            <TaskDate :taskFinishDate="task.finishDate" @update-date="updateDate" />
          </div>
        </div>
        <button
          type="button"
          title="Удалить"
          data-bs-toggle="modal"
          :data-bs-target="`#askDeleteModal-${taskId}`"
        >
          <TheBucket class="tw-self-end" />
        </button>
        <AskDeleteModal @delete-task="deleteTask" :taskId="taskId" />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import { Store, useStore } from 'vuex';
import TheBucket from '@/icons/TheBucket.vue';
import AskDeleteModal from '../AskDeleteModal.vue';
import CompleteTaskButton from '../CompleteTaskButton.vue';
import CompleteTaskLabel from '../CompleteTaskLabel.vue';
import TaskCategory from './TaskCategory.vue';
import TaskDate from './TaskDate.vue';
import TaskTitle from './TaskTitle.vue';
import type { UpdateTaskPayload } from '@/types/UpdateTaskPayload.interface';
import type { State } from '@/store';
import type { Task } from '@/types/Task.interface';

const props = defineProps({
  taskId: {
    type: String,
    required: true,
  },
  task: {
    type: Object as PropType<Omit<Task, '_id'>>,
    required: true,
  },
});
const store = useStore<Store<State>>();
const taskId = ref<string>(props.taskId);
const task = ref<Omit<Task, '_id'>>(props.task);

const updateDate = (pDate: Date | null) => {
  let date: string | null;
  if (pDate) {
    date = pDate.toISOString();
  } else {
    date = pDate;
  }
  task.value.finishDate = date;
  const data: Partial<Omit<Task, '_id'>> = { finishDate: date };
  updateTask(data);
};

const onClickComplete = () => {
  task.value.completed = !task.value.completed;
  const data: Partial<Omit<Task, '_id'>> = {
    completed: task.value.completed,
  };
  updateTask(data);
  if (task.value.completed) {
    store.commit('incCountCompletedTasks');
  } else store.commit('decCountCompletedTasks');
};

const updateTask = (data: Partial<Omit<Task, '_id'>>) => {
  const newTask = { ...task.value, ...data };
  task.value = newTask;
  const payload: UpdateTaskPayload = {
    taskId: taskId.value,
    data: newTask,
  };
  store.dispatch('updateTask', payload);
};

const deleteTask = () => {
  store.dispatch('deleteTasks', {
    taskId: taskId.value,
    title: task.value.title,
    completed: task.value.completed,
  });
};
</script>

<style scoped>
.task-item {
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
}

.task-date {
  font-family: Nunito, Helvetica, Arial, sans-serif;
}
</style>
