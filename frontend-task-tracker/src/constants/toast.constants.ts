// Success
export const getDeleteTaskMessage = (title: string) => {
  return `Задача "${title}" была удалена`;
};

export const ALL_TASKS_COMPLETED = 'Поздравляем! Вы завершили все задачи!';

// Errors
export const UNEXPECTED_ERROR = 'Произошла непредвиденная ошибка, перезагрузите страницу';
export const GET_TASK_ERROR = 'Не удалось получить задачи, попробуйте обновить страницу';
export const SEARCH_TASK_ERROR = 'Ошибка при поиске задач, попробуйте обновить страницу';
export const FILTER_TASK_ERROR =
  'Не удалось отфильтровать задачи, попробуйте еще раз или обновите страницу';
export const CREATE_TASK_ERROR = 'Не удалось создать задачу, попробуйте еще раз';
export const UPDATE_TASK_ERROR =
  'Не удалось обновить задачу, проверьте введенные данные и попробуйте еще раз';
export const DELETE_TASK_ERROR = 'Не удалось удалить задачу, попробуйте еще раз';
