import { useEffect, useState } from 'react';

export type ModalType = 'cart' | 'login' | 'register' | 'language' | 'profile';

interface ModalConfig {
  closeOnEscape: boolean;
  closeOnOverlayClick: boolean;
  lockScroll: boolean;
}

const defaultModalConfig: ModalConfig = {
  closeOnEscape: false,
  closeOnOverlayClick: false,
  lockScroll: false,
};

const modalConfigMap: Record<ModalType, ModalConfig> = {
  cart:     { closeOnEscape: false, closeOnOverlayClick: true,  lockScroll: true },
  login:    { closeOnEscape: true,  closeOnOverlayClick: true,  lockScroll: true },
  register: { closeOnEscape: true,  closeOnOverlayClick: false, lockScroll: true },
  language: { closeOnEscape: true,  closeOnOverlayClick: true,  lockScroll: true },
  profile:  { closeOnEscape: true,  closeOnOverlayClick: true,  lockScroll: false },
};

export const useModalManager = () => {
  const [openModals, setOpenModals] = useState<ModalType[]>([]);

  const activeModal = openModals.length > 0 ? openModals[0] : null;
  const modalConfig = activeModal ? modalConfigMap[activeModal] : defaultModalConfig;

  const openModal = (modal: ModalType) => {
    setOpenModals([modal]); // Ensures only one modal is open
  };

  const closeModal = (modal?: ModalType) => {
    if (modal) {
      setOpenModals((prev) => prev.filter((m) => m !== modal));
    } else {
      setOpenModals([]);
    }
  };

  const toggleModal = (modal: ModalType) => {
    setOpenModals((prev) => (prev.includes(modal) ? [] : [modal]));
  };

  const isModalOpen = (modal: ModalType) => openModals.includes(modal);

  // 🔒 Scroll Lock
  useEffect(() => {
    document.body.style.overflow = modalConfig.lockScroll ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalConfig.lockScroll]);

  // ⎋ Escape Key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalConfig.closeOnEscape && activeModal) {
        closeModal(activeModal);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeModal, modalConfig.closeOnEscape]);

  return {
    openModal,
    closeModal,
    toggleModal,
    isModalOpen,
    activeModal,
    modalConfig,
  };
};
