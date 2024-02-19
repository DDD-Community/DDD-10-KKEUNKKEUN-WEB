import { cookies } from 'next/headers';
import { fetch_ServerAuth } from './fetch/fetchServer';
import { UserInfoType } from '@/types/service';

export const userApi = {
  // mock
  // TODO: 실제 백엔드 API로 변경 및 파일 위치 이동 예정
  getPresentData: async <T>(id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_HANDLER}/api/get/list/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('something went to wrong');
    }

    const result = await response.json();

    return result as T;
  },

  /**
   * 서버 컴포넌트에서, 유저 정보를 가져오는 함수
   * @return 유저 정보 객체를 반환합니다
   */
  getUserInfo: async (): Promise<UserInfoType> => {
    const res = await fetch_ServerAuth(`${process.env.NEXT_PUBLIC_BASE_URL_DEV}/api/accounts/me`, {
      method: 'GET',
      headers: { Cookie: cookies().toString() },
      cache: 'no-store',
    });
    return (await res.json()) as UserInfoType;
  },
};
