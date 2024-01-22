'use client';

import Input from '@/app/_components/_elements/Input';
import { PagesDataType } from '@/types/service';
import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

interface UploadScriptProps {
  script: string | null;
  currentPageIndex: number;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}
const UploadScript = forwardRef<HTMLInputElement, UploadScriptProps>(
  ({ script, currentPageIndex, setPresentationData }, ref) => {
    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      setPresentationData((prev) => {
        const shallow = [...prev.scripts];
        shallow[currentPageIndex] = {
          ...shallow[currentPageIndex],
          script: e.target.value,
        };

        return {
          ...prev,
          scripts: shallow,
        };
      });
    };
    return (
      <div>
        <p>{currentPageIndex + 1} 페이지 대본 붙여넣기</p>
        <textarea value={script || ''} onChange={onChange}></textarea>
      </div>
    );
  },
);

UploadScript.displayName = 'UploadScript';

export default UploadScript;
