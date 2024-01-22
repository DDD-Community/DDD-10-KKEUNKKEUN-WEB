'use client';

import { useEffect, useRef, useState } from 'react';
import UploadPpt from './UploadPpt';
import UploadTitle from './UploadTitle';
import UploadScript from './UploadScript';
import UploadTimer from './UploadTimer';
import ControlButtons from './ControlButtons';
import { usePathname } from 'next/navigation';
import { userApi } from '@/services/user';
import { PagesDataType, PresentInfoType } from '@/types/service';
import styles from './CreatePresentation.module.scss';
import UploadDday from './UploadDday';

const CreatePresentation = () => {
  const pathName = usePathname();
  const slug = pathName.split('/').pop();

  const initialState: PagesDataType = {
    title: null,
    dDay: null,
    timer: null,
    scripts: [{ ppt: { dataURL: null, file: null }, script: null }],
  };

  const [presentationData, setPresentationData] = useState<PagesDataType>(initialState);
  const [currentPageIndex, setCurrpentPageIndex] = useState(0);

  useEffect(() => {
    const initailSetting = async () => {
      if (slug !== 'new') {
        const res = await userApi.getPresentData<PresentInfoType>(slug as string);
        const { data: originData, id: originId } = res;
        setPresentationData(() => {
          const shallow = [...originData.scripts];
          shallow.push(...initialState.scripts);
          return {
            ...originData,
            scripts: shallow,
          };
        });
      }
    };

    initailSetting();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <UploadPpt
          pptInfo={presentationData.scripts[currentPageIndex].ppt}
          setPresentationData={setPresentationData}
          currentPageIndex={currentPageIndex}
          dataLength={presentationData.scripts.length - 1}
        />
        <ControlButtons
          presentationData={presentationData}
          setPresentationData={setPresentationData}
          currentPageIndex={currentPageIndex}
          setCurrpentPageIndex={setCurrpentPageIndex}
          slug={slug as string}
          initialState={initialState}
        />
      </div>
      <div className={styles.right}>
        <UploadTitle
          title={presentationData.title || ''}
          setPresentationData={setPresentationData}
        />
        <UploadScript
          script={presentationData.scripts[currentPageIndex].script || ''}
          setPresentationData={setPresentationData}
          currentPageIndex={currentPageIndex}
        />
        <UploadDday dDay={presentationData.dDay || ''} setPresentationData={setPresentationData} />
        <UploadTimer
          timer={presentationData.timer || ''}
          setPresentationData={setPresentationData}
        />
      </div>
    </div>
  );
};

export default CreatePresentation;
