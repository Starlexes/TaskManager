import type { AdaptedFilterParams } from '@/types/AdaptedFilterParams.interface';

import axios from '../utils/axios';
import type { Task } from '@/types/Task.interface';

export const useGetTasks = async (
  page: number,
  limit: number,
  filters: AdaptedFilterParams,
): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>('tasks/', {
      params: {
        page,
        limit,
        ...filters,
      },
    });
    const data = response.data;
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
