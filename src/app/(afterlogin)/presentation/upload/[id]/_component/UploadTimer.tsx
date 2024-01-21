'use client';

import Input from '@/app/_components/_elements/Input';
import { forwardRef } from 'react';

interface UploadTimerProps {}
const UploadTimer = forwardRef<HTMLInputElement, UploadTimerProps>((_, ref) => {
  return (
    <div>
      <p>발표시간 설정</p>
      <Input ref={ref} />
    </div>
  );
});
UploadTimer.displayName = 'UploadTimer';

export default UploadTimer;
