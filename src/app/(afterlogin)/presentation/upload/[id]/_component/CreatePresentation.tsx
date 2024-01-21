'use client';

import { useEffect, useRef, useState } from 'react';
import UploadPpt from './UploadPpt';
import UploadTitle from './UploadTitle';
import UploadScript from './UploadScript';
import UploadDay from './UploadDay';
import UploadTimer from './UploadTimer';
import ControlButtons from './ControlButtons';
import { usePathname } from 'next/navigation';
import { userApi } from '@/services/user';
import { PagesDataType, PresentInfoType } from '@/types/service';
import styles from './CreatePresentation.module.scss';

const CreatePresentation = () => {
  const pathName = usePathname();
  const slug = pathName.split('/').pop();

  const [currentPresentData, setCurrentPresentData] = useState<PagesDataType>({
    title: '',
    scripts: [],
  });
  const [currentPageIndex, setCurrpentPageIndex] = useState(0);

  const [pptInfo, setPptInfo] = useState<{ dataURL: string; file: File } | null>(null);
  const inputRefs = new Map<
    'title' | 'script' | 'day' | 'timer',
    React.RefObject<HTMLInputElement>
  >();
  inputRefs.set('title', useRef<HTMLInputElement>(null));
  inputRefs.set('script', useRef<HTMLInputElement>(null));
  inputRefs.set('day', useRef<HTMLInputElement>(null));
  inputRefs.set('timer', useRef<HTMLInputElement>(null));

  useEffect(() => {
    const initailSetting = async () => {
      if (slug !== 'new') {
        const res = await userApi.getPresentData<PresentInfoType>(slug as string);
        setCurrentPresentData(res.data);
      }
      setCurrpentPageIndex(0);
    };

    initailSetting();
  }, []);

  // 페이지 이동 시, 해당 페이지의 기존 내용 보여주기
  useEffect(() => {
    const showExistValue = () => {
      // 페이지들의 데이터가 없을 경우
      if (!currentPresentData.scripts.length) {
        // 현재 입력창 초기화
        setPptInfo(null);
        inputRefs.forEach((refValue) => {
          if (refValue.current) {
            refValue.current.value = '';
          }
        });
      }

      if (
        currentPresentData.scripts.length &&
        currentPageIndex < currentPresentData.scripts.length
      ) {
        // ref 입력
        inputRefs.forEach((refValue, refKey) => {
          if (refValue.current && refKey !== 'title') {
            refValue.current.value = currentPresentData.scripts[currentPageIndex][refKey];
          }
        });
        const titleRef = inputRefs.get('title');
        if (titleRef && titleRef.current && currentPresentData.title !== null) {
          titleRef.current.value = currentPresentData.title;
        }
        // ppt 이미지 입력
        setPptInfo(currentPresentData.scripts[currentPageIndex].ppt);
      }
    };
    showExistValue();
  }, [currentPageIndex, currentPresentData]);

  return (
    <div>
      <div>
        <UploadPpt pptInfo={pptInfo} setPptInfo={setPptInfo} />
        <ControlButtons
          currentPresentData={currentPresentData}
          setCurrentPresentData={setCurrentPresentData}
          currentPageIndex={currentPageIndex}
          setCurrpentPageIndex={setCurrpentPageIndex}
          inputRefs={inputRefs}
          pptInfo={pptInfo}
          setPptInfo={setPptInfo}
          slug={slug as string}
        />
      </div>
      <div>
        <UploadTitle ref={inputRefs.get('title')} />
        <UploadScript ref={inputRefs.get('script')} currentPageIndex={currentPageIndex} />
        <UploadDay ref={inputRefs.get('day')} />
        <UploadTimer ref={inputRefs.get('timer')} />
      </div>
    </div>
  );
};

export default CreatePresentation;
