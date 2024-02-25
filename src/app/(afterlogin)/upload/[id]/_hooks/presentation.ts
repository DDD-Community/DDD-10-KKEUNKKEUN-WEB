import { clientPptApi } from '@/services/client/upload';
import { MockUploadDataType } from '@/types/service';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetPresentationData = (slug: string) => {
  const { data: value } = useSuspenseQuery({
    queryKey: ['upload', slug],
    queryFn: async () => {
      const res = await clientPptApi.getPresentData<MockUploadDataType>(slug);

      return res;
    },
  });
  return value;
};
