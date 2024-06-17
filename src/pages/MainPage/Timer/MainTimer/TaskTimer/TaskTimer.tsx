import { useSelector } from 'react-redux';
import styles from './tasktimer.module.css';
import { currentTask } from '../../../../../store/slices/tasks';

export function TaskTimer() {
  const task = useSelector(currentTask);

  return (
    <div className={styles.taskTimer}>
      <span>
        <span className={styles.taskNumber}>Задача {task?.title}</span>
      </span>
    </div>
  );
}
