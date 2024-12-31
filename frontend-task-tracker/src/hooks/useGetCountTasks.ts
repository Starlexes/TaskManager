import type { APIResponse } from '@/types/APIResponse.interface';
import axios from '../utils/axios';
import type { Task } from '@/types/Task.interface';

export const useGetCountTasks = async (completed?: Task['completed']): Promise<number | void> => {
  try {
    const response = await axios.get<APIResponse>('tasks/count', {
      params: { completed },
    });
    const count = response.data.data as number;
    return count;
  } catch (e) {
    console.error(e);
  }
};
