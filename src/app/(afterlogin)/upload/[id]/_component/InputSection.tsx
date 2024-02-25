'use client';
import { UploadDataType, ValidtaionType } from '@/types/service';
import styles from './InputSection.module.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import UploadTitle from './UploadTitle';
import UploadScript from './UploadScript';
import UploadMemo from './UploadMemo';
import UploadDeadlineDate from './UploadDeadlineDate';
import UploadTimer from './UploadTimer';
import UploadPpt from './UploadPpt';
import ControlButtons from './ControlButtons';
import { useModalStore, useToastStore } from '@/store/modal';
import SaveToast from '@/app/_components/_modules/SaveToast';
import { useForm } from 'react-hook-form';
import Required from './Required';

import PptImageSvgs from '@/app/(afterlogin)/upload/[id]/_svgs/PptImgSvgs';
import ModalContents from '@/app/_components/_modules/_modal-pre/ModalContents';
import { MAX_LENGTH } from '@/config/const';
import { clientPptApi } from '@/services/client/upload';

interface InputSectionProps {
  presentationData: UploadDataType;
  setPresentationData: Dispatch<SetStateAction<UploadDataType>>;
  currentPageIndex: number;
  setCurrpentPageIndex: Dispatch<SetStateAction<number>>;
  initialState: UploadDataType;
  slug?: number | 'new';
}

interface ErroOnEachPageType {
  memo: boolean;
  script: {
    minLength: boolean;
    maxLength: boolean;
  };
}
const InputSection = ({
  presentationData,
  setPresentationData,
  currentPageIndex,
  setCurrpentPageIndex,
  initialState,
  slug,
}: InputSectionProps) => {
  const [erroOnEachPage, setErroOnEachPage] = useState<ErroOnEachPageType>({
    script: {
      minLength: false,
      maxLength: false,
    },
    memo: false,
  });

  const { openToast } = useToastStore();

  const openToastWithData = () =>
    openToast({
      content: <SaveToast />,
    });

  const { openModal } = useModalStore();

  const openModalWithData = () =>
    openModal({
      content: (
        <ModalContents>
          <ModalContents.ExitUpload />
        </ModalContents>
      ),
      onCancelButton: (
        <ModalContents>
          <ModalContents.ExitUploadCancel />
        </ModalContents>
      ),
      onSubmitButton: (
        <ModalContents>
          <ModalContents.ExitUploadSubmit />
        </ModalContents>
      ),
    });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { defaultValues, isSubmitting, isSubmitted, errors },
  } = useForm<ValidtaionType>();

  useEffect(() => {
    const resetFormData = () => {
      reset({
        title: presentationData.title || '',
        script: presentationData.slides[currentPageIndex].script || '',
        memo: presentationData.slides[currentPageIndex].memo || '',
        deadlineDate: presentationData.deadlineDate,
      });
    };
    resetFormData();
  }, [presentationData, currentPageIndex]);

  const changeCurrentPageIndex = async (nextIndex: number) => {
    if (currentPageIndex === presentationData.slides.length - 1) {
      setCurrpentPageIndex(nextIndex);
    } else {
      // 일반 상태 적용
      // const validateResult = checkValidtaion(presentationData, currentPageIndex);

      // setErroOnEachPage({
      //   memo: validateResult.memo,
      //   script: {
      //     minLength: validateResult.script.minLength,
      //     maxLength: validateResult.script.maxLength,
      //   },
      // });

      // if (
      //   !validateResult.memo &&
      //   !validateResult.script.maxLength &&
      //   !validateResult.script.minLength
      // )
      //   setCurrpentPageIndex(nextIndex);

      // 폼 데이터 사용 (watch값도 사용가능)
      // setErroOnEachPage({
      //   memo: getValues('memo').length > MAX_LENGTH.MEMO,
      //   script: {
      //     minLength: getValues('script').length === 0,
      //     maxLength: getValues('script').length > MAX_LENGTH.SCRIPT,
      //   },
      // });

      if (
        errors.script ||
        errors.memo ||
        getValues('script').length > MAX_LENGTH.SCRIPT ||
        getValues('script').length === 0 ||
        getValues('memo').length > MAX_LENGTH.MEMO
      )
        return;

      setCurrpentPageIndex(nextIndex);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSectionWrapper}>
        <div className={styles.leftSection}>
          <p className={styles.description}>
            발표 자료 추가
            <span style={{ color: '#DE3428', margin: 20, fontWeight: '500' }}>
              <Required />
              필수항목
            </span>
          </p>
          <UploadPpt
            pptInfo={presentationData.slides[currentPageIndex]}
            setPresentationData={setPresentationData}
            currentPageIndex={currentPageIndex}
            changeCurrentPageIndex={changeCurrentPageIndex}
            initialState={initialState}
          />
          <ControlButtons
            presentationData={presentationData}
            setPresentationData={setPresentationData}
            currentPageIndex={currentPageIndex}
            changeCurrentPageIndex={changeCurrentPageIndex}
            getValues={getValues}
            errors={errors}
          />
        </div>
      </div>
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSection}>
          <button className={styles.cancelButton} onClick={openModalWithData}>
            <PptImageSvgs>
              <PptImageSvgs.X />
            </PptImageSvgs>
          </button>
          <form
            onSubmit={handleSubmit(async (data) => {
              // 1. 마지막 더미 페이지 제외
              const shallow = { ...presentationData };
              const shallowSlides = [...presentationData.slides.slice(0, -1)];

              // 2. 현재페이지의 title,script,memo를 getValue로 가져온 뒤 상태에 추가
              shallow.title = data.title;
              shallowSlides[currentPageIndex] = {
                ...shallowSlides[currentPageIndex],
                script: data.script,
                memo: data.memo,
              };
              const result = {
                ...shallow,
                slides: shallowSlides,
              };

              // 3. post , patch
              if (slug === 'new') {
                const postResponse = await clientPptApi.postPresentationUpload(result);
              }
              if (slug !== 'new') {
                const patchResponse = await clientPptApi.patchPresentationData(slug!, result);
              }

              // 3. mutation의 onSuccess로 모달 띄우기
              openToastWithData();
            })}
          >
            <UploadTitle
              title={presentationData.title || ''}
              setValue={setValue}
              register={register}
              errors={errors}
            />
            <UploadScript
              script={presentationData.slides[currentPageIndex].script || ''}
              lastDummyPageIndex={presentationData.slides.length - 1}
              currentPageIndex={currentPageIndex}
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <UploadMemo
              memo={presentationData.slides[currentPageIndex].memo || ''}
              lastDummyPageIndex={presentationData.slides.length - 1}
              currentPageIndex={currentPageIndex}
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <div className={styles.line} />

            <UploadDeadlineDate
              deadlineDate={presentationData.deadlineDate}
              setPresentationData={setPresentationData}
              register={register}
              errors={errors}
              currentPageIndex={currentPageIndex}
              getValues={getValues}
            />
            <UploadTimer
              timeLimit={presentationData.timeLimit}
              alertTime={presentationData.alertTime}
              setPresentationData={setPresentationData}
              currentPageIndex={currentPageIndex}
              getValues={getValues}
            />
            <div className={styles.saveButtons}>
              <button
                type="submit"
                onClick={() => {}}
                className={styles.save}
                disabled={isSubmitting || presentationData.slides.length === 1}
              >
                <p>임시저장</p>
              </button>
              <button
                type="submit"
                onClick={() => {}}
                className={styles.start}
                disabled={isSubmitting || presentationData.slides.length === 1}
              >
                <p>저장하고 발표 연습 시작하기</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
