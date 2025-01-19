import type { AdaptedFilterParams } from '@/types/AdaptedFilterParams.interface';

import axios from '../utils/axios';
import type { Task } from '@/types/Task.interface';
import { COUNT_TASKS_PER_PAGE } from '@/constants/countTasksPerPage.constants';

export const useGetTasks = async (
  filters: AdaptedFilterParams,
  page: number = 1,
  limit: number = COUNT_TASKS_PER_PAGE,
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
