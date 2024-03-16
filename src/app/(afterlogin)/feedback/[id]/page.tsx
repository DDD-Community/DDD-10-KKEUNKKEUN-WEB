import CategoryFeedback from './_components/CategoryFeedback';
import MemorizeReview from './_components/MemorizeReview';
import TotalScore from './_components/TotalScore';
import styles from './page.module.scss';
const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TotalScore />
        <CategoryFeedback />
        <MemorizeReview />
      </div>
    </div>
  );
};

export default page;
