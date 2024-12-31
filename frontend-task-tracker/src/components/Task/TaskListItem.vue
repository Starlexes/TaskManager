<template>
  <li>
    <div
      class="tw-flex tw-flex-col tw-gap-3 tw-p-8 tw-bg-white dark:tw-bg-[var(--bg-second-darkT)] tw-w-[28em] tw-relative task-item"
    >
      <CompleteTaskLabel v-if="taskCompleted" />
      <div class="tw-flex tw-flex-col tw-gap-2 tw-relative">
        <TaskTitle :taskId="taskId" :taskTitle="taskTitle" />
        <TaskCategory :taskId="taskId" :taskCategory="taskCategory" />
        <CompleteTaskButton :isChecked="taskCompleted" @btn-clicked="onClickComplete" />
      </div>
      <hr class="tw-m-0 dark:tw-border-t-[var(--second-text-color-darkT)]" />
      <div class="tw-flex tw-justify-between">
        <div
          class="tw-mt-1.5 tw-font-light tw-italic tw-text-base tw-leading-normal tw-text-[var(--second-text-color)] dark:tw-text-[var(--text-color-darkT)] task-date"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <span class="tw-text-base dark:tw-text-[var(--second-text-color-darkT)]">Дэдлайн:</span>
            <TaskDate :taskFinishDate="taskFinishDate" @update-date="updateDate" />
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
import { ref } from 'vue';
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
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: String,
  },
  finishDate: {
    type: String,
    default: null,
  },
});
const store = useStore<Store<State>>();
const taskId = ref<string>(props.taskId);
const taskTitle = ref<string>(props.title);
const taskCategory = ref<string>(props.category);
const taskCompleted = ref<boolean>(props.completed);
const taskFinishDate = ref<Task['finishDate']>(props.finishDate);

const updateDate = (pDate: Date | null) => {
  let date: Task['finishDate'];
  if (pDate) {
    date = pDate.toISOString();
  } else {
    date = pDate;
  }
  taskFinishDate.value = date;
  const payload: UpdateTaskPayload = {
    taskId: taskId.value,
    data: {
      finishDate: date,
    },
  };
  store.dispatch('updateTask', payload);
};

const onClickComplete = () => {
  taskCompleted.value = !taskCompleted.value;
  const payload: UpdateTaskPayload = {
    taskId: taskId.value,
    data: {
      completed: taskCompleted.value,
    },
  };
  store.dispatch('updateTask', payload);
  if (taskCompleted.value) {
    store.commit('incCountCompletedTasks');
  } else store.commit('decCountCompletedTasks');
};

const deleteTask = () => {
  store.dispatch('deleteTasks', taskId.value);
  if (taskCompleted.value) {
    store.commit('decCountCompletedTasks');
  }
  store.commit('decCountTasks');
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
