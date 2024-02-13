'use client';

import FlyoutMenu from '@/app/_components/_modules/FlyoutMenu';
import styles from './ExerciseItem.module.scss';
import ExerciseInfo from './_elements/ExerciseInfo';

const ExerciseItem = () => {
  return (
    <article className={styles.container}>
      <div className={styles.thumbnail}>
        <div className={styles.menu}>
          <FlyoutMenu>
            <FlyoutMenu.ToggleButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="16"
                viewBox="0 0 128 512"
                fill="none"
              >
                <path
                  d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
                  fill="#4B4B4B"
                />
              </svg>
            </FlyoutMenu.ToggleButton>
            <FlyoutMenu.MenuList>
              <FlyoutMenu.MenuItem>apple</FlyoutMenu.MenuItem>
              <FlyoutMenu.MenuItem>banana</FlyoutMenu.MenuItem>
              <FlyoutMenu.MenuItem>cat</FlyoutMenu.MenuItem>
            </FlyoutMenu.MenuList>
          </FlyoutMenu>
        </div>
      </div>
      <div className={styles.info__box}>
        <ExerciseInfo />
        <div className={styles.action__box}>
          <button className={styles.action}></button>
        </div>
      </div>
    </article>
  );
};

export default ExerciseItem;
