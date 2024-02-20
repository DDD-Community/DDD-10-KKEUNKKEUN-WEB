import styles from './Step.module.scss';
import classNames from 'classnames/bind';

interface StepProps {
  number: number;
  label: string;
  current: number; // 배열 인덱스
}

const cx = classNames.bind(styles);

const Step = ({ number, label, current }: StepProps) => {
  return (
    <div className={styles.container}>
      {number !== 1 && <line className={cx(['line', current + 1 >= number && 'selected'])} />}
      <div className={cx(['number', current + 1 >= number && 'selected'])}>{number}</div>
      <p className={cx(['label', current + 1 >= number && 'selected'])}>{label}</p>
    </div>
  );
};

export default Step;
