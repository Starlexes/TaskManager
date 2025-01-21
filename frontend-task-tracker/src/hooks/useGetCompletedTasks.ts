import type { Task } from '@/types/Task.interface';
import axios from '@/utils/axios';

export const useGetCompletedTasks = async (
  completed: boolean,
  page: number,
  limit: number,
): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>('tasks/completed/', {
      params: {
        page,
        limit,
        completed,
      },
    });
    const data = response.data;
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
