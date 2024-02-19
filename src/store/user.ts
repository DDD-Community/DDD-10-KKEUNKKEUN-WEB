import { UserInfoType } from '@/types/service';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  userInfo: UserInfoType;
  setUserInfo: (userInfo: UserInfoType) => void;
  deleteUserInfo: (userInfo: UserInfoType) => void;
}

const defaultState: UserInfoType = { isAuth: false, email: '', nickName: '', socialProvider: '' };

export const useUserInfoStore = create(
  persist<UserStore>(
    (set) => ({
      userInfo: { ...defaultState },
      setUserInfo: (userInfo: UserInfoType) => {
        set((state) => ({
          ...state,
          userInfo: { ...userInfo },
        }));
      },
      deleteUserInfo: () => {
        set((state) => ({
          ...state,
          userInfo: { ...defaultState },
        }));
      },
    }),
    {
      name: 'userInfo',
    },
  ),
);
