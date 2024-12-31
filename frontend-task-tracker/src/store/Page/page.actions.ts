import type { ActionContext } from 'vuex';
import type { State } from '..';

export const pageActions = {
  setPage: async ({ commit }: ActionContext<State, State>, tasksLength: number) => {
    if (tasksLength === 0) {
      commit('setIsLastPage');
    } else {
      commit('incPage');
    }
  },
};
