import type { ActionContext } from 'vuex';

import { useCreateTask } from '@/hooks/useCreateTask';
import { useDeleteTask } from '@/hooks/useDeleteTask';
import { useGetTasks } from '@/hooks/useGetTasks';
import { useSearchTasks } from '@/hooks/useSearchTasks';
import { useUpdateTask } from '@/hooks/useUpdateTask';

import type { State } from '../index';

import type { Task } from '@/types/Task.interface';
import type { UpdateTask } from '@/types/UpdateTask.type';
import type { UpdateTaskPayload } from '@/types/UpdateTaskPayload.interface';
import { useGetCountTasks } from '@/hooks/useGetCountTasks';
import adaptFilterParams from '@/utils/adaptFilterParams';

export const taskActions = {
  loadTasks: async (
    { commit, state, dispatch }: ActionContext<State, State>,
    filter: string | string[] = '',
  ) => {
    const adaptedParams = adaptFilterParams(filter);
    const tasks = await useGetTasks(state.page, state.limit, adaptedParams);
    commit('addTasks', tasks);
    dispatch('setPage', tasks.length);
  },

  setTasks: async (
    { commit, state, dispatch }: ActionContext<State, State>,
    filter: string | string[] = '',
  ) => {
    commit('clearPage');
    const adaptedParams = adaptFilterParams(filter);
    const tasks = await useGetTasks(state.page, state.limit, adaptedParams);

    commit('setTasks', tasks);
    dispatch('setPage', tasks.length);
  },

  getCountCompletedTasks: async (
    { commit }: ActionContext<State, State>,
    completed: Task['completed'],
  ) => {
    if (completed) {
      const count: number = (await useGetCountTasks(completed)) as number;
      commit('setCountCompletedTasks', count);
    }
  },

  getCountTasks: async ({ commit }: ActionContext<State, State>) => {
    const count: number = (await useGetCountTasks()) as number;
    commit('setCountTasks', count);
  },

  searchTasks: async ({ commit }: ActionContext<State, State>, filter: string) => {
    const tasks: Task[] = await useSearchTasks(filter);
    commit('setTasks', tasks);
  },

  updateTask: async ({ commit }: ActionContext<State, State>, payload: UpdateTaskPayload) => {
    const { taskId, data } = payload;
    const task = await useUpdateTask(taskId, data);
    if (task) {
      commit('setTask', { taskId, data: task });
    }
  },

  createTask: async ({ commit }: ActionContext<State, State>, data: UpdateTask) => {
    const response = await useCreateTask(data);
    if (response) {
      const { data, code } = response;

      if (code === 201) {
        commit('addTask', data);
        commit('incCountTasks');
      }
    }
  },

  deleteTasks: async ({ commit }: ActionContext<State, State>, taskId: Task['_id']) => {
    const response = await useDeleteTask(taskId);
    if (response === 200) {
      commit('deleteTask', taskId);
    }
  },
};
