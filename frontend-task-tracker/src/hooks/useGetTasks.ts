import type { AdaptedFilterParams } from '@/types/AdaptedFilterParams.interface';

import type { Task } from '@/types/Task.interface';
import { COUNT_TASKS_PER_PAGE } from '@/constants/countTasksPerPage.constants';
import { useGetAllTasks } from './useGetAllTasks';
import { useGetCompletedTasks } from './useGetCompletedTasks';
import { useGetTodayTasks } from './useGetTodayTasks';

export const useGetTasks = async (
  filters: AdaptedFilterParams,
  page: number = 1,
  limit: number = COUNT_TASKS_PER_PAGE,
): Promise<Task[]> => {
  const { completed, today } = filters;
  if (completed !== undefined) {
    return await useGetCompletedTasks(completed, page, limit);
  }
  if (today) {
    return await useGetTodayTasks(page, limit);
  }
  return await useGetAllTasks(page, limit);
};
