'use client';

import { Dispatch, SetStateAction } from 'react';
import Card from './Card';
import styles from './SelectCardSection.module.scss';

import { SettingDataType, SlidesSettingType } from '@/types/service';
interface SelectCardSectionProps {
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
  setSelectedDevice: Dispatch<SetStateAction<'DESKTOP' | 'BOTH'>>;
  selectedDevice: 'DESKTOP' | 'BOTH';
}
const SelectCardSection = ({
  totalInfo,
  currentStep,
  onChangePracticeMode,
  onChangeSlide,
  settingInfo,
  setSelectedDevice,
  selectedDevice,
}: SelectCardSectionProps) => {
  // const setMode = (newValue: ContentType['mode']) => {
  //   setSelectedValue((prev) => ({
  //     ...prev,
  //     mode: newValue,
  //   }));
  // };

  // const setDevice = (newValue: ContentType['device']) => {
  //   setSelectedValue((prev) => ({
  //     ...prev,
  //     device: newValue,
  //   }));
  // };

  const firstStepCardInfo = [
    {
      image: 'image',
      title: '모든 문장 보기',
      content: [
        '발표문 암기를 못 했을 때 추천드려요!',
        '이 모드는 발표 속도에 대한 피드백만 받을 수 있어요.',
      ],
    },
    {
      image: 'image',
      title: '외울 문장 가리기',
      content: [
        '대본 암기를 잘 했는지 확인할 때 추천드려요!',
        '이 모드는 모든 피드백을 받으실 수 있어요.',
      ],
    },
  ];

  const thirdStepCardInfo = [
    {
      image: 'image',
      title: '데스크탑',
      content: ['PPT 슬라이드, 타이머, 그리고 발표문을', ' 테스크탑에서 보실 수 있어요.'],
    },
    {
      image: 'image',
      title: '데스트탑과 모바일',
      content: [
        '모바일에서는 타이머와 발표문, 그리고 리모콘 기능을 제공해요.',
        '데스크탑에서는 PPT 슬라이드를 보실 수 있어요.',
      ],
    },
  ];

  return (
    <div className={styles.container}>
      {currentStep === 0 && (
        <>
          <Card
            title={firstStepCardInfo[0].title}
            content={firstStepCardInfo[0].content}
            setMode={() => onChangePracticeMode('SHOW')}
            selected={settingInfo.practiceMode === 'SHOW'}
          />
          <Card
            title={firstStepCardInfo[1].title}
            content={firstStepCardInfo[1].content}
            setMode={() => onChangePracticeMode('HIDE')}
            selected={settingInfo.practiceMode === 'HIDE'}
          />
        </>
      )}
      {currentStep === 2 && (
        <>
          <Card
            title={thirdStepCardInfo[0].title}
            content={thirdStepCardInfo[0].content}
            setDevice={() => setSelectedDevice('DESKTOP')}
            selected={selectedDevice === 'DESKTOP'}
          />
          <Card
            title={thirdStepCardInfo[1].title}
            content={thirdStepCardInfo[1].content}
            setDevice={() => setSelectedDevice('BOTH')}
            selected={selectedDevice === 'BOTH'}
          />
        </>
      )}
    </div>
  );
};

export default SelectCardSection;
