export interface Task {
  title: string;
  category: string;
  completed: boolean;
  createdAt: string;
  finishDate: string | null;
}

export interface UpdateTask extends Task {
  _id: string;
}
