'use client';

import Image from 'next/image';
import { ChangeEventHandler, Dispatch, SetStateAction, useRef } from 'react';
import styles from './UploadPpt.module.scss';
import { PagesDataType, ValidtaionType } from '@/types/service';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface UploadPptProps {
  pptInfo: PagesDataType['scripts'][0]['ppt'];
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  currentPageIndex: number;
  initialState: PagesDataType;
  changeCurrentPageIndex: (nextIndex: number) => void;
}
const UploadPpt = ({
  pptInfo,
  setPresentationData,
  currentPageIndex,
  changeCurrentPageIndex,
  initialState,
}: UploadPptProps) => {
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
        setPresentationData((prev) => {
          const shallow = [...prev.scripts];
          shallow[currentPageIndex] = {
            ...shallow[currentPageIndex],
            ppt: {
              dataURL: reader.result as string, // 미리보기용
              file, // 서버용
            },
          };

          // 추가
          if (currentPageIndex === prev.scripts.length - 1) {
            shallow.push(initialState.scripts[0]);
          }

          return {
            ...prev,
            scripts: shallow,
          };
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <input
        id="ppt"
        type="file"
        accept="image/png, image/jpeg"
        onChange={onUpload}
        name="imageFiles"
        hidden
        ref={imageRef}
      />
      <div className={styles.pptUpdateSection}>
        {
          //  pptInfo.file === null ||
          pptInfo.dataURL === null ? (
            <div className={styles.newPptSection}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7 4H21V15H18V7H7V4ZM6 7V3H22V16H18V20H2V7H6ZM17 16V19H3V8H6V16H17ZM17 15H7V8H17V15Z"
                  fill="black"
                />
              </svg>

              <button className={styles.updateButton} onClick={onClickButton}>
                PPT 이미지 등록하기
              </button>
            </div>
          ) : (
            <div className={styles.pptImageSection}>
              <div className={styles.hoverSection}>
                <Image
                  src={pptInfo.dataURL as string}
                  alt="ppt image"
                  fill
                  style={{ objectFit: 'contain' }}
                  className={styles.pptImage}
                />
                <button className={styles.changePptImageButton} onClick={onClickButton}>
                  이미지 변경
                </button>
              </div>
              {currentPageIndex !== 0 && (
                <button
                  className={styles.goLeft}
                  disabled={currentPageIndex === 0}
                  onClick={() => changeCurrentPageIndex(currentPageIndex - 1)}
                >
                  <svg
                    width="14"
                    height="22"
                    viewBox="0 0 14 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.034 2.07689L11.1162 0.169922L0.460938 10.836L11.127 21.5021L13.034 19.5951L4.27487 10.836L13.034 2.07689Z"
                      fill="#4B4B4B"
                    />
                  </svg>
                </button>
              )}

              <button
                className={styles.goRight}
                onClick={() => changeCurrentPageIndex(currentPageIndex + 1)}
              >
                <svg
                  width="13"
                  height="22"
                  viewBox="0 0 13 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.382812 19.5951L2.28978 21.5021L12.9558 10.836L2.28978 0.169922L0.382812 2.07689L9.14192 10.836L0.382812 19.5951Z"
                    fill="#1E1E1E"
                  />
                </svg>
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default UploadPpt;
