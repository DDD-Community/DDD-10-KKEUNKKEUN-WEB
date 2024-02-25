import { fetch_ClientAuth } from './fetchClient';

export const clientPptApi = {
  postImageUrl: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch_ClientAuth(`/api/files/upload`, {
      method: 'POST',

      body: formData,
    });

    return response;
  },

  // postPresentationUpload: async (data: UploadDataType) => {

  // },

  // mock
  // TODO: 백엔드 api로 변경 및 삭제 예정
  getPresentData: async <T>(id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_HANDLER}/api/get/list/${id}`, {
      cache: 'no-store',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('something went to wrong');
    }

    const result = await response.json();

    return result as T;
  },
};
