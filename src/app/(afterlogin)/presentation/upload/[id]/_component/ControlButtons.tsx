'use client';

import Image from 'next/image';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import Button from '@/app/_components/_elements/Button';
import { PagesDataType } from '@/types/service';
import styles from './ControlButtons.module.scss';
import classNames from 'classnames/bind';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

const cx = classNames.bind(styles);

interface ControlButtonsProps {
  presentationData: PagesDataType;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  currentPageIndex: number;
  setCurrpentPageIndex: Dispatch<SetStateAction<number>>;
  initialState: PagesDataType;
  slug?: string;
}

const ControlButtons = ({
  presentationData,
  setPresentationData,
  currentPageIndex,
  setCurrpentPageIndex,
  slug,
  initialState,
}: ControlButtonsProps) => {
  const addButton = () => {
    // 마지막 페이지(=작성 중이던 페이지)에서 눌렀다면 새로 추가
    if (currentPageIndex === presentationData.scripts.length - 1) {
      setPresentationData((prev) => {
        const shallow = [...prev.scripts];
        shallow.push(initialState.scripts[0]);

        return {
          ...prev,
          scripts: shallow,
        };
      });
      setCurrpentPageIndex((prev) => prev + 1);
    } else {
      // 다른 페이지에 있었다면 마지막 페이지로 다시 복귀
      setCurrpentPageIndex(presentationData.scripts.length - 1);
    }
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
      setCurrpentPageIndex((prev) => (prev === 0 ? 0 : prev - 1));
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
        <Droppable droppableId="cardlists" direction="horizontal">
          {(provided) => (
            <div className="cardlists" {...provided.droppableProps} ref={provided.innerRef}>
              <div className={styles.buttons}>
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
                            onClick={() => setCurrpentPageIndex(index)}
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
                            <Button
                              onClick={(e) => remove(e, index)}
                              _content={'x'}
                              className={styles.closeButton}
                            />
                          </div>
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Button
                  onClick={addButton}
                  disabled={
                    presentationData.scripts[currentPageIndex].ppt.dataURL === null ||
                    presentationData.scripts[currentPageIndex].ppt.file === null
                  }
                  _content={'+'}
                  className={cx('addButton', {
                    selected: currentPageIndex === presentationData.scripts.length - 1,
                  })}
                />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ControlButtons;
