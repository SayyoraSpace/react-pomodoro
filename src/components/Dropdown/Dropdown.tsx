import React, { useEffect, useRef } from 'react';
import styles from './dropdown.module.css';

// Определение пропсов
interface IDropdownProps {
  children: React.ReactNode; //Дочерние элементы, которые будут отображаться в выпадающем меню
  isOpen?: boolean; //Флаг, указывающий, открыто ли выпадающее меню (по умолчанию false)
  onOpen?: () => void; // Функция обратного вызова вызывается при открытии меню
  onClose?: () => void; // Функция обратного вызова вызывается при закрытии меню
}

// Функция-заглушка для обратных вызовов по умолчанию
const NOOP = () => {};

export function Dropdown({ children, isOpen, onOpen = NOOP, onClose = NOOP }: IDropdownProps) {
  // Состояние для отслеживания открытости выпадающего меню
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  // Обновление состояния при изменении пропса isOpen
  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  // Вызов обратных вызовов onOpen и onClose при изменении состояния isDropdownOpen
  React.useEffect(() => (isDropdownOpen ? onOpen() : onClose()), [isDropdownOpen, onClose, onOpen]);

  // Ссылка на DOM-элемент меню
  const menuRef = useRef<HTMLDivElement>(null);

  // Обработчик открытия/закрытия меню
  const handleOpen = () => {
    console.log(isOpen);
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  //Закрытие выпадающего меню по клику вне списка
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // содержится ли целевой элемент внутри области, на которую ссылается menuRef
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    // слушатель события клика для всего документа
    document.addEventListener('click', handleClick);
    // Функция, которая будет вызвана при размонтировании компонента
    return () => {
      // Удаляем слушатель события клика при размонтировании компонента,
      // чтобы избежать утечки памяти и некорректного поведения
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={styles.container} ref={menuRef}>
      <button className={styles.btn} onClick={handleOpen}>
        <svg
          width="26"
          height="6"
          viewBox="0 0 26 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="3" fill="#C4C4C4" />
          <circle cx="13" cy="3" r="3" fill="#C4C4C4" />
          <circle cx="23" cy="3" r="3" fill="#C4C4C4" />
        </svg>
      </button>
      {/* Контейнер для элементов меню, отображается только если меню открыто */}
      {isDropdownOpen && (
        <div className={styles.listContainer}>
          <div className={styles.list}>{children}</div>
        </div>
      )}
    </div>
  );
}
