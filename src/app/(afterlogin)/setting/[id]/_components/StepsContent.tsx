'use client';

import { Dispatch, SetStateAction } from 'react';
import DragSection from './DragSection';
import SelectSection from './SelectSection';
import styles from './StepsContent.module.scss';
import { ContentType } from './SettingProcess';

interface StepsContentProps {
  current: number;
  selectedValue: ContentType;
  setSelectedValue: Dispatch<SetStateAction<ContentType>>;
}
const StepsContent = ({ current, setSelectedValue, selectedValue }: StepsContentProps) => {
  return (
    <div className={styles.container}>
      {current === 1 ? (
        <DragSection />
      ) : (
        <SelectSection
          current={current}
          setSelectedValue={setSelectedValue}
          selectedValue={selectedValue}
        />
      )}
    </div>
  );
};

export default StepsContent;
