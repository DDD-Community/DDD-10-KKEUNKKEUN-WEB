'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import { PagesDataType, ValidtaionType } from '@/types/service';

import styles from './UploadMemo.module.scss';
import TextArea from '@/app/_components/_elements/TextArea';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { MAX_LENGTH } from '@/config/const';

interface UploadMemoProps {
  memo: string | null;
  currentPageIndex: number;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  register: UseFormRegister<ValidtaionType>;
}

const UploadMemo = forwardRef<HTMLInputElement, UploadMemoProps>(
  ({ memo, currentPageIndex, setPresentationData, register }, ref) => {
    const registerOptions: RegisterOptions = {
      maxLength: {
        value: MAX_LENGTH.MEMO,
        message: `${MAX_LENGTH.MEMO}자 이내로 작성해 주세요.`,
      },
    };

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      setPresentationData((prev) => {
        const shallow = [...prev.scripts];
        shallow[currentPageIndex] = {
          ...shallow[currentPageIndex],
          memo: e.target.value,
        };

        return {
          ...prev,
          scripts: shallow,
        };
      });
    };
    return (
      <div className={styles.container}>
        <p>메모 작성하기</p>
        <p className={styles.description}>발표하면서 계속 확인해야 하는 내용을 메모해보세요. </p>
        <div className={styles.memoSection}>
          <TextArea
            id="memo"
            {...register('memo', registerOptions)}
            size="size_md"
            width="width_full"
            theme="theme_gray"
            value={memo || ''}
            onChange={onChange}
            placeholder="ex. 목소리 크기, 바른 자세 등에 관한 메모를 작성해주세요. "
          />
        </div>
      </div>
    );
  },
);
UploadMemo.displayName = 'UploadMemo';

export default UploadMemo;
