import { useAppSelector } from '../../../../hooks';
import { ITask, activeTasks } from '../../../../store/slices/tasks';
import { Task } from './Task';
import styles from './tasklist.module.css';

export function TaskList() {
  // селектор для получения списка задач из Redux состояния
  // const tasksList = useAppSelector(state => state.tasks.items);
  const tasksList = useAppSelector(activeTasks);

  return (
    <ul className={styles.taskList}>
      {tasksList.map((task: ITask) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
}
