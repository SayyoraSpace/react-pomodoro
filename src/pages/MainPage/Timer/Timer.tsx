import { useSelector } from 'react-redux';
import { HeaderTimer } from './HeaderTimer';
import { MainTimer } from './MainTimer';

import { useState } from 'react';
import { currentTask } from '../../../store/slices/tasks';
import styles from './timer.module.css';
import { INITIAL_TIMER } from '../constants';

export interface ITimer {
  duration: number; // число секунд до выполнения таски
  breakDuration: number; // число секунд отдыха
  inProgress: boolean;
  isBreak: boolean;
  isPaused: boolean;
}

export function Timer() {
  const task = useSelector(currentTask);

  const [timer, setTimer] = useState<ITimer>(INITIAL_TIMER);

  if (!task) {
    return <div className={styles.timer}> ✍ Добавьте задачу, Уважаемый!</div>;
  }

  return (
    <div className={styles.timer}>
      <HeaderTimer timer={timer} />
      <MainTimer timer={timer} setTimer={setTimer} />
    </div>
  );
}
