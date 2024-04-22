'use client';

import FlyoutMenu from '@/app/_components/_modules/FlyoutMenu';
import styles from './CardItem.module.scss';

import useToggle from '@/app/_hooks/useToggle';
import Confirm from '@/app/_components/_modules/_modal/Confirm';
import { PresentationListType } from '@/types/service';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DeleteIcon from '../home/_components/_svgs/DeleteIcon';
import ModifyIcon from '../home/_components/_svgs/ModifyIcon';
import MenuIcon from '../home/_components/_svgs/MenuIcon';
import { useDeletePresentation } from '../home/_hooks/presentationList';
import CardInfo from './CardInfo';
import HomeButton from './_Home/PracticeButton';
import PracticeButton from './_Home/PracticeButton';

interface Props {
  presentation: PresentationListType['page']['content'][0];
  usage: 'home' | 'feedback';
}

const CardItem = ({ presentation, usage }: Props) => {
  const router = useRouter();
  const flyout = useToggle();
  const modal = useToggle();

  const { mutate } = useDeletePresentation(presentation.id);

  const handleModify = () => {
    router.push(`/upload/${presentation.id}`);
    flyout.onClose();
  };

  const handleDelete = () => {
    flyout.onClose();
    modal.onOpen();
  };

  const deleteItem = () => {
    mutate();
  };

  return (
    <>
      <article className={styles.container}>
        <div className={styles.thumbnail}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL_CDN}/${presentation.thumbnailPath}`}
            alt={`${presentation.id} 썸네일`}
            width={440}
            height={250}
            style={{ borderRadius: '16px' }}
          />
          <div className={styles.menu__box}>
            <FlyoutMenu context={flyout}>
              <FlyoutMenu.ToggleButton>
                <MenuIcon />
              </FlyoutMenu.ToggleButton>
              <FlyoutMenu.MenuList>
                <FlyoutMenu.MenuItem>
                  <button className={styles.menu} onClick={handleModify}>
                    <ModifyIcon />
                    <span>수정</span>
                  </button>
                </FlyoutMenu.MenuItem>
                <FlyoutMenu.MenuItem>
                  <button className={styles.menu} onClick={handleDelete}>
                    <DeleteIcon />
                    <span>삭제</span>
                  </button>
                </FlyoutMenu.MenuItem>
              </FlyoutMenu.MenuList>
            </FlyoutMenu>
          </div>
        </div>
        <div className={styles.info__box}>
          <div className={styles.info}>
            <CardInfo presentation={presentation} usage={usage} />
          </div>
          <div className={styles.action__box}>
            {usage === 'home' ? (
              <PracticeButton onClick={() => router.push(`/setting/${presentation.id}`)} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </article>

      <Confirm
        context={modal}
        title="발표 연습 파일을 삭제하시겠어요?"
        message="삭제한 파일은 복원할 수 없습니다."
        okayText="삭제하기"
        cancelText="취소"
        onOkayClick={() => {
          deleteItem();
        }}
      />
    </>
  );
};

export default CardItem;
