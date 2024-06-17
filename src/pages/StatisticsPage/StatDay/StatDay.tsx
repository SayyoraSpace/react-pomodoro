import { declinationOfNumber } from '../../../utils/declinationOfNumber';
import styles from './statday.module.css';

interface Props {
  weekDay?: number;
  duration: number;
}

const WEEK_DAYS = {
  0: 'Воскресенье',
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота',
};

// Получить название дня недели по индексу weekDay от 0 до 6
const getDay = (weekDay: number): string => Object.values(WEEK_DAYS)[weekDay];

const getTimeString = (duration: number) => {
  const hour = Math.floor((duration / 3600) % 60);
  const min = Math.floor((duration / 60) % 60);
  const sec = duration % 60;

  const hourMin = `${hour} ${declinationOfNumber(hour, ['часа', 'часов', 'часов'])} ${min} ${declinationOfNumber(min, ['минуты', 'минут', 'минут'])}`;
  const minSec = `${min} ${declinationOfNumber(min, ['минуты', 'минут', 'минут'])} ${sec} ${declinationOfNumber(sec, ['секунды', 'секунд', 'секунд'])}`;

  return hour < 1 ? minSec : hourMin;
};

export function StatDay({ weekDay, duration }: Props) {
  if (weekDay === undefined) {
    return (
      <div className={styles.totalTime}>
        <p className={styles.inform}>Нет данных</p>
      </div>
    );
  }

  const day = getDay(weekDay);
  const timeString = getTimeString(duration);

  return (
    <div className={styles.totalTime}>
      <h3 className={styles.title}>{day}</h3>
      {duration > 0 ? (
        <p className={styles.inform}>
          Вы работали над задачами в&nbsp;течение <span className={styles.time}>{timeString}</span>
        </p>
      ) : (
        <p className={styles.inform}>Нет данных</p>
      )}
    </div>
  );
}
