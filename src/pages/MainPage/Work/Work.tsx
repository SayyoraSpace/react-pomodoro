import { AddTask } from './AddTasks';
import { Manual } from './Manual';
import { TaskList } from './TaskList';
import styles from './work.module.css';

export function Work() {
  return (
    <div className={styles.work}>
      <Manual />
      <AddTask />
      <TaskList />
    </div>
  );
}
