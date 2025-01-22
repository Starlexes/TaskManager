import { AxiosError } from 'axios';
import axios from '../utils/axios';
import type { Task } from '@/types/Task.interface';
import { store } from '@/store';

import { DELETE_TASK_ERROR, UNEXPECTED_ERROR } from '@/constants/toast.constants';

export const useDeleteTask = async (taskId: Task['_id']): Promise<number | void> => {
  try {
    const response = await axios.delete(`tasks/${taskId}`);
    return response.status;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.request) {
        store.dispatch('showError', DELETE_TASK_ERROR);
      }
      if (e.response) {
        const message: string | string[] = e.response.data.message;
        store.dispatch('showError', Array.isArray(message) ? message[0] : message);
      }
    } else {
      store.dispatch('showError', UNEXPECTED_ERROR);
    }
  }
};
