import { clientPptApi } from '@/services/client/upload';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

// TODO: useSuspenseQuery 사용 버그 처리
export const useGetPresentationData = (slug: number) => {
  const { data: value } = useQuery({
    queryKey: ['upload', slug],
    queryFn: async () => {
      const res = await clientPptApi.getPresentationData(slug);

      if (res.ok) return await res.json();
    },
  });

  return value;
};
