'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/(afterlogin)/upload/[id]/_component/Spinner';

const GetToken = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeQuery = searchParams.get('code');

  useEffect(() => {
    const getLogin = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_MOCK}/api/get/auth/kakao?code=${codeQuery}`,
        {
          method: 'GET',
          cache: 'no-store',
        },
      );

      if (res.status === 200) {
        router.push('/login');
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
