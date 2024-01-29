'use client';

import { useState, useLayoutEffect, ReactNode } from 'react';

import styles from './Toast.module.scss';

import classNames from 'classnames/bind';
import { useToastStore } from '@/store/modal';

const ToastProvider = () => {
  const { isOpen, modalData, closeModal } = useToastStore();

  const { content } = modalData;

  const [fadeOut, setFadeOut] = useState(false);

  const cx = classNames.bind(styles);

  useLayoutEffect(() => {
    if (isOpen) {
      setFadeOut(false);
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(closeModal, 500);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, closeModal]);

  if (!isOpen) {
    return <></>;
  }

  return <div className={cx(['toastContainer', fadeOut && 'fadeOut'])}>{content}</div>;
};

export default ToastProvider;
