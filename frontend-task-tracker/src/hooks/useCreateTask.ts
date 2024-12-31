import type { UpdateTask } from '@/types/UpdateTask.type';
import axios from '../utils/axios';
import type { Task } from '@/types/Task.interface';
import type { TaskAPIData } from '@/types/TaskAPIData.interface';

export const useCreateTask = async (data: UpdateTask): Promise<TaskAPIData | null> => {
  try {
    const response = await axios.post<Task>('tasks/', data);
    return { data: response.data, code: response.status };
  } catch (e) {
    console.error(e);
    return null;
  }
};
