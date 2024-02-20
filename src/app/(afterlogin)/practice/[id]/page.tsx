'use client';

import styles from './page.module.scss';
import classNames from 'classnames/bind';

export default function Page({ params }: { params: { id: string } }) {
  const cx = classNames.bind(styles);

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <section className={styles.presentation__box}>
          <article className={styles.presentation}>img...</article>
          <section className={styles.helper__box}>
            <article className={cx(['helper', 'helper--next'])}>
              <h4 className={styles.helper__title}>다음 슬라이드</h4>
              <span className={cx(['helper__subtitle', 'helper__subtitle--next'])}>2/15</span>
              <div>img...</div>
            </article>
            <article className={cx(['helper', 'helper--memo'])}>
              <h4 className={styles.helper__title}>메모하기</h4>
              <span className={cx(['helper__subtitle', 'helper__subtitle--memo'])}>
                발표 연습 중 메모를 입력하면 녹음이 일시정지돼요.
              </span>
              <textarea />
            </article>
          </section>
        </section>
        <article className={styles.script__box}>
          <p className={styles.script}>
            발표 내용 발표 내용 ... 발표 내용 발표 내용 ... 발표 내용 발표 내용 ... 발표 내용 발표
            내용 ... 발표 내용 발표 내용 ... 발표 내용 발표 내용 ... 발표 내용 발표 내용 ... 발표
            내용 발표 내용 ... 발표 내용 발표 내용 ...발표 내용 발표 내용 ... 발표 내용 발표 내용
            ... 발표 내용 발표 내용 ... 발표 내용 발표 내용 ... 발표 내용 발표 내용 ... 발표 내용
            발표 내용 ... 발표 내용 발표 내용 ... 발표 내용 발표 내용 ... 발표 내용 발표 내용 ...
            발표 내용 발표 내용 ... 발표 내용 발표 내용 ...
          </p>
        </article>
      </div>
    </div>
  );
}
