'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef, useState } from 'react';

import { UploadDataType, ValidtaionType } from '@/types/service';

import styles from './UploadTimer.module.scss';
import InputFormSvgs from '../_svgs/InputFormSvgs';
import {
  FieldErrors,
  RegisterOptions,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface UploadTimerProps {
  timeLimit: UploadDataType['timeLimit'];
  alertTime: UploadDataType['alertTime'];
  setPresentationData: Dispatch<SetStateAction<UploadDataType>>;
  currentPageIndex: number;
  getValues: UseFormGetValues<ValidtaionType>;
  setValue: UseFormSetValue<ValidtaionType>;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
}

const UploadTimer = forwardRef<HTMLInputElement, UploadTimerProps>(
  (
    {
      timeLimit,
      alertTime,
      setPresentationData,
      currentPageIndex,
      getValues,
      setValue,
      register,
      errors,
    },
    ref,
  ) => {
    const validateAlertTime = () => {
      const { timeLimit_hour, timeLimit_minute, alertTime_hour, alertTime_minute } = getValues();

      const finalTime = Number(timeLimit_hour) * 60 + Number(timeLimit_minute);
      const alertTime = Number(alertTime_hour) * 60 + Number(alertTime_minute);

      return alertTime < finalTime || '중간 알림 시간은 총 발표 시간보다 클 수 없습니다.';
    };

    const validateTimeLimit = () => {
      const { timeLimit_hour, timeLimit_minute } = getValues();

      return (
        Number(timeLimit_hour) > 0 || Number(timeLimit_minute) > 0 || '총 발표 시간을 작성해주세요.'
      );
    };
    const registerOptionsForTimeLimit: RegisterOptions = {
      validate: validateTimeLimit,
    };
    const registerOptionsForAlert: RegisterOptions = {
      validate: validateAlertTime,
    };

    const onHourInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      let { name, value } = e.target;
      const convertedHour = Number(value) > 12 ? 12 : Number(value);
      if (name === 'timeLimit_hour') {
        setValue('timeLimit_hour', convertedHour);
      }
      if (name === 'alertTime_hour') {
        setValue('alertTime_hour', convertedHour);
      }
    };

    const onMinuteInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      let { name, value } = e.target;
      const convertedMinute = Number(value) > 59 ? 59 : Number(value);
      if (name === 'timeLimit_minute') {
        setValue('timeLimit_minute', convertedMinute);
      }
      if (name === 'alertTime_minute') {
        setValue('alertTime_minute', convertedMinute);
      }
    };
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      let { name, value } = e.target;
      let changeValue = Number(value);

      setPresentationData((prev) => {
        const shallow = { ...prev };
        const timeLimitShallow = { ...shallow.timeLimit };
        const alertTimeShallow = { ...shallow.alertTime };

        if (name === 'timeLimit_hour') {
          if (changeValue > 12) changeValue = 12;
          timeLimitShallow['hours'] = changeValue;
        }

        if (name === 'timeLimit_minute') {
          if (changeValue > 59) changeValue = 59;
          timeLimitShallow['minutes'] = changeValue;
        }

        if (name === 'alertTime_hour') {
          if (changeValue > 12) changeValue = 12;
          alertTimeShallow['hours'] = changeValue;
        }

        if (name === 'alertTime_minute') {
          if (changeValue > 59) changeValue = 59;
          alertTimeShallow['minutes'] = changeValue;
        }

        shallow.title = getValues('title');
        shallow.timeLimit = timeLimitShallow;
        shallow.alertTime = alertTimeShallow;

        const shallowSlides = [...shallow.slides];
        shallowSlides[currentPageIndex] = {
          ...shallowSlides[currentPageIndex],
          script: getValues('script'),
          memo: getValues('memo'),
        };
        return {
          ...shallow,
          slides: shallowSlides,
        };
      });
    };

    return (
      <div className={styles.container}>
        <p className={styles.description}>발표시간 설정</p>
        <div className={styles.inputWrapper}>
          <label htmlFor="timer" className={styles.label}>
            총 발표 시간
          </label>
          <div className={styles.timerInput}>
            {errors.timeLimit_minute && (
              <p className={styles.alarmWaring}>{errors.timeLimit_minute?.message}</p>
            )}
            <input
              type="number"
              id="timer"
              // onChange={onChange}
              // value={timeLimit.hours ? timeLimit.hours : 0}
              {...register('timeLimit_hour', {
                ...registerOptionsForTimeLimit,
                onChange: onHourInputChange,
              })}
              name="timeLimit_hour"
              placeholder="00"
            />
            시간 &nbsp;
            <input
              type="number"
              id="timer"
              // value={timeLimit.minutes ? timeLimit.minutes : 0}
              {...register('timeLimit_minute', {
                ...registerOptionsForTimeLimit,
                onChange: onMinuteInputChange,
              })}
              // onChange={onChange}
              name="timeLimit_minute"
              placeholder="00"
            />
            분
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="alert" className={styles.label}>
            중간 알림
            <InputFormSvgs>
              <InputFormSvgs.DeadlineDateDescription />
            </InputFormSvgs>
          </label>

          <div className={styles.timerInput}>
            {!errors.timeLimit_minute && errors.alertTime_minute && (
              <p className={styles.alarmWaring}>{errors.alertTime_minute.message}</p>
            )}
            <input
              type="number"
              id="alert"
              {...register('alertTime_hour', {
                ...registerOptionsForAlert,
                onChange: onHourInputChange,
              })}
              // value={alertTime.hours ? alertTime.hours : 0}
              // onChange={onChange}
              name="alertTime_hour"
              placeholder="00"
            />
            시간 &nbsp;
            <input
              type="number"
              id="alert"
              {...register('alertTime_minute', {
                ...registerOptionsForAlert,
                onChange: onMinuteInputChange,
              })}
              // value={alertTime.minutes ? alertTime.minutes : 0}
              // onChange={onChange}
              name="alertTime_minute"
              placeholder="00"
            />
            분
          </div>
        </div>
      </div>
    );
  },
);
UploadTimer.displayName = 'UploadTimer';

export default UploadTimer;
