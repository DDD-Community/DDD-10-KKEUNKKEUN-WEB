'use client';

import Input from '@/app/_components/_elements/Input';
import { PagesDataType } from '@/types/service';
import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

interface UploadTimerProps {
  timer: any;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}
const UploadTimer = forwardRef<HTMLInputElement, UploadTimerProps>(
  ({ timer, setPresentationData }, ref) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setPresentationData((prev) => {
        return {
          ...prev,
          timer: e.target.value,
        };
      });
    };
    return (
      <div>
        <p>발표시간 설정</p>
        <Input value={timer || ''} onChange={onChange} />
      </div>
    );
  },
);
UploadTimer.displayName = 'UploadTimer';

export default UploadTimer;
