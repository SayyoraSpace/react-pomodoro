import { ITimer } from '../..';
import styles from './timetimer.module.css';
import cn from 'classnames';

interface Props {
  timer: ITimer;
}

const formatTime = (seconds: number) => {
  const secondsRemaining = seconds % 60;
  const secondsString = secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining;

  return `${Math.trunc(seconds / 60)}:${secondsString}`;
};

export const TimeTimer = ({ timer }: Props) => {
  return (
    <div
      className={cn(styles.timeTimer, {
        [styles.textGradient]: timer.inProgress,
      })}
    >
      {!timer.isBreak ? formatTime(timer.duration) : formatTime(timer.breakDuration)}

      {/* <button className={styles.setting}>
        <svg
          className={styles.btn}
          width="45"
          height="45"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM26.2756 33V26.1321H33V23.7029H26.2756V17H23.7244V23.7029H17V26.1321H23.7244V33H26.2756Z"
            fill="#C4C4C4"
          ></path>
        </svg>
      </button> */}
    </div>
  );
};
