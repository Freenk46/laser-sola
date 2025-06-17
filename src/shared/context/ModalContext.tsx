import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type ModalType = 'login' | 'register' | 'cart' | 'language' | 'profile';

interface ModalConfig {
  closeOnEscape?: boolean;
  lockScroll?: boolean;
  closeOnOverlayClick?: boolean;
}

interface ModalContextProps {
  activeModal: ModalType | null;
  openModal: (modal: ModalType) => void;
  closeModal: (modal?: ModalType) => void;
  toggleModal: (modal: ModalType) => void;
  isModalOpen: (modal: ModalType) => boolean;
  modalConfig: Record<ModalType, ModalConfig>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// ✅ ინდივიდუალური ქცევები თითოეულ მოდალზე
const modalConfigs: Record<ModalType, ModalConfig> = {
  login:    { closeOnEscape: true,  lockScroll: true,  closeOnOverlayClick: true },
  register: { closeOnEscape: true,  lockScroll: true,  closeOnOverlayClick: true },
  cart:     { closeOnEscape: true,  lockScroll: false, closeOnOverlayClick: true },
  language: { closeOnEscape: true,  lockScroll: true,  closeOnOverlayClick: true },
  profile:  { closeOnEscape: true,  lockScroll: false, closeOnOverlayClick: true },
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const openModal = (modal: ModalType) => {
    setActiveModal((prev) => (prev === modal ? null : modal));
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const toggleModal = (modal: ModalType) => {
    setActiveModal((prev) => (prev === modal ? null : modal));
  };

  const isModalOpen = (modal: ModalType) => activeModal === modal;

  // 🔒 Scroll Lock და Escape დახურვა
  useEffect(() => {
    const config = activeModal ? modalConfigs[activeModal] : null;

    if (config?.lockScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && config?.closeOnEscape) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  // ✅ Overlay Click — გლობალურად
  useEffect(() => {
    const handleOverlayClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const modalOverlay = target.closest('[data-modal-overlay="true"]');

      if (
        modalOverlay &&
        target === modalOverlay &&
        activeModal &&
        modalConfigs[activeModal]?.closeOnOverlayClick
      ) {
        closeModal();
      }
    };

    document.addEventListener('click', handleOverlayClick);
    return () => document.removeEventListener('click', handleOverlayClick);
  }, [activeModal]);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        openModal,
        closeModal,
        toggleModal,
        isModalOpen,
        modalConfig: modalConfigs,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
