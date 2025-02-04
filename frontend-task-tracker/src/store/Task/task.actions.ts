import type { ActionContext } from 'vuex';
import { useCreateTask } from '@/hooks/useCreateTask';
import { useDeleteTask } from '@/hooks/useDeleteTask';
import { useGetTasks } from '@/hooks/useGetTasks';
import { useSearchTasks } from '@/hooks/useSearchTasks';
import { useUpdateTask } from '@/hooks/useUpdateTask';
import type { Task } from '@/types/Task.interface';
import type { UpdateTaskPayload } from '@/types/UpdateTaskPayload.interface';
import { useGetCountTasks } from '@/hooks/useGetCountTasks';
import adaptFilterParams from '@/utils/adaptFilterParams';
import type { State } from '../index';
import { getDeleteTaskMessage } from '@/constants/toast.constants';

export const taskActions = {
  loadTasks: async (
    { commit, state, dispatch }: ActionContext<State, State>,
    filter: string | string[] = '',
  ) => {
    const adaptedParams = adaptFilterParams(filter);
    const tasks = await useGetTasks(adaptedParams, state.page, state.limit);
    commit('addTasks', tasks);
    dispatch('setPage', tasks.length);
  },

  setTasks: async (
    { commit, state, dispatch }: ActionContext<State, State>,
    filter: string | string[] = '',
  ) => {
    commit('clearPage');
    const adaptedParams = adaptFilterParams(filter);
    const tasks = await useGetTasks(adaptedParams, state.page, state.limit);

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

  createTask: async ({ commit }: ActionContext<State, State>, data: Omit<Task, '_id'>) => {
    const response = await useCreateTask(data);
    if (response) {
      const { data, code } = response;

      if (code === 201) {
        commit('addTask', data);
        commit('incCountTasks');
      }
    }
  },

  deleteTasks: async (
    { commit, dispatch }: ActionContext<State, State>,
    { taskId, title, completed }: { taskId: Task['_id']; title: string; completed: boolean },
  ) => {
    const response = await useDeleteTask(taskId);
    if (response === 200) {
      commit('deleteTask', taskId);
      dispatch('showSuccess', getDeleteTaskMessage(title));
      if (completed) {
        commit('decCountCompletedTasks');
      }
      commit('decCountTasks');
    }
  },
};
