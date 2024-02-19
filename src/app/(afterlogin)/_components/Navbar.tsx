import { cookies } from 'next/headers';
import NavMenu from './NavMenu';
import LogoIcon from '@/app/_svgs/LogoIcon';
import styles from './Navbar.module.scss';
import UserIcon from '../_svgs/UserIcon';

const Navbar = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_DEV}/accounts/me`, {
  //   method: 'GET',
  //   headers: { Cookie: cookies().toString() },

  //   cache: 'no-store',
  // });
  // console.log(await res.json());
  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <LogoIcon />
          <NavMenu />
        </div>

        <div className={styles.right}>
          <UserIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
