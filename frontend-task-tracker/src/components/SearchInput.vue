<template>
  <div class="tw-flex tw-items-center tw-overflow-hidden tw-relative">
    <input
      class="tw-p-3 tw-pl-9 tw-text-bases tw-placeholder-gray-800 dark:tw-bg-[var(--bg-second-darkT)] tw-border-2 tw-border-solid tw-border-[var(--main-color)] dark:tw-border-[var(--main-color-light)] dark:tw-text-[var(--text-color-darkT)] dark:tw-placeholder-[var(--second-text-color-darkT)] tw-w-[28em] search-input"
      type="text"
      name="searching-tasks"
      :placeholder="props.placeholder"
      :value="inputValue"
      @input="onChange"
    />

    <div class="tw-absolute tw-flex tw-place-items-center tw-h-full tw-top-0 tw-left-0 tw-p-2">
      <TheLoop />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TheLoop from '../icons/TheLoop.vue';
import { useStore } from 'vuex';
const inputValue = ref('');
const store = useStore();
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Searching tasks...',
  },
});
const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const data = target.value;
  if (data) {
    store.dispatch('searchTasks', data);
  } else {
    store.dispatch('loadTasks', data);
  }
};
</script>

<style scoped>
.search-input {
  border-radius: 10px;
  transition: all 0.1s;
  font-family: Inter, sans-serif;
  line-height: 17px;
}

.search-input:focus {
  border: #fd00ba solid 2px;
}
</style>
