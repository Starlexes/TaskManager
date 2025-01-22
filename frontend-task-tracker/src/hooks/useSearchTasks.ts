import axios from '../utils/axios';
import type { Task } from '@/types/Task.interface';
import { store } from '@/store';
import { AxiosError } from 'axios';
import { SEARCH_TASK_ERROR, UNEXPECTED_ERROR } from '@/constants/toast.constants';

export const useSearchTasks = async (filter: string): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>('tasks/search', {
      params: {
        filter,
      },
    });
    const data = response.data;
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.request) {
        store.dispatch('showError', SEARCH_TASK_ERROR);
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
