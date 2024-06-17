import { FormEvent, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../../../hooks';
import { addTask, setCurrentId } from '../../../../store/slices/tasks';

import styles from './addtask.module.css';

export function AddTask() {
  // useState для управления состоянием ввода и useRef для создания ссылки на элемент <input>.
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  // Обработчик изменения значения ввода
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value);
  };
  // Обработчик отправки формы
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const addNewTask = () => {
    const newTask = {
      id: v4(),
      title: value,
      count: 1,
      edit: false, // Показывает, редактируется ли задача в настоящий момент
      done: 0,
    };
    // Проверка, что значение ввода не пустое
    if (value !== '') {
      // Диспетчер Redux вызывает действие для добавления новой задачи
      dispatch(addTask(newTask));
      dispatch(setCurrentId(newTask.id));
    }
    setValue(''); // Очистка значения ввода после добавления задачи
  };
  // Эффект для фокусировки на поле ввода при загрузке компонента
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        id="title"
        title="title"
        value={value}
        onChange={handleChange}
        ref={inputRef}
        placeholder="Название задачи"
      />
      <button className={styles.btn} type="submit" onClick={addNewTask}>
        Добавить
      </button>
    </form>
  );
}
