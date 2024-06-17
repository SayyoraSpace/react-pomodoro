import styles from './statchart.module.css';
import cn from 'classnames';

interface Props {
  currentDay: number;
  weekTime: number[];
  setDay: React.Dispatch<React.SetStateAction<number>>;
}

const MAX_BAR = 360; // px
const LINES_HEIGHTS = [336, 252, 168, 84]; // px

const barKeys = ['1', '2', '3', '4', '5', '6', '0'];
const bars: Record<string, string> = {
  '1': 'Пн',
  '2': 'Вт',
  '3': 'Ср',
  '4': 'Чт',
  '5': 'Пт',
  '6': 'Сб',
  '0': 'Вс',
};

const getTimeString = (duration: number) => {
  const hour = Math.floor((duration / 3600) % 60);
  const min = Math.floor((duration / 60) % 60);
  const sec = duration % 60;

  const hourMin = `${hour} ч ${min} мин`;
  const minSec = `${min} мин ${sec} сек`;
  const secStr = `${sec} сек`;

  return hour < 1 ? (min < 1 ? secStr : minSec) : hourMin;
};

export function StatChart({ weekTime, setDay, currentDay }: Props) {
  const max = Math.max(...weekTime);
  const heights = weekTime.map(time => (time / max) * MAX_BAR);
  const lines = LINES_HEIGHTS.map(line => Math.round((line / MAX_BAR) * max));

  return (
    <div className={styles.chart}>
      <div className={styles.grid}>
        {lines.map((line, index) => (
          <div className={styles.line} key={index}>
            <span className={styles.time}>{getTimeString(line)}</span>
          </div>
        ))}
      </div>
      <div className={styles.weekDay}>
        {barKeys.map((ind, index) => (
          <div className={styles.dayWeek} onClick={() => setDay(Number(ind))} key={index}>
            <div
              className={cn(styles.bar, {
                [styles.red]: currentDay === Number(ind),
              })}
              style={{ height: heights[Number(ind)] || 5 }}
            ></div>
            <span
              className={cn(styles.text, {
                [styles.redText]: currentDay === Number(ind),
              })}
            >
              {bars[ind]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
