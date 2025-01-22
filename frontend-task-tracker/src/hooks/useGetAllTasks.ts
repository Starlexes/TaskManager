import { GET_TASK_ERROR, UNEXPECTED_ERROR } from '@/constants/toast.constants';
import type { Task } from '@/types/Task.interface';
import axios from '@/utils/axios';
import { AxiosError } from 'axios';
import { store } from '@/store';

export const useGetAllTasks = async (page: number, limit: number): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>('tasks/', {
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
        store.dispatch('showError', GET_TASK_ERROR);
      }
    } else {
      store.dispatch('showError', UNEXPECTED_ERROR);
    }
    return [];
  }
};
