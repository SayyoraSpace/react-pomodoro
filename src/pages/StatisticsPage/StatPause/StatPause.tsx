import classNames from 'classnames';
import styles from './statpause.module.css';

interface Props {
  seconds: number;
}

export function StatPause({ seconds }: Props) {
  const pauseClass = classNames(styles.pause, seconds > 0 && styles.purple);

  const svg = classNames(seconds > 0 && styles.svg);

  return (
    <div className={pauseClass}>
      <div className={styles.descr}>
        <span className={styles.title}>Время на паузе</span>
        <span className={styles.time}>
          {Math.floor(seconds / 60)}м {seconds % 60}с
        </span>
      </div>
      <svg
        className={svg}
        width="129"
        height="129"
        viewBox="0 0 129 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z"
          stroke="#C4C4C4"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M64.3154 37.158V64.3159L77.8944 77.8948"
          stroke="#C4C4C4"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
