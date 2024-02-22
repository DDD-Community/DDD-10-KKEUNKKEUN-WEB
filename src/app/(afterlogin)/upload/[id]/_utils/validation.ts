import { MAX_LENGTH } from '@/config/const';
import { PagesDataType } from '@/types/service';

export const checkValidtaion = (presentationData: PagesDataType, currentPageIndex: number) => {
  const memoLength = presentationData.slides[currentPageIndex].memo?.length || 0;
  const scriptLength = presentationData.slides[currentPageIndex].script?.length || 0;

  const result = {
    memo: memoLength > MAX_LENGTH.MEMO,
    script: {
      minLength: scriptLength === 0,
      maxLength: scriptLength > MAX_LENGTH.SCRIPT,
    },
  };
  return result;
};
