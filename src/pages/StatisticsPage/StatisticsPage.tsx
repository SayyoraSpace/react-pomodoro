import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ChartMode,
  getWeekFocus,
  getWeekPauseTime,
  getWeekPomodorosCount,
  getWeekStopCount,
  getWeekTime,
} from '../../store/slices/statistics';
import { RootState } from '../../store/store';
import { StatChart } from './StatChart';
import { StatDay } from './StatDay';
import { StatFocus } from './StatFocus';
import { StatPause } from './StatPause';
import { StatPomodoro } from './StatPomodoro';
import { StatStop } from './StatStop';
import styles from './statisticspage.module.css';

// Фокус: отношение (x/y) времени законченных помидорок (x) ко
// всему времени, затраченному на помидорки (y)

const chartModes = [
  {
    name: 'Эта неделя',
    value: ChartMode.CurrentWeek,
  },
  {
    name: 'Прошедшая неделя',
    value: ChartMode.LastWeek,
  },
  {
    name: '2 недели назад',
    value: ChartMode.TwoWeeksAgo,
  },
];

export function StatisticsPage() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedChartMode, setSelectedChartMode] = useState<ChartMode>(ChartMode.CurrentWeek);
  const [day, setDay] = useState(new Date().getDay());

  const weekStopCount = useSelector((state: RootState) =>
    getWeekStopCount(state, selectedChartMode),
  );
  const weekPauseTime = useSelector((state: RootState) =>
    getWeekPauseTime(state, selectedChartMode),
  );
  const weekFocus = useSelector((state: RootState) => getWeekFocus(state, selectedChartMode));
  const weekTime = useSelector((state: RootState) => getWeekTime(state, selectedChartMode));
  const weekPomodorosCount = useSelector((state: RootState) =>
    getWeekPomodorosCount(state, selectedChartMode),
  );

  const statisticsRef = useRef<HTMLDivElement>(null);

  const currentWeek =
    chartModes.find(chartMode => chartMode.value === selectedChartMode)?.name ?? '';

  // функция вызывается при выборе нового режима из выпадающего меню и обновляет состояние выбранного режима и закрывает выпадающее меню
  const handleSelectMode = (selectedMode: ChartMode) => {
    setSelectedChartMode(selectedMode);
    setIsSelectOpen(false);
  };

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !statisticsRef.current?.contains(event.target)) {
        setIsSelectOpen(false);
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Ваша активность</h2>

          <div className={styles.dropDown} ref={statisticsRef}>
            <div
              className={styles.dropDownMenu}
              onClick={() => {
                setIsSelectOpen(true);
              }}
            >
              {currentWeek}
              <div className={styles.arrow}>
                {isSelectOpen ? (
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15 1L8 8L1 1" stroke="#B7280F" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 9L8 2L15 9" stroke="#B7280F" strokeWidth="2" />
                  </svg>
                )}
              </div>
            </div>
            {isSelectOpen && (
              <ul className={styles.dropMenu}>
                {chartModes.map(item => {
                  return (
                    <li
                      key={item.value}
                      className={styles.menuItems}
                      onClick={() => {
                        handleSelectMode(item.value);
                      }}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.blocks}>
          <StatDay weekDay={day} duration={weekTime[day]} />
          <StatChart currentDay={day} setDay={setDay} weekTime={weekTime} />
          <StatPomodoro pomodoros={weekPomodorosCount} />
          <StatFocus focus={weekFocus} />
          <StatPause seconds={weekPauseTime} />
          <StatStop count={weekStopCount} />
        </div>
      </div>
    </div>
  );
}
