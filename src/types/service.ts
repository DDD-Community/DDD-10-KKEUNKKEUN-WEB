export interface PagesDataType {
  title: string | null;
  scripts: {
    ppt: { dataURL: string; file: File } | null;
    script: string | null;
    day: any;
    timer: any;
  }[];
}

export interface PresentInfoType {
  id: number | null;
  data: PagesDataType;
}
