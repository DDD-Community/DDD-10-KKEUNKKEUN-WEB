'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import { PagesDataType, ValidtaionType } from '@/types/service';

import styles from './UploadMemo.module.scss';
import classNames from 'classnames/bind';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { MAX_LENGTH, VALIDATION_MESSAGE } from '@/config/const';

interface UploadMemoProps {
  memo: string;
  currentPageIndex: number;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
  lastDummyPageIndex: number;
  erroOnEachPage: {
    memo: boolean;
    script: {
      minLength: boolean;
      maxLength: boolean;
    };
  };
}

const cx = classNames.bind(styles);

const UploadMemo = forwardRef<HTMLInputElement, UploadMemoProps>(
  (
    {
      memo,
      currentPageIndex,
      setPresentationData,
      register,
      errors,
      erroOnEachPage,
      lastDummyPageIndex,
    },
    ref,
  ) => {
    const registerOptions: RegisterOptions =
      currentPageIndex === lastDummyPageIndex
        ? {}
        : {
            maxLength: {
              value: MAX_LENGTH.MEMO,
              message: `${MAX_LENGTH.MEMO}자 이내로 작성해 주세요.`,
            },
          };

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      let memoValue = e.target.value;
      if (memoValue.length >= MAX_LENGTH.MEMO + 1) {
        memoValue = memoValue.slice(0, MAX_LENGTH.MEMO + 1);
      }
      setPresentationData((prev) => {
        const shallow = [...prev.scripts];
        shallow[currentPageIndex] = {
          ...shallow[currentPageIndex],
          memo: memoValue,
        };

        return {
          ...prev,
          scripts: shallow,
        };
      });
    };
    return (
      <div className={styles.container}>
        <div className={styles.description}>
          <label htmlFor="memo"> 메모 작성하기 </label>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8.0026" cy="8.88639" r="6.66667" fill="#9C9C9C" />
            <path
              d="M8.51782 5.14941L8.44946 10.2275H7.62914L7.56078 5.14941H8.51782ZM8.0393 12.2783C7.6975 12.2783 7.40453 11.9951 7.4143 11.6436C7.40453 11.3018 7.6975 11.0186 8.0393 11.0186C8.3811 11.0186 8.6643 11.3018 8.6643 11.6436C8.6643 11.9951 8.3811 12.2783 8.0393 12.2783Z"
              fill="white"
            />
          </svg>

          {errors.memo && (
            <small role="alert" style={{ color: '#DE3428' }}>
              {errors.memo.message as string}
            </small>
          )}
          {/* 페이지 이동 유효성 검사 - 최대 길이*/}
          {!errors.memo && memo.length > MAX_LENGTH.MEMO && erroOnEachPage.memo && (
            <small role="alert" style={{ color: '#DE3428' }}>
              {VALIDATION_MESSAGE.MEMO.MAX_LENGTH}
            </small>
          )}
        </div>
        <p className={styles.guide}>발표하면서 계속 확인해야 하는 내용을 메모해보세요. </p>
        <div className={cx(['memoSection', memo.length > MAX_LENGTH.MEMO && 'warning'])}>
          <textarea
            id="memo"
            className={styles.memoTextarea}
            value={memo}
            {...register('memo', registerOptions)}
            onChange={onChange}
            placeholder="ex. 목소리 크기, 바른 자세 등에 관한 메모를 작성해주세요."
          />
          <div className={cx(['lengthCount', memo?.length > MAX_LENGTH.MEMO && 'lengthWarning'])}>
            <p>
              {memo?.length}/{MAX_LENGTH.MEMO}
            </p>
          </div>
        </div>
      </div>
    );
  },
);
UploadMemo.displayName = 'UploadMemo';

export default UploadMemo;
