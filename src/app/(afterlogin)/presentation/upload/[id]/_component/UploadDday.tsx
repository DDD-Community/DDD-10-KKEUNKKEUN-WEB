'use client';

import Input from '@/app/_components/_elements/Input';
import { PagesDataType } from '@/types/service';
import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

interface UploadDdayProps {
  dDay: any;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}

const UploadDday = forwardRef<HTMLInputElement, UploadDdayProps>(
  ({ dDay, setPresentationData }, ref) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setPresentationData((prev) => {
        return {
          ...prev,
          dDay: e.target.value,
        };
      });
    };
    return (
      <div>
        <p>D-day 설정</p>
        <Input value={dDay || ''} onChange={onChange} />
      </div>
    );
  },
);
UploadDday.displayName = 'UploadDay';

export default UploadDday;
