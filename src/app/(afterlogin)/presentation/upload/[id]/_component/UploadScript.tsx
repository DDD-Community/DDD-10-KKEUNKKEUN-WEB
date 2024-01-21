'use client';

import Input from '@/app/_components/_elements/Input';
import { forwardRef } from 'react';

interface UploadScriptProps {
  currentPageIndex: number;
}
const UploadScript = forwardRef<HTMLInputElement, UploadScriptProps>(
  ({ currentPageIndex }, ref) => {
    return (
      <div>
        <p>{currentPageIndex + 1} 페이지 대본 붙여넣기</p>
        <Input ref={ref} />
      </div>
    );
  },
);

UploadScript.displayName = 'UploadScript';

export default UploadScript;
