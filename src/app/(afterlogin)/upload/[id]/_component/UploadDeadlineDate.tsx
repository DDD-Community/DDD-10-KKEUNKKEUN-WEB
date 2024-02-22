'use client';

import { Dispatch, SetStateAction, forwardRef, useState } from 'react';

import { PagesDataType, ValidtaionType, Value } from '@/types/service';

import styles from './UploadDeadlineDate.module.scss';

import CustomCalendar from './CustomCalendar';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import Required from './Required';
import { formatDate } from '../_utils/date';
import { VALIDATION_MESSAGE } from '@/config/const';

interface UploadDeadlineDateProps {
  deadlineDate: PagesDataType['deadlineDate'];
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
}

const UploadDeadlineDate = forwardRef<HTMLInputElement, UploadDeadlineDateProps>(
  ({ deadlineDate, setPresentationData, register, errors }, ref) => {
    const registerOptions: RegisterOptions = {
      required: VALIDATION_MESSAGE.DEADLINEDATE.REQUIRED,
    };

    const [isCalenderOpen, setIsCalenderOpen] = useState(false);

    const today = new Date();

    // 리액트 캘린더 전용 업데이트 함수
    const setDate: Dispatch<SetStateAction<Value>> = (newValue) => {
      setPresentationData((prev) => ({
        ...prev,
        deadlineDate: newValue instanceof Function ? newValue(prev.deadlineDate) : newValue,
      }));
    };

    console.log(deadlineDate?.toLocaleString());
    return (
      <div className={styles.container}>
        <p className={styles.description}>D-day 설정</p>

        <div className={styles.inputWrapper}>
          <label htmlFor="date" className={styles.label}>
            날짜 <Required /> &nbsp;
            {errors.deadlineDate && (
              <small role="alert" style={{ color: '#DE3428', fontWeight: 'bolder' }}>
                {errors.deadlineDate.message as string}
              </small>
            )}
          </label>
          <div style={{ position: 'relative' }}>
            <button
              className={styles.calendarButton}
              onClick={() => setIsCalenderOpen((prev) => !prev)}
              type="button"
            >
              {deadlineDate ? (
                <p className={styles.selected}>{formatDate(deadlineDate)}</p>
              ) : (
                <p className={styles.placeholder}>YYYY.MM.DD</p>
              )}
            </button>
            <input
              hidden
              value={deadlineDate ? deadlineDate?.toLocaleString() : ''}
              {...register('deadlineDate', registerOptions)}
            />

            {isCalenderOpen && (
              <CustomCalendar
                today={today}
                date={deadlineDate}
                setDate={setDate}
                setIsCalenderOpen={setIsCalenderOpen}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);
UploadDeadlineDate.displayName = 'UploadDeadlineDate';

export default UploadDeadlineDate;
