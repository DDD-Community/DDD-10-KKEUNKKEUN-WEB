'use client';

import { useModalStore } from '@/store/modal';

import styles from './ConfirmModal.module.scss';

const ConfirmModal = () => {
  const { modalData, closeModal } = useModalStore();

  const { content, onCancel, onSubmit } = modalData;

  const onCancelInternal = () => {
    onCancel?.fn();
    closeModal();
  };

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
        <button onClick={onCancelInternal}>{onCancel?.content}</button>
        <button onClick={onSubmitInternal}>{onSubmit?.content}</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
