import axios from '../utils/axios';
import type { Task } from '@/types/Task.interface';
import { store } from '@/store';
import { AxiosError } from 'axios';
import { UNEXPECTED_ERROR, UPDATE_TASK_ERROR } from '@/constants/toast.constants';

export const useUpdateTask = async (
  taskId: Task['_id'],
  data: Omit<Task, '_id'>,
): Promise<Task | null> => {
  try {
    const response = await axios.patch<Task>(`tasks/${taskId}`, data);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.request) {
        store.dispatch('showError', UPDATE_TASK_ERROR);
      }
      if (e.response) {
        const message: string | string[] = e.response.data.message;
        store.dispatch('showError', Array.isArray(message) ? message[0] : message);
      }
    } else {
      store.dispatch('showError', UNEXPECTED_ERROR);
    }
    return null;
  }
};
