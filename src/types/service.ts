export interface PagesDataType {
  title: string | null;
  dDay: any; // 임시
  timer: any; // 임시
  scripts: {
    ppt: { dataURL: string | null; file: File | null };
    script: string | null;
    memo: string | null;
  }[];
}

export interface PresentInfoType {
  id: number | null;
  data: PagesDataType;
}
