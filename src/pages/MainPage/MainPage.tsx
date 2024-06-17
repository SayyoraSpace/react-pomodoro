import { Timer } from './Timer';
import { Work } from './Work';
import styles from './mainpage.module.css';

export function MainPage() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.mainPage}>
          <Work />
          <Timer />
        </div>
      </div>
    </div>
  );
}
