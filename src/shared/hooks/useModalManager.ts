// src/shared/hooks/useModalManager.ts
import { useState } from 'react';

export type ModalType = 'cart' | 'language' | 'login' | 'register' | null;

export const useModalManager = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setActiveModal(prev => (prev === type ? null : type)); // toggle
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const isModalOpen = (type: ModalType) => activeModal === type;

  return {
    activeModal,
    openModal,
    closeModal,
    isModalOpen,
  };
};
