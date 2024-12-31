import type { UpdateTask } from '@/types/UpdateTask.type';
import axios from '../utils/axios';
import type { Task } from '@/types/Task.interface';

export const useUpdateTask = async (
  taskId: Task['_id'],
  data: UpdateTask,
): Promise<Task | null> => {
  try {
    const response = await axios.patch<Task>(`tasks/${taskId}`, data);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
