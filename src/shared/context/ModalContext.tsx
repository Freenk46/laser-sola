import React, { createContext, useContext } from 'react';
import { useModalManager, ModalType } from '../hooks/useModalManager';

const ModalContext = createContext<ReturnType<typeof useModalManager> | null>(null);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const modal = useModalManager();
  return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>;
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModalContext must be used within ModalProvider');
  return context;
};
