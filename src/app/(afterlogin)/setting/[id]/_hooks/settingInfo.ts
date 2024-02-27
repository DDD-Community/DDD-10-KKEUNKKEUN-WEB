import { clientSettingApi } from '@/services/client/setting';
import { useQuery } from '@tanstack/react-query';

export const useGetPrefetchSettingData = (slug: number) => {
  const response = useQuery({
    queryKey: ['setting', slug],
    queryFn: async () => {
      try {
        const response = await clientSettingApi.getPresentationSettingData(slug);
        return response.json();
      } catch (e) {
        if (e instanceof Error) alert(e.message);
      }
    },
  });
  return response;
};
