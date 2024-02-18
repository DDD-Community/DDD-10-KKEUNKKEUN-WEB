import { combineClassName } from '@/app/_utils/style';

import LogoIcon from '@/app/_svgs/LogoIcon';
import RecordOnIcon from '../_svgs/RecordOnIcon';
import CloseIcon from '../_svgs/CloseIcon';

import styles from './PracticeNav.module.scss';

const PracticeNav = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.contents__box}>
        <div className={combineClassName([styles.contents, styles.contents__left])}>
          <LogoIcon />
          <h3 className={styles.title}>발표이름 발표이름 발표이름 발표이름 발표이름 발표이름</h3>
        </div>
        <div className={combineClassName([styles.contents, styles.contents__center])}>
          <RecordOnIcon />
          <em className={styles.division}></em>
          <h2>15:00</h2>
        </div>
        <div className={combineClassName([styles.contents, styles.contents__right])}>
          <button className={styles.action__next}>다음 페이지</button>
          <button className={styles.action__close}>
            <CloseIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PracticeNav;
