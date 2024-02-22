'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import Input from '@/app/_components/_elements/Input';

import { PagesDataType } from '@/types/service';

import styles from './UploadTimer.module.scss';
import InputFormSvgs from '../_svgs/InputFormSvgs';

interface UploadTimerProps {
  timeLimit: PagesDataType['timeLimit'];
  alertTime: PagesDataType['alertTime'];
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}

const UploadTimer = forwardRef<HTMLInputElement, UploadTimerProps>(
  ({ timeLimit, alertTime, setPresentationData }, ref) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setPresentationData((prev) => {
        let { name, value } = e.target;
        let changeValue = Number(value);

        const timeLimitShallow = { ...prev.timeLimit };
        const alertTimeShallow = { ...prev.alertTime };

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

        return {
          ...prev,
          timeLimit: timeLimitShallow,
          alertTime: alertTimeShallow,
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
            <input
              type="number"
              id="timer"
              value={timeLimit.hours ? timeLimit.hours : ''}
              onChange={onChange}
              name="timeLimit_hour"
              placeholder="00"
            />
            시간 &nbsp;
            <input
              type="number"
              id="timer"
              value={timeLimit.minutes ? timeLimit.minutes : ''}
              onChange={onChange}
              name="timeLimit_minute"
              placeholder="00"
            />
            분
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="alarm" className={styles.label}>
            중간 알림
            <InputFormSvgs>
              <InputFormSvgs.DeadlineDateDescription />
            </InputFormSvgs>
          </label>

          <div className={styles.timerInput}>
            <input
              type="number"
              id="alarm"
              value={alertTime.hours ? alertTime.hours : ''}
              onChange={onChange}
              name="alertTime_hour"
              placeholder="00"
            />
            시간 &nbsp;
            <input
              type="number"
              id="alarm"
              value={alertTime.minutes ? alertTime.minutes : ''}
              onChange={onChange}
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
