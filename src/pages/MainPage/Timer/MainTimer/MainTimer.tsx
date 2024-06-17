import { ITimer } from '..';
import { ControlTimer } from './ControlTimer';
import { TaskTimer } from './TaskTimer';
import { TimeTimer } from './TimeTimer';
import styles from './maintimer.module.css';

interface Props {
  timer: ITimer;
  setTimer: React.Dispatch<React.SetStateAction<ITimer>>;
}

export function MainTimer({ timer, setTimer }: Props) {
  return (
    <div className={styles.mainTimer}>
      <TimeTimer timer={timer} />
      <TaskTimer />
      <ControlTimer timer={timer} setTimer={setTimer} />
    </div>
  );
}
