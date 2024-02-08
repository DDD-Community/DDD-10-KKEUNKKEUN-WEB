'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef, useState } from 'react';

import { PagesDataType, ValidtaionType } from '@/types/service';

import styles from './UploadScript.module.scss';

import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

import classNames from 'classnames/bind';
import Required from './Required';
import { MAX_LENGTH } from '@/config/const';

interface UploadScriptProps {
  script: string;
  currentPageIndex: number;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
}

const cx = classNames.bind(styles);

const UploadScript = forwardRef<HTMLInputElement, UploadScriptProps>(
  ({ script, currentPageIndex, setPresentationData, register, errors }, ref) => {
    const registerOptions: RegisterOptions = {
      required: '대본은 필수 입력입니다.',
      maxLength: {
        value: MAX_LENGTH.SCRIPT,
        message: `${MAX_LENGTH.SCRIPT}자 이내로 작성해 주세요.`,
      },
    };

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      let scriptValue = e.target.value;
      if (scriptValue.length >= MAX_LENGTH.SCRIPT + 1) {
        scriptValue = scriptValue.slice(0, MAX_LENGTH.SCRIPT + 1);
      }
      setPresentationData((prev) => {
        const shallow = [...prev.scripts];
        shallow[currentPageIndex] = {
          ...shallow[currentPageIndex],
          script: scriptValue,
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
          <label htmlFor="script">
            {currentPageIndex + 1} 페이지 대본 붙여넣기 <Required />
          </label>

          {errors.script && (
            <small role="alert" style={{ color: '#DE3428' }}>
              {errors.script.message as string}
            </small>
          )}
        </div>
        <div className={cx(['scriptSection', script.length > MAX_LENGTH.SCRIPT && 'warning'])}>
          <textarea
            id="script"
            className={styles.scriptTextarea}
            value={script || ''}
            {...register('script', registerOptions)}
            onChange={onChange}
            placeholder="가지고 있는 대본을 이곳에 복사하여 붙여 넣어주세요."
          />
          <div
            className={cx(['lengthCount', script?.length > MAX_LENGTH.SCRIPT && 'lengthWarning'])}
          >
            <p>
              {script?.length}/{MAX_LENGTH.SCRIPT}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

UploadScript.displayName = 'UploadScript';

export default UploadScript;
