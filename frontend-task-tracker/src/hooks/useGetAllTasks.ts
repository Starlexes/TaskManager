import type { Task } from '@/types/Task.interface';
import axios from '@/utils/axios';

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
    console.error(e);
    return [];
  }
};
