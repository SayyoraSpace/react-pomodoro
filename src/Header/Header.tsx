import styles from './header.module.css';
import { Link } from 'react-router-dom';
import Logo from '/src/icons/tomato_logo.svg';
import { PATH_STATISTICS } from '../routes';

export function Header() {
  return (
    <header className={styles.headerWrapper}>
      <div className="container">
        <div className={styles.header}>
          <Link to={'/'}>
            <div className={styles.logo}>
              <img src={Logo} width={40} height={30} alt="" />
              <span className={styles.logoTitle}>pomodoro_box</span>
            </div>
          </Link>
          <div className={styles.statisticTitle}>
            <Link to={PATH_STATISTICS}>📶Статистика</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
