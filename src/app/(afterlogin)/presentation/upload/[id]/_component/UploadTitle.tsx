'use client';

import Input from '@/app/_components/_elements/Input';
import { forwardRef } from 'react';

interface UploadTitleProps {}

const UploadTitle = forwardRef<HTMLInputElement, UploadTitleProps>((_, ref) => {
  return (
    <div>
      <p>발표 이름</p>
      <Input ref={ref} />
    </div>
  );
});
UploadTitle.displayName = 'UploadTitle';
export default UploadTitle;
