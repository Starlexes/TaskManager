import axios from '../utils/axios';
import type { Task } from '@/types/Task.interface';

export const useDeleteTask = async (taskId: Task['_id']): Promise<number | void> => {
  try {
    const response = await axios.delete(`tasks/${taskId}`);
    return response.status;
  } catch (e) {
    console.error(e);
  }
};
