'use client';

import { PagesDataType } from '@/types/service';
import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

interface UploadMemoProps {
  memo: string | null;
  currentPageIndex: number;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}

const UploadMemo = forwardRef<HTMLInputElement, UploadMemoProps>(
  ({ memo, currentPageIndex, setPresentationData }, ref) => {
    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      setPresentationData((prev) => {
        const shallow = [...prev.scripts];
        shallow[currentPageIndex] = {
          ...shallow[currentPageIndex],
          memo: e.target.value,
        };

        return {
          ...prev,
          scripts: shallow,
        };
      });
    };
    return (
      <div>
        <p>메모 작성하기</p>
        <textarea value={memo || ''} onChange={onChange}></textarea>
      </div>
    );
  },
);
UploadMemo.displayName = 'UploadMemo';

export default UploadMemo;
