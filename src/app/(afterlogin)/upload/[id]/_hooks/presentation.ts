import { clientUserApi } from '@/services/client/user';
import { UploadDataType } from '@/types/service';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetPresentationData = (slug: string) => {
  const { data: value } = useSuspenseQuery({
    queryKey: ['upload', slug],
    queryFn: async () => {
      const res = await clientUserApi.getPresentData<UploadDataType>(slug);

      return res;
    },
  });
  return value;
};
