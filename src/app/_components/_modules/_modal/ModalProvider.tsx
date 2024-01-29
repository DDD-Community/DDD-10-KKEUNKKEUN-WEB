'use client';

import { useModalStore } from '@/store/modal';

import styles from './ModalProvider.module.scss';
import { ReactNode } from 'react';

interface ModalProvider {
  children: ReactNode;
}

const ModalProvider = ({ children }: ModalProvider) => {
  const { isOpen, modalData, closeModal } = useModalStore();

  const { content, onCancel, onSubmit } = modalData;

  if (!isOpen) {
    return <></>;
  }

  const onCancelInternal = () => {
    onCancel?.(); // onCancel이 있을때만 진행
    closeModal();
  };

  const onSubmitInternal = () => {
    onSubmit?.(); // onSubmit이 있을때만 진행
    closeModal();
  };

  return (
    <div className={styles.modalContainer}>
      {children}
      {/* <div className={styles.modalContent}>
        <div onClick={closeModal}>x</div>
        <div>
          <div>{content}</div>
          <div>
            {onCancel && <button onClick={onCancelInternal}>cancel</button>}
            <button onClick={onSubmitInternal}>submit</button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ModalProvider;
