import axios from '../utils/axios';
import type { Task } from '@/types/Task.interface';

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
    console.error(e);
    return [];
  }
};
