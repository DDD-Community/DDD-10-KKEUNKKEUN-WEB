'use client';

import {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  forwardRef,
  useState,
} from 'react';

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
    const [currentLength, setCurrentLength] = useState(script);
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

    // if (watchedScriptValue.length > MAX_LENGTH.SCRIPT + 1) {
    //   setValue('script', watchedScriptValue.slice(0, 5001), { shouldValidate: true });
    // }

    // const onStateChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    //   const value = e.target.value;
    //   setValue('script', value, { shouldValidate: true });

    //   setPresentationData((prev) => {
    //     const shallow = [...prev.slides];
    //     shallow[currentPageIndex] = {
    //       ...shallow[currentPageIndex],
    //       script: value,
    //     };

    //     return {
    //       ...prev,
    //       slides: shallow,
    //     };
    //   });
    // };

    console.log(currentLength);
    const onCurrentLengthChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      const value = e.target.value;
      setValue('script', value, { shouldValidate: true });
      if (value.length > MAX_LENGTH.SCRIPT) {
        setValue('script', value.slice(0, 5001), { shouldValidate: true });
      }
      setCurrentLength(value);
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
          {/* {!errors.script &&
            currentLength.length === 0 &&
            erroOnEachPage.script.minLength &&
            lastDummyPageIndex !== currentPageIndex && (
              <small role="alert" style={{ color: '#DE3428' }}>
                {VALIDATION_MESSAGE.SCRIPT.REQUIRED}
              </small>
            )} */}
          {/* 작성 시(+페이지 이동 시) 유효성 검사 - 최대 길이*/}
          {/* {!errors.script &&
            currentLength.length > MAX_LENGTH.SCRIPT &&
            erroOnEachPage.script.maxLength &&
            lastDummyPageIndex !== currentPageIndex && (
              <small role="alert" style={{ color: '#DE3428' }}>
                {VALIDATION_MESSAGE.SCRIPT.REQUIRED}
              </small>
            )} */}
        </div>
        <div
          className={cx(['scriptSection', currentLength.length > MAX_LENGTH.SCRIPT && 'warning'])}
        >
          <textarea
            maxLength={5001} // 이것도 써야 복붙해서 튀어나가는 렉이 없어짐 걸림
            id="script"
            className={styles.scriptTextarea}
            {...register('script', {
              ...registerOptions,
              onChange: onCurrentLengthChange, // 이렇게 하면 error 객체가 잘 잡히는지는 모르겠다. 대신 반드시 setValue도 명시 해주면 괜찮은듯?
            })}
            // onChange={onCurrentLengthChange} // onChange를 덮어쓰는 대신 반드시 setValue도 명시 해줘야 함. 그래도 error객체는 여전히 못 씀
            // onChange={onStateChange}
            // onBlur={onStateChange} // register에도 onBlur가 있지만, 현재 상태값을 변경한다는 추가 동작을 하기 위해 따로 선언
            // onChange={onChange}
            // value={script}

            placeholder="가지고 있는 대본을 이곳에 복사하여 붙여 넣어주세요."
          />
          <div
            className={cx([
              'lengthCount',
              currentLength.length > MAX_LENGTH.SCRIPT && 'lengthWarning',
            ])}
          >
            <p>
              {/* 5002까지 찍히는 버그가 있어서 이렇게 막음 */}
              {currentLength.length > 5001 ? 5001 : currentLength.length}/{MAX_LENGTH.SCRIPT}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

UploadScript.displayName = 'UploadScript';

export default UploadScript;
