'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/(afterlogin)/upload/[id]/_component/Spinner';
import { fetch_ClientAuth } from '@/services/fetch/fetchClient';
import { useUserInfoStore } from '@/store/user';

const GetToken = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeQuery = searchParams.get('code');
  const { setUserInfo } = useUserInfoStore();

  useEffect(() => {
    const getLogin = async () => {
      const nextServerUrl = `${process.env.NEXT_PUBLIC_ROUTE_HANDLER}/api/get/auth/kakao?code=${codeQuery}`;
      const clientUrl = `/api/accounts/login/process?code=${codeQuery}&provider=kakao`;
      const loginResponse = await fetch(`${clientUrl}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (loginResponse.status === 200) {
        const clientUrl = `/api/accounts/me`;
        const userInfoResponse = await fetch_ClientAuth(clientUrl, {
          method: 'GET',
          cache: 'no-store',
          credentials: 'include',
        });

        const userInfo = await userInfoResponse.json();

        setUserInfo({ ...userInfo });

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
