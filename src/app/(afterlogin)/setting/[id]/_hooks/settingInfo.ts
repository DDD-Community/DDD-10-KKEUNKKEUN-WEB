import { clientSettingApi } from '@/services/client/setting';
import { SettingDataType } from '@/types/service';
import { useQuery } from '@tanstack/react-query';

const initialValue: SettingDataType = {
  presentationId: 0,
  title: '',
  timeLimit: {
    hours: null,
    minutes: null,
  },
  alertTime: {
    hours: null,
    minutes: null,
  },
  practiceMode: 'SHOW',
  activateNextSlideModal: false,
  slides: [
    {
      id: 0,
      imageFilePath: '',
      script: '',
      memo: '',
      memorizationSentences: [
        {
          offset: 0,
          end: 0,
          length: 0,
          text: '',
        },
      ],
    },
  ],
  createdAt: new Date(),
  modifiedAt: new Date(),
};

export const useGetPrefetchSettingData = (slug: number) => {
  const response = useQuery({
    queryKey: ['setting', slug],
    queryFn: async () => {
      try {
        const response = await clientSettingApi.getPresentationSettingData(slug);
        const jsonData = await response.json();
        return jsonData as SettingDataType;
      } catch (e) {
        if (e instanceof Error) alert(e.message);
        return initialValue;
      }
    },
  });
  return response;
};
