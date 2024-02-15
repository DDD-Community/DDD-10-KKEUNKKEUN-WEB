'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GetToken = () => {
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
      console.log(res);

      if (res.ok) {
        const jsonResult = await res.json();
        console.log(jsonResult.data);
      }
    };
    if (codeQuery) {
      getLogin();
    }
  }, []);

  return <div>{searchParams.get('code')}</div>;
};

export default GetToken;
