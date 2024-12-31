<template>
  <div
    class="modal fade"
    :id="`askDeleteModal-${taskId}`"
    tabindex="-1"
    aria-hidden="true"
    aria-labelledby="askDeleteModalLabel"
    :data-bs-theme="theme"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header !tw-border-none">
          <h1
            class="modal-title fs-5 dark:tw-text-[var(--text-color-darkT)]"
            id="askDeleteModalLabel"
          >
            Вы уверены, что хотите удалить эту задачу?
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-footer !tw-border-none">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="$emit('delete-task')"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/Task.interface';
import type { Theme } from '@/types/Theme.type';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  taskId: {
    type: String,
    required: true,
  },
});

const store = useStore();
const taskId = ref<Task['_id']>(props.taskId);
const theme = computed<Theme>(() => store.getters.theme);
</script>

<style scoped></style>
