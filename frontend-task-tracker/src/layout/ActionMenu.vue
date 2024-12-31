<template>
  <div class="tw-flex tw-gap-5 tw-items-center">
    <FilterDropdown />
    <SearchInput />
    <AddTaskButton />
    <ThemeButton />
    <ProgressArc />
  </div>
</template>

<script setup lang="ts">
import ThemeButton from '@/components/ThemeButton.vue';
import SearchInput from '@/components/SearchInput.vue';
import AddTaskButton from '@/components/AddTaskButton.vue';
import ProgressArc from '@/components/ProgressArc.vue';
import FilterDropdown from '@/components/FilterDropdown.vue';
</script>
