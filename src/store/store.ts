import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { ITasksState } from './slices/tasks';
import statisticsReducer, { StatisticsState } from './slices/statistics';

// Хранилище Redux, которое автоматически сохраняет и загружает состояние из локального хранилища браузера,
// позволяя приложению сохранять состояние между сеансами

// Создание хранилища:
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    statistics: statisticsReducer,
  },
  preloadedState: loadFromLocalStorage() as RootState,
});

// Функции для сохранения и загрузки из локального хранилища:
function saveToLocalStorage(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('persistentState', serializedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('persistentState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

// Подписка на изменения состояния для автоматического сохранения:
store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = {
  tasks: ITasksState;
  statistics: StatisticsState;
};
export type AppDispatch = typeof store.dispatch;
