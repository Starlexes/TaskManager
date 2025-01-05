import type { Task } from '@/types/Task.interface';
import type { State } from '..';
import type { UpdateTaskPayload } from '@/types/UpdateTaskPayload.interface';

export const taskMutations = {
  addTasks(state: State, payload: Task[]) {
    state.tasks.push(...payload);
  },

  addTask(state: State, payload: Task) {
    state.tasks.unshift(payload);
  },

  setTasks(state: State, payload: Task[]) {
    state.tasks = payload;
  },

  setTask(state: State, payload: UpdateTaskPayload) {
    const { taskId, data } = payload;
    state.tasks.map((task) => task._id === taskId && { ...task, ...data });
  },

  deleteTask(state: State, taskId: Task['_id']) {
    state.tasks = state.tasks.filter((task) => task._id !== taskId);
  },

  incCountCompletedTasks(state: State) {
    state.countCompletedTasks++;
  },

  decCountCompletedTasks(state: State) {
    state.countCompletedTasks--;
  },

  setCountCompletedTasks(state: State, payload: number) {
    state.countCompletedTasks = payload;
  },

  setCountTasks(state: State, payload: number) {
    state.countTasks = payload;
  },

  incCountTasks(state: State) {
    state.countTasks++;
  },

  decCountTasks(state: State) {
    state.countTasks--;
  },
};
