import React from 'react';
import styles from './FeedbackScoreButton.module.scss';

interface Props {
  score: number | string;
  onClick: () => void;
}

const FeedbackScoreButton = ({ score, onClick }: Props) => {
  return (
    <div className={styles.action__box}>
      <button className={styles.action} onClick={onClick}>
        {score}점
      </button>
    </div>
  );
};

export default FeedbackScoreButton;
