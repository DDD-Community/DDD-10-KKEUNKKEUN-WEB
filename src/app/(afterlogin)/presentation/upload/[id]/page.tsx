import CreatePresentation from './_component/CreatePresentation';
import styles from './page.module.scss';
const page = () => {
  return (
    <div className={styles.container}>
      <CreatePresentation />
    </div>
  );
};

export default page;
