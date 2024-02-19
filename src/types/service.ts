type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

// mock
export interface ValidtaionType {
  title: string;
  script: string;
  memo: string;
  dDayDate: Value;
}

export interface PagesDataType {
  title: string | null;
  dDay: {
    date: Value;
  };
  time: {
    timer: number | null;
    alramTime: number | null;
  };
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

// service
export interface UserInfoType {
  isAuth: boolean;
  email: string;
  nickName: string;
  socialProvider: string;
}
