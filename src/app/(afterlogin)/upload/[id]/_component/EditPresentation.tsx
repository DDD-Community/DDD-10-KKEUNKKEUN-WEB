'use client';

import { useEffect, useState } from 'react';

import { PagesDataType } from '@/types/service';

import { useGetPresentationData } from '../_hooks/presentation';

import InputSection from './InputSection';

interface EditPresentationProps {
  slug: string;
}
const EditPresentation = ({ slug }: EditPresentationProps) => {
  const initialState: PagesDataType = {
    title: null,
    deadlineDate: null,
    timeLimit: {
      hours: null,
      minutes: null,
    },
    alertTime: {
      hours: null,
      minutes: null,
    },
    slides: [{ imageFileId: { dataURL: null, file: null }, script: null, memo: null }],
  };

  const [presentationData, setPresentationData] = useState<PagesDataType>(initialState);
  const [currentPageIndex, setCurrpentPageIndex] = useState(0);

  const value = useGetPresentationData(slug);

  useEffect(() => {
    const initailSetting = async () => {
      setPresentationData(() => {
        const shallow = [...value.slides];
        shallow.push(...initialState.slides);
        return {
          ...value,
          scripts: shallow,
        };
      });
    };

    initailSetting();
  }, [value]);

  console.log(presentationData);

  return (
    // <InputSection
    //   presentationData={presentationData}
    //   setPresentationData={setPresentationData}
    //   currentPageIndex={currentPageIndex}
    //   setCurrpentPageIndex={setCurrpentPageIndex}
    //   slug={slug}
    //   initialState={initialState}
    // />
    <></>
  );
};

export default EditPresentation;
