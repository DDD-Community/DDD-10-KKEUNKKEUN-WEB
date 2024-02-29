import { clientHomeApi } from '@/services/client/home';
import { useMutation } from '@tanstack/react-query';

export const useDeletePresentation = (id: number) => {
  const response = useMutation({
    mutationKey: ['delete', id],
    mutationFn: async () => {
      const response = await clientHomeApi.deletePresentationList({ presentationIds: [id] });
    },
    onSuccess: () => {},
    onError: (error) => {
      alert(error.message);
    },
  });
  return response;
};
