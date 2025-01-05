import type { Task } from './Task.interface';

export interface UpdateTaskPayload {
  taskId: Task['_id'];
  data: Omit<Task, '_id'>;
}
