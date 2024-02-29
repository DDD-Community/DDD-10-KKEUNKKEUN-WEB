'use client';

import useToggle from '@/app/_hooks/useToggle';
import styles from './page.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import useRecorder from '../_hooks/useRecorder';
import Alert from '@/app/_components/_modules/_modal/Alert';
import SpeechBubble from '@/app/_components/_modules/SpeechBubble';
import { useQuery } from '@tanstack/react-query';
import { PracticeDetail } from '@/types/service';
import { PracticeService } from '@/services/client/practice';
import Image from 'next/image';

export default function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  // #region state
  const [slideIdx, setSlideIdx] = useState(0);
  const modal = useToggle();
  const bubble = useToggle();
  const recorder = useRecorder();
  // #endregion

  //
  const cx = classNames.bind(styles);

  // #region query
  const { isLoading, data } = useQuery<PracticeDetail>({
    queryKey: ['practice', id],
    queryFn: () => PracticeService.getPracticeDetail(Number(id)),
  });

  /** 슬라이드 페이징 문자열 */
  const slidePaging = `${slideIdx}/${data?.slides.length ?? 0}`;

  /** 마지막 슬라이드 여부 */
  const isLastSlide = data?.slides.length === (slideIdx > 0 ? slideIdx - 1 : 0);
  // #endregion

  // useEffect(() => {
  //   modal.onOpen();
  //   recorder.getMedia();
  //   recorder.processPermission();
  // }, []);

  // #region function

  // #endregion

  // #region event-handler
  const handleModalAction = () => {
    // recorder.startRecording();
    // modal.onClose();
    // bubble.onOpen();
  };
  // #endregion

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <section className={styles.presentation__box}>
          <article className={styles.presentation}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL_CDN}/${data?.slides[0].imageFilePath}`}
              alt={`slide-${0}`}
              width={900}
              height={510}
              style={{ objectFit: 'contain', borderRadius: '16px' }}
            />
          </article>
          <section className={styles.helper__box}>
            <article className={styles.helper}>
              <h4 className={styles.helper__title}>
                다음 슬라이드
                <span className={cx(['helper__subtitle', 'helper__subtitle--next'])}>
                  {slidePaging}
                </span>
              </h4>
              <div className={styles.helper__item}>
                {isLastSlide ? (
                  <div>last ... </div>
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_CDN}/${data?.slides[0].imageFilePath}`}
                    alt={`slide-${0}`}
                    width={370}
                    height={200}
                    style={{ objectFit: 'contain', borderRadius: '16px' }}
                  />
                )}
              </div>
            </article>
            <article className={styles.helper}>
              <h4 className={styles.helper__title}>
                메모하기
                <span className={cx(['helper__subtitle', 'helper__subtitle--memo'])}>
                  발표 연습 중 메모를 입력하면 녹음이 일시정지돼요.
                </span>
              </h4>
              <textarea
                className={styles.helper__item}
                placeholder="ex. 발표문 수정 사항, 목소리 크기 등에 대한 메모를 작성해 주세요."
                defaultValue={data?.slides[0].memo ?? ''}
              />
            </article>
          </section>
        </section>
        <article className={styles.script__box}>
          <p className={styles.script}>{data?.slides[0].script ?? ''}</p>
        </article>
      </div>
      <Alert
        context={modal}
        title="마이크 권한을 허용해주세요."
        message="권한을 허용해야 발표 연습을 하실 수 있어요!"
        actionText="연습 시작하기"
        isDisabled={!recorder.isPermitted}
        onActionClick={handleModalAction}
      />
      <div className={styles.bubble}>
        <SpeechBubble
          context={bubble}
          message="녹음 버튼을 누르면 일시정지할 수 있어요."
          hasCloseBtn
        />
      </div>
    </div>
  );
}
