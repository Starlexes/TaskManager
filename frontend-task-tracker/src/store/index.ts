import { COUNT_TASKS_PER_PAGE } from '@/constants/countTasksPerPage.constants';

import type { Task } from '@/types/Task.interface';
import type { Theme } from '@/types/Theme.type';
import { createStore } from 'vuex';
import { taskActions } from './Task/task.actions';
import { taskMutations } from './Task/task.mutations';
import { pageActions } from './Page/page.actions';
import { themeMutations } from './Theme/theme.mutations';
import { pageMutations } from './Page/page.mutations';

export interface State {
  tasks: Task[];
  currentTheme: Theme;
  page: number;
  limit: number;
  isLastPage: boolean;
  countTasks: number;
  countCompletedTasks: number;
}

export const store = createStore<State>({
  state: {
    tasks: [],
    currentTheme: null,
    page: 1,
    limit: COUNT_TASKS_PER_PAGE,
    isLastPage: false,
    countTasks: 0,
    countCompletedTasks: 0,
  },
  mutations: { ...taskMutations, ...themeMutations, ...pageMutations },

  actions: { ...taskActions, ...pageActions },

  getters: {
    tasks: (state): Task[] => state.tasks,
    theme: (state): Theme => state.currentTheme,
    tasksLength: (state): number => state.tasks.length,
    tasksLengthInc: (state): number => state.tasks.length++,
    isLastPage: (state): boolean => state.isLastPage,
    countTasks: (state): number => state.countTasks,
    countCompletedTasks: (state): number => state.countCompletedTasks,
  },
});
