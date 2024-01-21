'use client';

import Button from '@/app/_components/_elements/Button';
import Image from 'next/image';
import { ChangeEventHandler, Dispatch, SetStateAction, useRef } from 'react';
import styles from './UploadPpt.module.scss';

interface UploadPptProps {
  pptInfo: { dataURL: string; file: File } | null;
  setPptInfo: Dispatch<SetStateAction<{ dataURL: string; file: File } | null>>;
}
const UploadPpt = ({ pptInfo, setPptInfo }: UploadPptProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (imageRef.current?.files) {
      const file = imageRef.current.files[0];

      const reader = new FileReader();

      reader.onloadend = () => {
        setPptInfo({
          dataURL: reader.result as string, // 미리보기용
          file, // 서버용
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <p>발표 자료 추가</p>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={onUpload}
        name="imageFiles"
        hidden
        ref={imageRef}
      />
      <div>
        {pptInfo === null ? (
          <div>
            <div>LOGO</div>
            <Button onClick={onClickButton} _content={<p>PPT 이미지 등록하기</p>} />
          </div>
        ) : (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src={pptInfo.dataURL} alt="ppt image" layout="fill" objectFit="contain" />
            <button>이미지 변경</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPpt;
