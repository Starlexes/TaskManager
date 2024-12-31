import type { Task } from './Task.interface';
import type { UpdateTask } from './UpdateTask.type';

export interface UpdateTaskPayload {
  taskId: Task['_id'];
  data: UpdateTask;
}
