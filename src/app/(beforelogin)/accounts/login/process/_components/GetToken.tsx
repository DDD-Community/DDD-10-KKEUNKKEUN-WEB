'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/(afterlogin)/upload/[id]/_component/Spinner';
import { fetchWithAuth } from '@/services/fetch';
import { useUserInfoStore } from '@/store/user';

const GetToken = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeQuery = searchParams.get('code');
  const { setUserInfo } = useUserInfoStore();

  useEffect(() => {
    const getLogin = async () => {
      const nextServerUrl = `${process.env.NEXT_PUBLIC_BASE_URL_MOCK}/api/get/auth/kakao?code=${codeQuery}`;
      const clientUrl = `/api/auth/login/process?code=${codeQuery}&provider=kakao`;
      const loginResponse = await fetch(`${clientUrl}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (loginResponse.status === 200) {
        const clientUrl = `/api/auth/me`;
        const userInfoResponse = await fetchWithAuth(clientUrl, {
          method: 'GET',
          cache: 'no-store',
          credentials: 'include',
        });

        const userInfo = await userInfoResponse.json();

        setUserInfo({ isAuth: true, ...userInfo });

        if (userInfoResponse.status === 200) router.push('/login');
      }
    };
    if (codeQuery) {
      getLogin();
    }
  }, [router, codeQuery]);

  return (
    <>
      <Spinner />
    </>
  );
};

export default GetToken;
