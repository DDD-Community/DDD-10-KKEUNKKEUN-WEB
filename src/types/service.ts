type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

// mock
export interface ValidtaionType {
  title: string;
  script: string;
  memo: string;
  deadlineDate: Value;
}

// Mock
export interface MockUploadDataType {
  id?: number;
  dday?: number;
  createdAt?: Date;
  modifiedAt?: Date;
  title: string | null;
  timeLimit: {
    hours: number | null;
    minutes: number | null;
  };
  alertTime: {
    hours: number | null;
    minutes: number | null;
  };
  deadlineDate: Value;
  slides: {
    id?: number;
    imageFileId: { dataURL: string | null; file: File | null }; // 변경 예정
    script: string | null;
    memo: string | null;
  }[];
}

// service
export interface UploadDataType {
  id?: number;
  dday?: number;
  createdAt?: Date;
  modifiedAt?: Date;
  title: string | null;
  timeLimit: {
    hours: number | null;
    minutes: number | null;
  };
  alertTime: {
    hours: number | null;
    minutes: number | null;
  };
  deadlineDate: Value;
  slides: {
    id?: number;
    imageFileId: number | null;
    imageFilePath: string | null;
    script: string | null;
    memo: string | null;
  }[];
}

/** 유저 정보를 나타내는 객체
 * @property email - 소셜 이메일
 * @property nickName - 소셜 닉네임
 * @property socialProvider - 네이버, 카카오, 구글
 */
export interface UserInfoType {
  email: string;
  nickName: string;
  socialProvider: string;
}
