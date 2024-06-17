import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Интерфейс для представления отдельной записи статистики
export interface IStatItem {
  stopCount: number;
  stopTime: number;
  pauseTime: number;
  pomodoros: number;
  pomodorosTime: number;
}
// Тип для хранения статистических данных по дням
export type StatisticsState = Record<string, IStatItem>;

export enum ChartMode {
  CurrentWeek,
  LastWeek,
  TwoWeeksAgo,
}

// Начальное состояние
const initialState: StatisticsState = {};
const initialStatItem: IStatItem = {
  stopCount: 0,
  stopTime: 0,
  pauseTime: 0,
  pomodoros: 0,
  pomodorosTime: 0,
};

// Создание слайса для управления статистикой
export const statisticsSlice = createSlice({
  name: 'statistics', // Имя слайса
  initialState,

  // Действия для изменения состояния
  reducers: {
    // Добавление статистики по стопу
    addStop: (state, action: PayloadAction<{ seconds: number; date: string }>) => {
      const { seconds, date } = action.payload;

      // Если данных по данной дате нет, добавляем новую запись
      if (!state[date]) {
        state[date] = {
          ...initialStatItem,
          stopCount: 1,
          stopTime: seconds,
        };
      }
      // Иначе обновляем существующую запись
      state[date] = {
        ...state[date],
        stopCount: state[date].stopCount + 1,
        stopTime: state[date].stopTime + seconds,
      };
    },
    // Добавление статистики по паузам
    addPause: (state, action: PayloadAction<{ seconds: number; date: string }>) => {
      const { seconds, date } = action.payload;

      if (!state[date]) {
        state[date] = {
          ...initialStatItem,
          pauseTime: seconds,
        };
      }

      state[date] = {
        ...state[date],
        pauseTime: state[date].pauseTime + seconds,
      };
    },
    // Добавление статистики по времени работы с помидорками
    addPomodorosTime: (state, action: PayloadAction<{ seconds: number; date: string }>) => {
      const { seconds, date } = action.payload; // Деструктурируем свойства из action.payload

      // Проверяем, есть ли в state запись с заданной датой
      // Если записи нет, создаем новую запись, используя начальное состояние initialStatItem
      if (!state[date]) {
        state[date] = {
          ...initialStatItem,
          pomodoros: 1,
          pomodorosTime: seconds,
        };
      }
      // Если запись уже существует, обновляем ее
      state[date] = {
        ...state[date],
        pomodoros: state[date].pomodoros + 1,
        pomodorosTime: state[date].pomodorosTime + seconds,
      };
    },
  },
});

// Экспорт actions
export const { addStop, addPause, addPomodorosTime } = statisticsSlice.actions;

// Selectors

// Селектор для получения всего состояния статистики
export const statisticsSelector = (state: RootState) => state.statistics;

// Создание селектора, который принимает selectedChartMode и возвращает данные за выбранную неделю
export const getWeekData = createSelector(
  [statisticsSelector, (_: RootState, selectedChartMode: ChartMode) => selectedChartMode],
  (data, selectedChartMode) => {
    const currentDate = new Date(); // Текущая дата
    const endOfWeekDate = new Date();
    const startOfWeekDate = new Date(); // Дата начала текущей недели

    // Определяем дату начала текущей недели в зависимости от выбранного режима
    switch (selectedChartMode) {
      case ChartMode.LastWeek:
        startOfWeekDate.setDate(currentDate.getDate() - currentDate.getDay() + 1 - 7);
        endOfWeekDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
        endOfWeekDate.setHours(0, 0, 0, 0);
        break;
      case ChartMode.TwoWeeksAgo:
        startOfWeekDate.setDate(currentDate.getDate() - currentDate.getDay() + 1 - 14);
        endOfWeekDate.setDate(currentDate.getDate() - currentDate.getDay() + 1 - 7);
        endOfWeekDate.setHours(0, 0, 0, 0);
        break;
      case ChartMode.CurrentWeek:
      default:
        startOfWeekDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
        break;
    }

    startOfWeekDate.setHours(0, 0, 0, 0);

    console.log('startOfWeekDate', startOfWeekDate);
    console.log('endOfWeekDate', endOfWeekDate);

    const weekData: StatisticsState = {};

    Object.keys(data).forEach(date => {
      const dataDate = new Date(date);
      if (dataDate >= startOfWeekDate && dataDate < endOfWeekDate) {
        weekData[date] = data[date];
      }
    });

    return weekData;
  },
);

// Селектор для получения общего количества стопов за последнюю неделю
export const getWeekStopCount = createSelector([getWeekData], data => {
  let count = 0;

  // Суммируем количество стопов из данных
  Object.values(data).forEach(day => {
    count += day.stopCount;
  });

  return count;
});
// Селектор для получения кол-ва выполненных помидорок
export const getWeekPomodorosCount = createSelector([getWeekData], data => {
  let count = 0;

  // Суммируем количество помидорок  из данных
  Object.values(data).forEach(day => {
    count += day.pomodoros ?? 0;
  });

  return count;
});

// Селектор для получения общего времени пауз за последнюю неделю
export const getWeekPauseTime = createSelector([getWeekData], data => {
  let time = 0;

  // Суммируем время пауз из данных за каждый день
  Object.values(data).forEach(day => {
    time += day.pauseTime;
  });

  return time;
});

// Селектор для получения процента фокуса за последнюю неделю
export const getWeekFocus = createSelector([getWeekData], data => {
  let allTime = 0;
  let pomodorosTime = 0;

  // Суммируем общее время работы и время работы с помидорами из данных за каждый день последней недели
  Object.values(data).forEach(day => {
    allTime += (day.stopTime ?? 0) + (day.pomodorosTime ?? 0);
    pomodorosTime += day.pomodorosTime ?? 0;
  });

  // Рассчитываем процент фокуса за последнюю неделю
  return Math.round((pomodorosTime / allTime) * 100);
});

export const getWeekTime = createSelector([getWeekData], data => {
  const allTime = Array(7).fill(0);

  Object.entries(data).forEach(([date, dayData]) => {
    const day = new Date(date).getDay();
    allTime[day] = (dayData.stopTime ?? 0) + (dayData.pomodorosTime ?? 0);
  });

  return allTime;
});

// Экспорт редюсера задач для подключения к хранилищу
export default statisticsSlice.reducer;
