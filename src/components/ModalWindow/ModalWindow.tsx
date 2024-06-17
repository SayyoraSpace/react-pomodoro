import ReactDOM from 'react-dom';
import styles from './modalwindow.module.css';

interface IModalWindowProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

export function ModalWindow({ children }: IModalWindowProps) {
  // Получаем узел DOM, куда будет рендериться модальное окно
  const node = document.querySelector('#modal_root');

  if (!node) return null;

  // Используем ReactDOM.createPortal для рендеринга модального окна в узел вне стандартного дерева DOM
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalWindow}>
        <button className={styles.btnExit}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9115 13.8058L6.84406 18.9567L4.96166 17.0433L10.0291 11.8924L5.0675 6.84914L6.85992 5.02721L11.8215 10.0705L16.7673 5.04334L18.6497 6.95672L13.7039 11.9839L18.6655 17.0272L16.8731 18.8491L11.9115 13.8058Z"
              fill="#C4C4C4"
            />
          </svg>
        </button>
        {/* Контент модального окна передается через children */}
        {children}
      </div>
    </div>,
    node, // Узел, в который рендерится модальное окно
  );
}
