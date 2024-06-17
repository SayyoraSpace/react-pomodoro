import { useSelector } from 'react-redux';
import styles from './headertimer.module.css';
import { currentTask } from '../../../../store/slices/tasks';
import { ITimer } from '..';
import cn from 'classnames';

interface Props {
  timer: ITimer;
}

export function HeaderTimer({ timer }: Props) {
  const task = useSelector(currentTask);

  return (
    <div
      className={cn(styles.headerTimer, {
        [styles.headerRed]: timer.inProgress,
        [styles.headerGreen]: timer.isBreak,
      })}
    >
      <span className={styles.title}>{task?.title}</span>

      {timer.isBreak ? (
        <span className={styles.number}> ☕</span>
      ) : (
        <span className={styles.number}>{task?.done ?? 0} 🍅</span>
      )}
    </div>
  );
}
