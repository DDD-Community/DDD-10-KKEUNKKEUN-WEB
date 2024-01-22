'use client';

import Input from '@/app/_components/_elements/Input';
import { PagesDataType } from '@/types/service';
import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

interface UploadTitleProps {
  title: string | null;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}

const UploadTitle = forwardRef<HTMLInputElement, UploadTitleProps>(
  ({ title, setPresentationData }, ref) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setPresentationData((prev) => {
        return {
          ...prev,
          title: e.target.value,
        };
      });
    };
    return (
      <div>
        <p>발표 이름</p>
        <Input value={title || ''} onChange={onChange} />
      </div>
    );
  },
);
UploadTitle.displayName = 'UploadTitle';
export default UploadTitle;
