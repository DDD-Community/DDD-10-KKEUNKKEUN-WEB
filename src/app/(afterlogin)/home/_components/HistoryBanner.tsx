import styles from './HistoryBanner.module.scss';

const HistoryBanner = () => {
  return (
    <section className={styles.container}>
      <div className={styles.history}>
        <h3 className={styles.history__title}>최근에 진행한 발표 연습</h3>
        <div className={styles.history__contents}>
          <div className={styles.presentation__thumbnail}>이미지</div>
          <div className={styles.presentation__info}>
            <h4 className={styles.title}>발표 이름 발표 이름 발표 이름 발표 이름</h4>
            <span className={styles.desc}>
              D-3
              <div className={styles.division}></div>
              발표 시간 3분
            </span>
          </div>
        </div>
      </div>
      <div className={styles.action__box}>
        <button className={styles.action}>연습 시작하기</button>
      </div>
    </section>
  );
};

export default HistoryBanner;
