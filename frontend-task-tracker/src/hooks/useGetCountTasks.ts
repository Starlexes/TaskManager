import type { APIResponse } from '@/types/APIResponse.interface';
import axios from '../utils/axios';
import type { Task } from '@/types/Task.interface';
import { store } from '@/store';
import { UNEXPECTED_ERROR } from '@/constants/toast.constants';
import { AxiosError } from 'axios';

export const useGetCountTasks = async (completed?: Task['completed']): Promise<number | void> => {
  try {
    const response = await axios.get<APIResponse>('tasks/count', {
      params: { completed },
    });
    const count = response.data.data as number;
    return count;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response) {
        const message: string | string[] = e.response.data.message;
        store.dispatch('showError', Array.isArray(message) ? message[0] : message);
      }
    } else {
      store.dispatch('showError', UNEXPECTED_ERROR);
    }
  }
};
