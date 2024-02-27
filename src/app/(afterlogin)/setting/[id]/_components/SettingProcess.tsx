'use client';

import { useState } from 'react';
import styles from './SettingProcess.module.scss';
import StepsBar from './StepsBar';
import StepsDescription from './StepsDescription';
import StepsContent from './StepsContent';
import { SettingDataType, SlidesSettingType } from '@/types/service';
import { useGetPrefetchSettingData } from '../_hooks/settingInfo';
import { usePathname } from 'next/navigation';
import { useSettingInfo } from '../_hooks/draft';

type ProcessStepType = 0 | 1 | 2;

export interface ContentType {
  mode: 'all' | 'memorise' | null;
  sentence: unknown | null;
  device: 'desktop' | 'both' | null;
}

const initialValue: SettingDataType = {
  presentationId: 0,
  title: '',
  timeLimit: {
    hours: null,
    minutes: null,
  },
  alertTime: {
    hours: null,
    minutes: null,
  },
  practiceMode: 'SHOW',
  activateNextSlideModal: false,
  slides: [
    {
      id: 0,
      imageFilePath: '',
      script: '',
      memo: '',
      memorizationSentences: [
        {
          offset: 0,
          end: 0,
          length: 0,
          text: '',
        },
      ],
    },
  ],
  createdAt: new Date(),
  modifiedAt: new Date(),
};
const SettingProcess = () => {
  const pathName = usePathname();
  const slug = Number(pathName.split('/').pop());

  const { data: totalInfo } = useGetPrefetchSettingData(slug);
  const settingValues: SlidesSettingType = totalInfo
    ? {
        practiceMode: totalInfo.practiceMode,
        slides: totalInfo.slides.map((slide) => {
          return {
            id: slide.id,
            memorizationSentences: slide.memorizationSentences.map((sentence) => {
              return { offset: sentence.offset, length: sentence.length };
            }),
          };
        }),
      }
    : initialValue;

  const { value, onChangePracticeMode, onChangeSlide, onReset } = useSettingInfo(settingValues);
  // console.log(value);
  // console.log(totalInfo);

  const [currentStep, setCurrentStep] = useState<ProcessStepType>(0);

  const onNextStep = () => {
    if (currentStep === 2) return;
    // if (currentStep === 0 && value.practiceMode === 'SHOW') setCurrentStep(2);
    else setCurrentStep((prev) => (prev + 1) as ProcessStepType);
  };

  return (
    <div className={styles.container}>
      {totalInfo && value && (
        <>
          <StepsBar currentStep={currentStep} />
          <StepsDescription currentStep={currentStep} />
          <StepsContent
            totalInfo={totalInfo}
            value={value}
            currentStep={currentStep}
            onChangePracticeMode={onChangePracticeMode}
            onChangeSlide={onChangeSlide}
          />

          <button className={styles.confirmButton} onClick={onNextStep}>
            확인
          </button>
        </>
      )}
    </div>
  );
};

export default SettingProcess;
