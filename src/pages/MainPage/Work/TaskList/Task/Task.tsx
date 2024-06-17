import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../../hooks';
import { ITask, renameTask, setCurrentId } from '../../../../../store/slices/tasks';
import { Menu } from './Menu';
import styles from './task.module.css';

interface TaskProps {
  task: ITask;
}

export const Task = ({ task }: TaskProps) => {
  // Локальное состояние для отслеживания заголовка задачи
  const [taskTitle, setTaskTitle] = useState(task.title);
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  // Обработчик изменения значения в поле ввода заголовка задачи
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setTaskTitle(e.target.value);
  };

  // Обработчик нажатия клавиши в поле ввода заголовка задачи
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.code === 'Enter') {
      console.log('enter event');
      // Если нажата Enter, отправляем действие на переименование задачи в хранилище Redux
      dispatch(renameTask({ id: task.id, title: taskTitle }));
    }
  };
  // Установка индекса текущей задачи в контексте
  const handleCurrent = () => {
    dispatch(setCurrentId(task.id));
  };

  useEffect(() => {
    if (task.edit) {
      inputRef.current?.focus();
    }
  }, [task.edit]);

  return (
    <li className={styles.task}>
      <div className={styles.block} onClick={handleCurrent}>
        {/* Отображение счетчика задачи */}
        <span className={styles.count}>{task.count}</span>

        {task.edit ? (
          <input
            ref={inputRef}
            className={styles.taskInput}
            value={taskTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className={styles.title}>{task.title}</span>
        )}

        <Menu task={task} />
      </div>
    </li>
  );
};
