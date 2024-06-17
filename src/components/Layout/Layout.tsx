import { Header } from '../../Header';
import styles from './layout.module.css';

interface ILayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
}
