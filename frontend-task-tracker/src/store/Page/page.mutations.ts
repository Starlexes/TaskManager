import type { State } from '..';

export const pageMutations = {
  incPage(state: State) {
    state.page++;
  },
  setIsLastPage(state: State) {
    state.isLastPage = true;
  },
  clearPage(state: State) {
    state.page = 1;
    state.isLastPage = false;
  },
};
