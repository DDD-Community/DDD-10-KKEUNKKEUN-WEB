'use client';

import Checkbox from '@/app/_components/_elements/Checkbox';
import { useState } from 'react';

export default function Page() {
  const [isAvailable, setIsAvailable] = useState(false);
  const handleOnChange = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <div>
      <Checkbox _label="가능여부" _isChecked={isAvailable} _onChange={handleOnChange}></Checkbox>
    </div>
  );
}
