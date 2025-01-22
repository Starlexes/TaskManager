import type { Task } from '@/types/Task.interface';
import axios from '@/utils/axios';
import { store } from '@/store';
import { AxiosError } from 'axios';
import { FILTER_TASK_ERROR, UNEXPECTED_ERROR } from '@/constants/toast.constants';

export const useGetTodayTasks = async (page: number, limit: number): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>('tasks/today/', {
      params: {
        page,
        limit,
      },
    });
    const data = response.data;
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.request) {
        store.dispatch('showError', FILTER_TASK_ERROR);
      }
      if (e.response) {
        const message: string | string[] = e.response.data.message;
        store.dispatch('showError', Array.isArray(message) ? message[0] : message);
      }
    } else {
      store.dispatch('showError', UNEXPECTED_ERROR);
    }
    return [];
  }
};
