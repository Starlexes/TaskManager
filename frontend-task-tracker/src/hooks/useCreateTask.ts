import { CREATE_TASK_ERROR, UNEXPECTED_ERROR } from '@/constants/toast.constants';
import axios from '../utils/axios';
import type { Task } from '@/types/Task.interface';
import type { TaskAPIData } from '@/types/TaskAPIData.interface';
import { AxiosError } from 'axios';
import { store } from '@/store';

export const useCreateTask = async (data: Omit<Task, '_id'>): Promise<TaskAPIData | null> => {
  try {
    const response = await axios.post<Task>('tasks/create', data);
    return { data: response.data, code: response.status };
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.request) {
        store.dispatch('showError', CREATE_TASK_ERROR);
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
