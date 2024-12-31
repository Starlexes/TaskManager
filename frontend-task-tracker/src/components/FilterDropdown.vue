<template>
  <div class="tw-relative tw-w-52">
    <button class="tw-w-full tw-h-11" @click="isOpenMenu = !isOpenMenu">
      <div
        class="tw-w-full tw-h-full tw-inline-flex tw-items-center tw-justify-between tw-overflow-hidden tw-rounded-[10px] tw-bg-[var(--main-color)] hover:tw-bg-[var(--main-color-hovered)]"
      >
        <span
          class="tw-px-[10px] tw-py-2 tw-text-base/none tw-uppercase tw-text-white selected-filter"
        >
          {{ selectedOption }}
        </span>
        <div class="tw-p-2 tw-border-s">
          <FilterArrow />
        </div>
      </div>
    </button>
    <div
      class="tw-w-full tw-absolute tw-end-0 tw-z-10 tw-mt-4 tw-divide-gray-100 tw-rounded-[10px] tw-bg-white tw-overflow-hidden dark:tw-bg-[var(--bg-second-darkT)] filter-menu"
      role="menu"
      v-if="isOpenMenu"
    >
      <button
        class="tw-block tw-text-start tw-w-full tw-font-bold tw-text-[var(--main-color)] tw-text-base tw-no-underline tw-px-[10px] tw-py-[6px] hover:tw-bg-[var(--hovered-secondary)] dark:hover:tw-bg-[var(--main-color-alpha)] dark:tw-text-white option-item"
        v-for="(option, idx) in options"
        :key="idx"
        @click="onClickOption(option)"
        role="menuitem"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FilterArrow from '@/icons/FilterArrow.vue';
import { filterQueryParam } from '@/constants/filterQueryParam.constants';
import { allTaskFilterName } from '@/constants/allTaskFilterName.constants';
import { FilterOptions } from '@/types/FilterOptions.enum';
import { getCapitalizedText } from '@/utils/getCapitalizedText';

const route = useRoute();
const router = useRouter();

const selectedOption = ref<string>(
  (route.query[filterQueryParam] as FilterOptions) || allTaskFilterName,
);

const isOpenMenu = ref<boolean>(false);

const onClickOption = (option: string) => {
  isOpenMenu.value = false;
  selectedOption.value = option.toLowerCase();
  router.push({ query: { [filterQueryParam]: selectedOption.value } });
};
const options: string[] = [...Object.values(FilterOptions)].map((item) => getCapitalizedText(item));
</script>

<style scoped>
.filter-menu {
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.14);
}
.option-item,
.selected-filter {
  font-family: Nunito, Helvetica, Arial, sans-serif;
}
</style>
