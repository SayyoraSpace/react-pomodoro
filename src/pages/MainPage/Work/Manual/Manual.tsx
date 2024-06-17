import styles from './manual.module.css';

export function Manual() {
  return (
    <>
      <h2 className={styles.title}> Начнем работать!</h2>
      <ul className={styles.list}>
        <li className={styles.listLi}>🖋️Напишите название текущей задачи</li>
        <li className={styles.listLi}>⏰ Запустите таймер</li>
        <li className={styles.listLi}>⏸ Сделайте короткий перерыв (5 минут)</li>
        <li className={styles.listLi}>
          Продолжайте работать 🍅 за 🍅,
          <br /> пока задача не будут выполнена
        </li>
        <li className={styles.listLi}>
          Каждые 4 🍅 делайте длинный перерыв
          <br />
          (15-30 минут)
        </li>
        <li className={styles.listLi}>Переустановите таймер и начните процесс снова</li>
      </ul>
    </>
  );
}
