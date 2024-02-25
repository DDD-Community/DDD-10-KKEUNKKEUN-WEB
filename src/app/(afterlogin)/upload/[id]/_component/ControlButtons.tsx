'use client';

import { Dispatch, MouseEvent, SetStateAction } from 'react';

import Image from 'next/image';

import { PagesDataType, ValidtaionType } from '@/types/service';

import styles from './ControlButtons.module.scss';
import classNames from 'classnames/bind';

import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import PptImageSvgs from '@/app/(afterlogin)/upload/[id]/_svgs/PptImgSvgs';
import { FieldErrors, UseFormGetValues } from 'react-hook-form';

const cx = classNames.bind(styles);

interface ControlButtonsProps {
  presentationData: PagesDataType;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  currentPageIndex: number;
  slug?: string;
  changeCurrentPageIndex: (nextIndex: number) => void;
  getValues: UseFormGetValues<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
}

const ControlButtons = ({
  presentationData,
  setPresentationData,
  currentPageIndex,
  slug,
  changeCurrentPageIndex,
  getValues,
  errors,
}: ControlButtonsProps) => {
  const remove = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    setPresentationData((prev) => {
      const shallow = [...prev.slides];
      shallow.splice(index, 1);

      return {
        ...prev,
        slides: shallow,
      };
    });

    // 삭제 시, 관련 페이지 인덱스 당기기
    if (index <= currentPageIndex) {
      const target = currentPageIndex === 0 ? 0 : currentPageIndex - 1;
      changeCurrentPageIndex(target);
    }
  };

  const handleChange = (result: DropResult) => {
    if (!result.destination || errors.script || errors.memo) return;
    const to = result.destination?.index;
    const from = result.source.index;

    setPresentationData((prev) => {
      const shallow = [...prev.slides];
      const moveTarget = shallow.splice(from, 1);
      shallow.splice(to, 0, ...moveTarget);

      return {
        ...prev,
        slides: shallow,
      };
    });
  };

  const eachPptButtonClick = (index: number) => {
    changeCurrentPageIndex(index);

    if (errors.script || errors.memo) return;
    setPresentationData((prev) => {
      const shallow = [...prev.slides];
      shallow[currentPageIndex] = {
        ...shallow[currentPageIndex],
        script: getValues('script'),
        memo: getValues('memo'),
      };
      return {
        ...prev,
        slides: shallow,
      };
    });
  };

  const onStart = () => {
    if (errors.script || errors.memo) return;
    setPresentationData((prev) => {
      const shallow = [...prev.slides];
      shallow[currentPageIndex] = {
        ...shallow[currentPageIndex],
        script: getValues('script'),
        memo: getValues('memo'),
      };
      return {
        ...prev,
        slides: shallow,
      };
    });
  };

  return (
    <div className={styles.container}>
      <DragDropContext onDragStart={onStart} onDragEnd={handleChange}>
        <Droppable droppableId={styles.buttons} direction="horizontal">
          {(provided) => (
            <div className={styles.buttons} {...provided.droppableProps} ref={provided.innerRef}>
              {presentationData.slides.slice(0, -1).map((item, index) => (
                <Draggable draggableId={`test-${index}`} index={index} key={`test-${index}`}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div
                          key={index}
                          // onClick={() => changeCurrentPageIndex(index)}
                          onClick={() => eachPptButtonClick(index)}
                          className={cx('singlePptPage', {
                            selected: currentPageIndex === index,
                          })}
                        >
                          <Image
                            src={item.imageFileId!.dataURL as string}
                            fill
                            alt="ppt이미지"
                            style={{ objectFit: 'contain', borderRadius: '8px' }}
                          />
                          <button onClick={(e) => remove(e, index)} className={styles.closeButton}>
                            <PptImageSvgs>
                              <PptImageSvgs.X />
                            </PptImageSvgs>
                          </button>
                          <div
                            className={cx([
                              'orderNumber',
                              currentPageIndex === index && 'selected',
                            ])}
                          >
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
              <button
                // onClick={addButton}
                onClick={() => eachPptButtonClick(presentationData.slides.length - 1)}
                disabled={
                  presentationData.slides[currentPageIndex].imageFileId.dataURL === null
                  // || presentationData.slides[currentPageIndex].imageFileId.file === null
                }
                className={cx('addButton', {
                  selected: currentPageIndex === presentationData.slides.length - 1,
                })}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                >
                  <PptImageSvgs>
                    <PptImageSvgs.AddNewPpt />
                  </PptImageSvgs>
                </div>
              </button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ControlButtons;
