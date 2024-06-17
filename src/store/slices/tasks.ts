import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ITask {
  id: string;
  title: string;
  count: number;
  edit: boolean;
  done: number;
}

export interface ITasksState {
  items: ITask[]; // Массив задач
  currentId: string | null; // id текущей задачи
}

// Начальное состояние для задач
const initialTasksState: ITasksState = {
  items: [],
  currentId: null,
};

export const tasksSlice = createSlice({
  name: 'tasks', // Имя слайса
  initialState: initialTasksState,

  // Действия для изменения состояния задач
  reducers: {
    // Добавление новой задачи в массив
    addTask: (state, action: PayloadAction<ITask>) => {
      state.items.push(action.payload);
    },
    // Удаление задачи по id
    removeTask: (state, action: PayloadAction<string>) => {
      const id = action.payload; // id задачи, которую нужно удалить
      state.items = state.items.filter(item => {
        return item.id !== id;
        // Оставляем в массиве только те задачи, у которых id отличается от переданного
      });
    },
    // Увеличение счетчика задачи
    increaseTask: (state, action: PayloadAction<string>) => {
      const id = action.payload; //Идентификатор задачи, счетчик которой нужно увеличить
      const findTask = state.items.find(task => task.id === id);

      if (findTask) {
        findTask.count++;
      }
    },
    // Уменьшение счетчика задачи
    decreaseTask: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const findTask = state.items.find(task => task.id === id);

      if (findTask) {
        findTask.count--;
      }
    },
    // Установка флага редактирования задачи
    editTask: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const findTask = state.items.find(task => task.id === id);

      if (findTask) {
        findTask.edit = true;
      }
    },
    // Переименование задачи
    renameTask: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const { id, title } = action.payload;
      const findTask = state.items.find(task => task.id === id);

      if (findTask) {
        findTask.edit = false; // Сброс флага редактирования задачи
        findTask.title = title; // Установка нового заголовка задачи
      }
    },
    // Завершение задачи
    finishTask: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const findTask = state.items.find(task => task.id === id);

      if (findTask) {
        findTask.done++; // Увеличение счетчика завершенных помидорок

        if (findTask.done === findTask.count) {
          state.currentId = null;
        }
      }
    },
    // Задать currentId
    setCurrentId: (state, action: PayloadAction<string | null>) => {
      state.currentId = action.payload;
    },
  },
});

export const {
  addTask,
  removeTask,
  increaseTask,
  decreaseTask,
  editTask,
  renameTask,
  finishTask,
  setCurrentId,
} = tasksSlice.actions;
// Селектор для получения состояния задач из корневого состояния Redux
export const tasks = (state: RootState) => state.tasks;
export const finishedTasks = (state: RootState) =>
  state.tasks.items.filter(t => t.count === t.done);
export const activeTasks = (state: RootState) => state.tasks.items.filter(t => t.count !== t.done);

export const currentTaskId = (state: RootState) => state.tasks.currentId;
export const currentTask = (state: RootState) =>
  state.tasks.items.find(t => t.id === state.tasks.currentId);

// Экспорт редюсера задач для подключения к хранилищу
export default tasksSlice.reducer;
