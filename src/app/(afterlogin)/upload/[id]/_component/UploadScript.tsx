'use client';

import { ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction, forwardRef } from 'react';

import { PagesDataType, ValidtaionType } from '@/types/service';

import styles from './UploadScript.module.scss';

import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import classNames from 'classnames/bind';
import Required from './Required';
import { MAX_LENGTH, VALIDATION_MESSAGE } from '@/config/const';

interface UploadScriptProps {
  script: string;
  currentPageIndex: number;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
  lastDummyPageIndex: number;
  setValue: UseFormSetValue<ValidtaionType>;
  watchedScriptValue: string;
  erroOnEachPage: {
    memo: boolean;
    script: {
      minLength: boolean;
      maxLength: boolean;
    };
  };
}

const cx = classNames.bind(styles);

const UploadScript = forwardRef<HTMLInputElement, UploadScriptProps>(
  (
    {
      script,
      currentPageIndex,
      setPresentationData,
      register,
      errors,
      lastDummyPageIndex,
      erroOnEachPage,
      setValue,
      watchedScriptValue,
    },
    ref,
  ) => {
    const registerOptions: RegisterOptions =
      currentPageIndex === lastDummyPageIndex
        ? {}
        : {
            required: VALIDATION_MESSAGE.SCRIPT.REQUIRED,
            maxLength: {
              value: MAX_LENGTH.SCRIPT,
              message: VALIDATION_MESSAGE.SCRIPT.MAX_LENGTH,
            },
          };

    // const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    //   let scriptValue = e.target.value;
    //   if (scriptValue.length >= MAX_LENGTH.SCRIPT + 1) {
    //     scriptValue = scriptValue.slice(0, MAX_LENGTH.SCRIPT + 1);
    //   }

    //   setPresentationData((prev) => {
    //     const shallow = [...prev.slides];
    //     shallow[currentPageIndex] = {
    //       ...shallow[currentPageIndex],
    //       script: scriptValue,
    //     };

    //     return {
    //       ...prev,
    //       slides: shallow,
    //     };
    //   });
    // };

    if (watchedScriptValue.length > MAX_LENGTH.SCRIPT + 1) {
      setValue('script', watchedScriptValue.slice(0, 5001), { shouldValidate: true });
    }

    const onStateChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      const value = e.target.value;
      setValue('script', value, { shouldValidate: true });

      setPresentationData((prev) => {
        const shallow = [...prev.slides];
        shallow[currentPageIndex] = {
          ...shallow[currentPageIndex],
          script: value,
        };

        return {
          ...prev,
          slides: shallow,
        };
      });
    };
    return (
      <div className={styles.container}>
        <div className={styles.description}>
          <label htmlFor="script">
            {currentPageIndex + 1} 페이지 대본 붙여넣기 <Required />
          </label>

          {/* 제출용 훅 폼 유효성 검사 */}
          {errors.script && (
            <small role="alert" style={{ color: '#DE3428' }}>
              {errors.script.message as string}
            </small>
          )}

          {/* 작성 시(+페이지 이동 시) 유효성 검사 - 최소 길이*/}
          {!errors.script &&
            erroOnEachPage.script.minLength &&
            watchedScriptValue.length === 0 &&
            lastDummyPageIndex !== currentPageIndex && (
              <small role="alert" style={{ color: '#DE3428' }}>
                {VALIDATION_MESSAGE.SCRIPT.REQUIRED}
              </small>
            )}
          {/* 작성 시(+페이지 이동 시) 유효성 검사 - 최대 길이*/}
          {!errors.script &&
            erroOnEachPage.script.maxLength &&
            watchedScriptValue.length > MAX_LENGTH.SCRIPT &&
            lastDummyPageIndex !== currentPageIndex && (
              <small role="alert" style={{ color: '#DE3428' }}>
                {VALIDATION_MESSAGE.SCRIPT.REQUIRED}
              </small>
            )}
        </div>
        <div
          className={cx([
            'scriptSection',
            watchedScriptValue.length > MAX_LENGTH.SCRIPT && 'warning',
          ])}
        >
          <textarea
            id="script"
            className={styles.scriptTextarea}
            {...register('script', registerOptions)}
            // onChange={onStateChange}
            // onBlur={onStateChange} // register에도 onBlur가 있지만, 현재 상태값을 변경한다는 추가 동작을 하기 위해 따로 선언
            // onChange={onChange}
            // value={script}

            placeholder="가지고 있는 대본을 이곳에 복사하여 붙여 넣어주세요."
          />
          <div
            className={cx([
              'lengthCount',
              watchedScriptValue.length > MAX_LENGTH.SCRIPT && 'lengthWarning',
            ])}
          >
            <p>
              {watchedScriptValue.length}/{MAX_LENGTH.SCRIPT}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

UploadScript.displayName = 'UploadScript';

export default UploadScript;
