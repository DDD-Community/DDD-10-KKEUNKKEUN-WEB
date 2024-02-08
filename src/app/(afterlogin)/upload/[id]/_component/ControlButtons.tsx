'use client';

import { Dispatch, MouseEvent, SetStateAction } from 'react';

import Image from 'next/image';

import Button from '@/app/_components/_elements/Button';

import { PagesDataType, ValidtaionType } from '@/types/service';

import styles from './ControlButtons.module.scss';
import classNames from 'classnames/bind';

import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

const cx = classNames.bind(styles);

interface ControlButtonsProps {
  presentationData: PagesDataType;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  currentPageIndex: number;
  slug?: string;
  changeCurrentPageIndex: (nextIndex: number) => void;
}

const ControlButtons = ({
  presentationData,
  setPresentationData,
  currentPageIndex,
  slug,
  changeCurrentPageIndex,
}: ControlButtonsProps) => {
  const addButton = async () => {
    changeCurrentPageIndex(presentationData.scripts.length - 1);
  };

  const remove = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    setPresentationData((prev) => {
      const shallow = [...prev.scripts];
      shallow.splice(index, 1);

      return {
        ...prev,
        scripts: shallow,
      };
    });

    // 삭제 시, 관련 페이지 인덱스 당기기
    if (index <= currentPageIndex) {
      const target = currentPageIndex === 0 ? 0 : currentPageIndex - 1;
      changeCurrentPageIndex(target);
    }
  };

  const handleChange = (result: DropResult) => {
    if (!result.destination) return;
    const to = result.destination?.index;
    const from = result.source.index;

    setPresentationData((prev) => {
      const shallow = [...prev.scripts];
      const moveTarget = shallow.splice(from, 1);
      shallow.splice(to, 0, ...moveTarget);

      return {
        ...prev,
        scripts: shallow,
      };
    });
  };

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId={styles.buttons} direction="horizontal">
          {(provided) => (
            <div className={styles.buttons} {...provided.droppableProps} ref={provided.innerRef}>
              {presentationData.scripts.slice(0, -1).map((item, index) => (
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
                          onClick={() => changeCurrentPageIndex(index)}
                          className={cx('singlePptPage', {
                            selected: currentPageIndex === index,
                          })}
                        >
                          <Image
                            src={item.ppt!.dataURL as string}
                            fill
                            alt="ppt이미지"
                            style={{ objectFit: 'contain' }}
                          />
                          <button onClick={(e) => remove(e, index)} className={styles.closeButton}>
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.66927 1.2735L8.72927 0.333496L5.0026 4.06016L1.27594 0.333496L0.335938 1.2735L4.0626 5.00016L0.335938 8.72683L1.27594 9.66683L5.0026 5.94016L8.72927 9.66683L9.66927 8.72683L5.9426 5.00016L9.66927 1.2735Z"
                                fill="#1E1E1E"
                                fill-opacity="0.5"
                              />
                            </svg>
                          </button>
                          <div className={styles.orderNumber}>{index + 1}</div>
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
              <button
                onClick={addButton}
                disabled={
                  presentationData.scripts[currentPageIndex].ppt.dataURL === null
                  // || presentationData.scripts[currentPageIndex].ppt.file === null
                }
                className={cx('addButton', {
                  selected: currentPageIndex === presentationData.scripts.length - 1,
                })}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.32812 11.9998L10.6293 15.3332L16.6615 8.6665"
                      stroke="white"
                      stroke-width="2"
                    />
                    <circle cx="12" cy="12" r="10" fill="#BCBCBC" />
                    <rect
                      x="11.0938"
                      y="8.36377"
                      width="1.51515"
                      height="6.9697"
                      rx="0.757576"
                      fill="#878787"
                    />
                    <rect
                      x="15.3359"
                      y="11.0908"
                      width="1.51515"
                      height="6.9697"
                      rx="0.757576"
                      transform="rotate(90 15.3359 11.0908)"
                      fill="#878787"
                    />
                  </svg>
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
