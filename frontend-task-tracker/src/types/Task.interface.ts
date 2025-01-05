export interface Task {
  _id: string;
  title: string;
  category: string;
  completed: boolean;
  createdAt?: string;
  finishDate?: string | null;
}
