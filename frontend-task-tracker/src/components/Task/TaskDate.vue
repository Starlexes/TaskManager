<template>
  <VueDatePicker
    v-model="taskFinishDate"
    locale="ru-RU"
    month-name-format="long"
    name="task-date"
    utc="preserve"
    @update:model-value="onDayClick"
    :min-date="new Date()"
    :format="formatDate"
    :placeholder="unspecifiedDate"
    :dark="theme === 'dark'"
    :auto-apply="true"
    :enable-time-picker="false"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { State } from '@/store';
import { Store, useStore } from 'vuex';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { unspecifiedDate } from '@/constants/unspecifiedDate.constants';

const emit = defineEmits(['update-date']);
const store = useStore<Store<State>>();
const theme = computed<State['currentTheme']>(() => store.getters.theme);

const props = defineProps({
  taskFinishDate: {
    type: [String, null],
    required: true,
  },
});

const taskFinishDate = ref<string | null>(props.taskFinishDate);

const onDayClick = (day: string) => {
  const date = new Date(day).setUTCHours(0, 0, 0, 0);

  emit('update-date', new Date(date));
};

const formatDate = (date: Date) => {
  const fDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return fDate;
};
</script>

<style>
.dp__input,
.dp__input::placeholder {
  width: 220px;
  font-style: italic;
  border: none;
  font-family: Nunito, Helvetica, Arial, sans-serif;
  line-height: 1.75rem;
}
.dp__theme_light,
.dp__theme_dark {
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
}
</style>
