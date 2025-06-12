import React from 'react';
import { UserLoginModal } from './ui/UserLoginModal/UserLoginModal';
import { UserRegisterModal } from './ui/UserRegistrationModal/UserRegisterModal';
import { useModalContext } from 'shared/context/ModalContext';

export const AuthModalManager = () => {
  const { activeModal, openModal, closeModal } = useModalContext();

  return (
    <>
      <UserLoginModal/>

      <UserRegisterModal/>
    </>
  );
};
