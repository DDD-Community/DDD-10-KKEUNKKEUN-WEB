import { SERVER_BASE_URL } from '@/config/path';
import { fetch_ServerAuth } from './fetchServer';

export const serverHomeApi = {
  getPresentationList: async ({ pageParam }: { pageParam?: number }) => {
    console.log(SERVER_BASE_URL);
    const response = await fetch_ServerAuth(
      `${SERVER_BASE_URL}/api/presentations?page=${pageParam}&size=6`,
      { method: 'GET', cache: 'no-store' },
    );

    if (response.ok) return response;
    throw new Error('데이터를 불러오는 도중 문제가 발생했습니다');
  },

  getLatestPresentation: async () => {
    console.log(SERVER_BASE_URL);
    const response = await fetch_ServerAuth(`${SERVER_BASE_URL}/api/presentations/latest`, {
      method: 'GET',
      cache: 'no-store',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    });

    if (response.ok) return response;
    throw new Error('데이터를 불러오는 도중 문제가 발생했습니다');
  },
};
