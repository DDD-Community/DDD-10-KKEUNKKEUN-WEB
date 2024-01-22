'use client';

import Image from 'next/image';
import { Dispatch, Fragment, MouseEvent, RefObject, SetStateAction } from 'react';
import { getCurrentRefsData } from '../_utils/getCurrentPageData';
import Button from '@/app/_components/_elements/Button';
import { PagesDataType } from '@/types/service';
import styles from './ControlButtons.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ControlButtonsProps {
  currentPresentData: PagesDataType;
  setCurrentPresentData: Dispatch<SetStateAction<PagesDataType>>;
  currentPageIndex: number;
  setCurrpentPageIndex: Dispatch<SetStateAction<number>>;
  inputRefs: Map<string, RefObject<HTMLInputElement>>;
  pptInfo: { dataURL: string; file: File } | null;
  setPptInfo: Dispatch<SetStateAction<{ dataURL: string; file: File } | null>>;
  slug: string;
}

const ControlButtons = ({
  currentPresentData,
  setCurrentPresentData,
  currentPageIndex,
  setCurrpentPageIndex,
  pptInfo,
  setPptInfo,
  slug,
  inputRefs,
}: ControlButtonsProps) => {
  const addButton = () => {
    // 마지막 페이지에서(=작성 중이던 페이지) 눌렀다면 새로 추가
    if (currentPageIndex === currentPresentData.scripts.length) {
      const refs = getCurrentRefsData(inputRefs);

      setCurrentPresentData((prev) => {
        const newScripts: PagesDataType['scripts'][0] = {
          ppt: {
            dataURL: pptInfo!.dataURL,
            file: pptInfo!.file,
          },
          script: refs.script,
          day: refs.day,
          timer: refs.timer,
        };

        const shallow = [...prev.scripts];
        shallow.push(newScripts);

        return {
          ...prev,
          title: refs.title, // 타이틀 변경
          scripts: shallow, // 새 데이터 추가
        };
      });
      setCurrpentPageIndex((prev) => prev + 1);
    } else {
      // 다른 페이지에 있었다면 다시 복귀
      setCurrpentPageIndex(currentPresentData.scripts.length);

      // + 버튼으로 새 페이지로 이동했을 때 역시 기존 페이지에서 작성하던 내용 저장
      const refs = getCurrentRefsData(inputRefs);

      setCurrentPresentData((prev) => {
        const shallow = [...prev.scripts];

        shallow[currentPageIndex] = {
          ...shallow[currentPageIndex],
          ppt: {
            ...shallow[currentPageIndex].ppt,
            dataURL: pptInfo!.dataURL,
            file: pptInfo!.file,
          },
          script: refs.script,
          day: refs.day,
          timer: refs.timer,
        };

        return {
          ...prev,
          title: refs.title,
          scripts: shallow,
        };
      });
    }

    // 현재 입력창 초기화
    setPptInfo(null);
    inputRefs.forEach((refValue, refKey) => {
      if (refValue.current && refKey !== 'title') {
        refValue.current.value = '';
      }
    });
  };

  const moveOtherPage = (index: number) => {
    // 현재 페이지 내용 저장 후 페이지 이동
    if (currentPageIndex !== currentPresentData.scripts.length) {
      const refs = getCurrentRefsData(inputRefs);

      setCurrentPresentData((prev) => {
        const shallow = [...prev.scripts];

        shallow[currentPageIndex] = {
          ...shallow[currentPageIndex],
          ppt: {
            ...shallow[currentPageIndex].ppt,
            dataURL: pptInfo!.dataURL,
            file: pptInfo!.file,
          },
          script: refs.script,
          day: refs.day,
          timer: refs.timer,
        };

        return {
          ...prev,
          title: refs.title,
          scripts: shallow,
        };
      });
    }

    setCurrpentPageIndex(index);
  };

  const remove = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    setCurrentPresentData((prev) => {
      const shallow = [...prev.scripts];
      shallow.splice(index, 1);

      return {
        ...prev,
        scripts: shallow,
      };
    });

    // 삭제 시, 관련 페이지 인덱스 당기기
    if (index <= currentPageIndex) {
      setCurrpentPageIndex((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };

  return (
    <div className={styles.container}>
      {currentPresentData.scripts.map((i, index) => {
        return (
          <div
            key={index}
            onClick={() => moveOtherPage(index)}
            className={cx('singlePptPage', { selected: currentPageIndex === index })}
          >
            <Image
              src={i.ppt!.dataURL}
              layout="fill"
              objectFit="contain"
              alt="ppt이미지"
              className={styles.boxButton}
            />
            <Button
              onClick={(e) => remove(e, index)}
              _content={'x'}
              className={styles.closeButton}
            />
          </div>
        );
      })}
      <Button
        onClick={addButton}
        disabled={pptInfo === null}
        _content={'+'}
        className={cx('addButton', {
          selected: currentPageIndex === currentPresentData.scripts.length,
        })}
      />
    </div>
  );
};

export default ControlButtons;
