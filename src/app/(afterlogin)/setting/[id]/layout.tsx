import Navbar from '@/app/(afterlogin)/_components/Navbar';
import styles from './layout.module.scss';
import { ReactChildrenProps } from '@/types/common';

const Layout = ({ children }: ReactChildrenProps) => {
  return (
    <div className={styles.container}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
