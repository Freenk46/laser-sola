// AuthModalManager.tsx
import React from 'react';
import { UserLoginModal } from './ui/UserLoginModal/UserLoginModal';
import { UserRegisterModal } from './ui/UserRegistrationModal/UserRegisterModal';

export type AuthModalType = 'login' | 'register' | null;

type Props = {
  activeModal: AuthModalType;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
};

export const AuthModalManager: React.FC<Props> = ({
  activeModal,
  onClose,
  onSwitchToLogin,
  onSwitchToRegister,
}) => {
  return (
    <>
      <UserLoginModal
        isOpen={activeModal === 'login'}
        onClose={onClose}
        onSwitchToRegister={onSwitchToRegister}
      />

      <UserRegisterModal
        isOpen={activeModal === 'register'}
        onClose={onClose}
        onSwitchToLogin={onSwitchToLogin}
      />
    </>
  );
};
