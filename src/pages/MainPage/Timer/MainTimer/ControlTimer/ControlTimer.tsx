import { useEffect, useState } from 'react';
import moment from 'moment';
import { ITimer } from '../..';
import styles from './controltimer.module.css';
import { useAppDispatch } from '../../../../../hooks';
import {
  currentTaskId as currentTaskIdSelector,
  finishTask,
} from '../../../../../store/slices/tasks';
import { useSelector } from 'react-redux';
import { INITIAL_TIMER } from '../../../constants';
import sound from '../../../../../sounds/ambient-flute-notification-3-185275.mp3';
import { addPause, addPomodorosTime, addStop } from '../../../../../store/slices/statistics';

interface Props {
  timer: ITimer;
  setTimer: React.Dispatch<React.SetStateAction<ITimer>>;
}

export function ControlTimer({ timer, setTimer }: Props) {
  const dispatch = useAppDispatch();
  const currentTaskId = useSelector(currentTaskIdSelector);
  const [intervalId, setIntervalId] = useState(0);
  const [breakIntervalId, setBreakIntervalId] = useState(0);
  const [pauseId, setPauseId] = useState(0);
  const [pause, setPause] = useState(0);

  const playSound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleClickStart = () => {
    setTimer(prevState => ({ ...prevState, inProgress: true, isPaused: false }));

    const newIntervalId = setInterval(() => {
      // уменьшаем duration каждые 1000мс (1сек) на 1
      setTimer(prevState => ({ ...prevState, duration: prevState.duration - 1 }));
    }, 1000);

    setIntervalId(newIntervalId);
  };
  const handleClickContinue = () => {
    setTimer(prevState => ({ ...prevState, inProgress: true, isPaused: false }));

    const newIntervalId = setInterval(() => {
      // уменьшаем duration каждые 1000мс (1сек) на 1
      setTimer(prevState => ({ ...prevState, duration: prevState.duration - 1 }));
    }, 1000);

    setIntervalId(newIntervalId);

    dispatch(
      addPause({
        seconds: pause,
        date: moment().format('YYYY-MM-DD'),
      }),
    );
    clearInterval(pauseId);
    setPause(0);
  };

  const handleClickPause = () => {
    setTimer(prevState => ({ ...prevState, inProgress: false, isPaused: true }));
    clearInterval(intervalId);
    setIntervalId(0);

    const newPauseId = setInterval(() => {
      setPause(prevState => prevState + 1);
    }, 1000);
    setPauseId(newPauseId);
  };

  const handleClickStop = () => {
    setTimer(INITIAL_TIMER);
    clearInterval(intervalId);
    console.log(new Date(), +new Date());
    dispatch(
      addStop({
        seconds: INITIAL_TIMER.duration - timer.duration,
        date: moment().format('YYYY-MM-DD'),
      }),
    );
  };

  const handleClickDone = () => {
    if (currentTaskId) {
      dispatch(finishTask(currentTaskId));
      setTimer(INITIAL_TIMER);
    }
  };

  // Запускаем коллбэк в useEffect если duration стал 0
  useEffect(() => {
    if (timer.duration === 0 && currentTaskId) {
      playSound();
      clearInterval(intervalId);
      setTimer(prevState => ({ ...prevState, isBreak: true, inProgress: false, duration: 10 }));
      // запуск отсчета перерыва
      const breakNewIntervalId = setInterval(() => {
        setTimer(prevState => ({ ...prevState, breakDuration: prevState.breakDuration - 1 }));
      }, 1000);
      // сохранение ID интервала перерыва
      setBreakIntervalId(breakNewIntervalId);

      dispatch(
        addPomodorosTime({
          seconds: INITIAL_TIMER.duration,
          date: moment().format('YYYY-MM-DD'),
        }),
      );
    }
  }, [timer.duration, intervalId, dispatch, currentTaskId, setTimer]);

  // остановка отсчета перерыва
  useEffect(() => {
    if (timer.breakDuration === 0 && currentTaskId) {
      clearInterval(breakIntervalId);
      setTimer(prevState => ({ ...prevState, isBreak: false, breakDuration: 5 }));

      dispatch(finishTask(currentTaskId));
    }
  }, [setTimer, breakIntervalId, timer.breakDuration, dispatch, currentTaskId]);

  return (
    <div className={styles.controlTimer}>
      {/* before start */}
      {!timer.inProgress && !timer.isBreak && !timer.isPaused && (
        <>
          <button className={styles.btnStart} onClick={handleClickStart}>
            Старт
          </button>
          <button className={styles.btnStop} disabled={!timer.inProgress}>
            Стоп
          </button>
        </>
      )}

      {/* inProgress */}
      {timer.inProgress && (
        <>
          <button className={styles.btnStart} onClick={handleClickPause}>
            Пауза
          </button>
          <button className={styles.btnStop} onClick={handleClickStop}>
            Стоп
          </button>
        </>
      )}
      {/* isPaused */}
      {timer.isPaused && (
        <>
          <button className={styles.btnStart} onClick={handleClickContinue}>
            Продолжить
          </button>
          <button className={styles.btnStop} onClick={handleClickDone}>
            Сделано
          </button>
        </>
      )}
    </div>
  );
}
