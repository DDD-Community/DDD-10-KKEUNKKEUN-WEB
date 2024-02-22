'use client';

import { useState } from 'react';

import { PagesDataType } from '@/types/service';

import InputSection from './InputSection';

const CreatePresentation = () => {
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

  return (
    <InputSection
      presentationData={presentationData}
      setPresentationData={setPresentationData}
      currentPageIndex={currentPageIndex}
      setCurrpentPageIndex={setCurrpentPageIndex}
      initialState={initialState}
      slug="new"
    />
  );
};

export default CreatePresentation;
