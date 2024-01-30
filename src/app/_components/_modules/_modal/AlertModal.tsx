'use client';

import { useModalStore } from '@/store/modal';

import styles from './AlertModal.module.scss';

const AlertModal = () => {
  const { modalData, closeModal } = useModalStore();

  const { content, onSubmit } = modalData;

  // alert는 취소 버튼이 없으므로 onSubmit 만 진행
  const onSubmitInternal = () => {
    onSubmit?.fn();
    closeModal();
  };
  return (
    <div className={styles.modalContent}>
      <div>{content}</div>
      <button className={styles.closeButton} onClick={closeModal}>
        x
      </button>
      <div className={styles.actionButtons}>
        <button onClick={onSubmitInternal}>{onSubmit?.content}</button>
      </div>
    </div>
  );
};

export default AlertModal;
