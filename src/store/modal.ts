import { ReactNode } from 'react';
import { create } from 'zustand';

type ModalData = {
  children?: ReactNode;
  onCancel?: () => unknown;
  onSubmit?: () => unknown;
};

interface ModalStore {
  isOpen: boolean;
  openModal: (modalData: ModalData) => unknown;
  closeModal: () => unknown;
  modalData: ModalData;
}

// confirm용 모달
export const useConfirmModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalData: {} as ModalData,

  openModal: (modalData: ModalData) => {
    set((state) => ({ isOpen: true, modalData: { ...modalData } }));
  },

  closeModal: () => {
    set((state) => ({ isOpen: false, modalData: {} }));
  },
}));

// alert용 모달
export const useAlertModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalData: {} as ModalData,

  openModal: (modalData: ModalData) => {
    set((state) => ({ isOpen: true, modalData: { ...modalData } }));
  },

  closeModal: () => {
    set((state) => ({ isOpen: false, modalData: {} }));
  },
}));
