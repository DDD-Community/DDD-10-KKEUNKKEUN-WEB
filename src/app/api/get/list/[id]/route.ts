// src\app\api\get\list\[id]\route.ts

import { PresentInfoType } from '@/types/service';
import { NextRequest, NextResponse } from 'next/server';

const dummyFile = new File(['dummy content'], 'hello.png', {
  type: 'image/png',
  lastModified: new Date('2023-11-29T10:58:23Z').getTime(),
});

const mockPresentData: PresentInfoType[] = [
  {
    id: 11111,
    data: {
      title: '발표1',
      scripts: [
        {
          ppt: {
            dataURL:
              'data:image/png;base64,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',
            file: dummyFile,
          },
          script: '첫번째 내용내용내용내용내용내용',
          day: '2024.8.3',
          timer: '200',
        },
        {
          ppt: {
            dataURL:
              'data:image/png;base64,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',
            file: dummyFile,
          },
          script: '두번째 내용내용내용내용내용내용',
          day: '2024.8.3',
          timer: '200',
        },
        {
          ppt: {
            dataURL:
              'data:image/png;base64,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',
            file: dummyFile,
          },
          script: '세번째 내용내용내용내용내용내용',
          day: '2024.8.3',
          timer: '200',
        },
      ],
    },
  },
  {
    id: 22222,
    data: {
      title: '발표2',
      scripts: [
        {
          ppt: {
            dataURL:
              'data:image/png;base64,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',
            file: dummyFile,
          },
          script: '첫번째 내용내용내용내용내용내용',
          day: '2024.8.3',
          timer: '200',
        },
        {
          ppt: {
            dataURL:
              'data:image/png;base64,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',
            file: dummyFile,
          },
          script: '두번째 내용내용내용내용내용내용',
          day: '2024.8.3',
          timer: '200',
        },
        {
          ppt: {
            dataURL:
              'data:image/png;base64,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',
            file: dummyFile,
          },
          script: '세번째 내용내용내용내용내용내용',
          day: '2024.8.3',
          timer: '200',
        },
      ],
    },
  },
];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const targetId = params.id;

  try {
    return new Promise((resolve) => {
      const result = mockPresentData.filter((i) => i.id === Number(targetId))[0];
      setTimeout(() => {
        resolve(new NextResponse(JSON.stringify(result), { status: 200 }));
      }, 500);
    });
  } catch (e) {
    return new NextResponse(null, { status: 500 });
  }
}
