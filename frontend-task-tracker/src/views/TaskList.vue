<template>
  <div v-if="isLoading" class="tw-flex tw-flex-col tw-gap-8">
    <TaskSkeleton v-for="item in 4" :key="item" />
  </div>
  <template v-else>
    <p v-if="tasksLength === 0" class="tw-text-center tw-text-2xl not-found-message">
      Tasks was not found
    </p>
    <ul class="tw-flex tw-flex-col tw-gap-8 tw-items-center" v-else>
      <TaskListItem
        v-for="task in tasks"
        :key="task._id"
        :taskId="task._id"
        :title="task.title"
        :category="task.category"
        :createdAt="task.createdAt"
        :finish-date="task.finishDate ? task.finishDate : undefined"
        :completed="task.completed"
      />
    </ul>
  </template>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useStore } from 'vuex';
import TaskListItem from '@/components/Task/TaskListItem.vue';
import TaskSkeleton from '@/components/Task/TaskSkeleton.vue';
import type { Task } from '../types/Task.interface';
import { useRoute } from 'vue-router';
import { filterQueryParam } from '@/constants/filterQueryParam.constants';

const store = useStore();

const route = useRoute();

const filter = ref(route.query[filterQueryParam]);

const tasks = computed((): Task[] => store.getters.tasks);

const tasksLength = computed((): number => store.getters.tasksLength);

const isLoading = ref<boolean>(true);

const onScroll = async () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  if (scrollTop + windowHeight >= documentHeight - 100 && !store.getters.isLastPage) {
    await store.dispatch('loadTasks', filter.value);
  }
};

const onLoad = async () => {
  await store.dispatch('setTasks', filter.value);
};

onMounted(async () => {
  await store.dispatch('getCountTasks');
  await store.dispatch('getCountCompletedTasks', true);
  window.addEventListener('scroll', onScroll);
  isLoading.value = false;
});

watch(
  () => route.query,
  async () => {
    filter.value = route.query[filterQueryParam];
    await onLoad();
  },
  { deep: true },
);

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
.not-found-message {
  font-family: Inter, Helvetica, Arial, sans-serif;
}
</style>
