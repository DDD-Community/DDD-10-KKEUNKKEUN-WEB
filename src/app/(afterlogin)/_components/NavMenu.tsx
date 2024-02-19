'use client';

import { MouseEventHandler, useState } from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames';
import { fetchWithAuth } from '@/services/fetch';

type ClickedList = 'presentationList' | 'report';

const isClickedList = (name: string): name is ClickedList => {
  return name === 'presentationList' || name === 'report';
};

const NavMenu = () => {
  const [clicked, setClicked] = useState<ClickedList>('presentationList');

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { name } = e.currentTarget;

    if (isClickedList(name)) setClicked(name);
  };

  const tmpReIssueTest = async () => {
    const nextServerUrl = `${process.env.NEXT_PUBLIC_BASE_URL_MOCK}/api/get/auth/slient`;
    const clientUrl = `/api/auth/reissue`;
    await fetch(clientUrl, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
    });
  };

  const tmpMyInfoTest = async () => {
    const clientUrl = `/api/auth/me`;
    const res = await fetchWithAuth(clientUrl, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
    });
  };

  return (
    <>
      <button
        className={classNames([clicked === 'presentationList' && styles.clicked])}
        name="presentationList"
        onClick={onClick}
      >
        발표 목록
      </button>
      <button
        className={classNames([clicked === 'report' && styles.clicked])}
        name="report"
        onClick={onClick}
      >
        리포트
      </button>
      <button onClick={tmpReIssueTest}>토큰 재발급</button>
      <button onClick={tmpMyInfoTest}>내 정보</button>
    </>
  );
};

export default NavMenu;
