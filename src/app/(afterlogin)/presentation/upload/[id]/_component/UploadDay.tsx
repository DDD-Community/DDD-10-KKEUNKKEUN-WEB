'use client';

import Input from '@/app/_components/_elements/Input';
import { forwardRef } from 'react';

interface UploadDayProps {}

const UploadDay = forwardRef<HTMLInputElement, UploadDayProps>((_, ref) => {
  return (
    <div>
      <p>D-day 설정</p>
      <Input ref={ref} />
    </div>
  );
});
UploadDay.displayName = 'UploadDay';

export default UploadDay;
