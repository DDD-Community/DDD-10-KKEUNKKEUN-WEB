import { ReactNode } from 'react';
import { create } from 'zustand';

/** 모달창에 사용되는 데이터 타입*/
export type ModalData = {
  /** 모달창 내부에 사용되는 컨텐츠 */
  content?: ReactNode;

  /** 취소버튼 클릭 시 트리거되는 콜백 */
  onCancel?: () => unknown;

  /** submit버튼 클릭 시 트리거되는 콜백 */
  onSubmit?: () => unknown;
};

/** 모달 스토어 타입 */
interface ModalStore {
  /** 현재 모달 렌더링 유무 플래그 */
  isOpen: boolean;

  /** 인자로 받은 모달 데이터를 기반으로 모달을 생성하는 함수 */
  openModal: (modalData: ModalData) => unknown;

  /** 모달을 닫는 함수(DOM에서 제거) */
  closeModal: () => unknown;

  /** 모달창에 사용되는 데이터 */
  modalData: ModalData;
}

/** confirm과 alert에 사용되는 스토어 */
export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalData: {} as ModalData,

  openModal: (modalData: ModalData) => {
    set((state) => ({ isOpen: true, modalData: { ...modalData } }));
  },

  closeModal: () => {
    set((state) => ({ isOpen: false, modalData: {} }));
  },
}));

/** toast에 사용되는 스토어 */
export const useToastStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalData: {} as ModalData,

  openModal: (modalData: ModalData) => {
    set((state) => ({ isOpen: true, modalData: { ...modalData } }));
  },

  closeModal: () => {
    set((state) => ({ isOpen: false, modalData: {} }));
  },
}));
