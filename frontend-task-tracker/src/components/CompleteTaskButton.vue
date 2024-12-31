<template>
  <input
    :checked="props.isChecked"
    name="complete-task"
    @click="$emit('btn-clicked')"
    class="form-check-input tw-absolute tw-right-0 tw-bottom-0 dark:!tw-bg-[var(--second-text-color-darkT)] checked:!tw-bg-[var(--main-color)] complete-btn"
    type="checkbox"
  />
</template>

<script setup lang="ts">
defineEmits(['btn-clicked']);
const props = defineProps({
  isChecked: Boolean,
});
</script>

<style scoped>
.complete-btn:checked {
  border-color: var(--main-color);
}

.complete-btn {
  width: 30px;
  height: 30px;
  border: 1px solid var(--main-color);
  border-radius: 10px;
}

.complete-btn:focus {
  box-shadow: none;
}
</style>
