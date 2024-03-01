import { PresentationListType } from '@/types/service';
import styles from './HistoryBanner.module.scss';
import ExerciseInfo from './_elements/ExerciseInfo';

interface Props {
  presentation: PresentationListType['page']['content'][0];
}
const HistoryBanner = ({ presentation }: Props) => {
  // TODO: API 명세에 이미지 속성 추가되면 적용 하기
  return (
    <section className={styles.container}>
      <div className={styles.history}>
        <h2 className={styles.history__title}>최근에 진행한 발표 연습</h2>
        <div className={styles.history__contents}>
          <div className={styles.presentation__thumbnail}>이미지</div>
          <ExerciseInfo presentation={presentation} />
        </div>
      </div>
      <div className={styles.action__box}>
        <button className={styles.action}>연습 시작하기</button>
      </div>
    </section>
  );
};

export default HistoryBanner;
