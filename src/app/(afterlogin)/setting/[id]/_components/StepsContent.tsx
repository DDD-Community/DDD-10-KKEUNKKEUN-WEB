'use client';

import { Dispatch, SetStateAction } from 'react';
import DragSection from './DragSection';
import SelectCardSection from './SelectCardSection';
import styles from './StepsContent.module.scss';
import { ContentType } from './SettingProcess';
import SelectSentenceSection from './SelectSentenceSection';
import { SettingDataType, SlidesSettingType } from '@/types/service';

interface StepsContentProps {
  totalInfo: SettingDataType;
  settingInfo: SlidesSettingType;
  currentStep: number;
  onChangePracticeMode: (practiceMode: SlidesSettingType['practiceMode']) => void;
  onChangeSlide: (
    index: number,
    memorizationSentences: {
      offset: SlidesSettingType['slides'][0]['memorizationSentences'][0]['offset'];
      length: SlidesSettingType['slides'][0]['memorizationSentences'][0]['length'];
    }[],
  ) => void;
  setSelectedDevice: Dispatch<SetStateAction<'both' | 'desktop'>>;
  selectedDevice: 'both' | 'desktop';
}
const StepsContent = ({
  totalInfo,
  currentStep,
  onChangePracticeMode,
  onChangeSlide,
  settingInfo,
  setSelectedDevice,
  selectedDevice,
}: StepsContentProps) => {
  return (
    <div className={styles.container}>
      {currentStep === 1 ? (
        <SelectSentenceSection
          totalInfo={totalInfo}
          settingInfo={settingInfo}
          currentStep={currentStep}
          onChangePracticeMode={onChangePracticeMode}
          onChangeSlide={onChangeSlide}
        />
      ) : (
        <SelectCardSection
          totalInfo={totalInfo}
          settingInfo={settingInfo}
          currentStep={currentStep}
          onChangePracticeMode={onChangePracticeMode}
          onChangeSlide={onChangeSlide}
          setSelectedDevice={setSelectedDevice}
          selectedDevice={selectedDevice}
        />
      )}
    </div>
  );
};

export default StepsContent;
