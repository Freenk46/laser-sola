import React, { useEffect, useRef, useState } from 'react';
import styles from './UserLoginModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getAuthState } from 'features/AuthByUsername/model/selectors/getAuthState';
import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';

import { AppDispatch } from 'app/providers/StoreProvider';
import { useModalContext } from 'shared/context/ModalContext';
import { useTheme } from 'app/providers/ThemeProvider';

export const UserLoginModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);

  const { activeModal, closeModal, openModal } = useModalContext();
  const isOpen = activeModal === 'login';

  const { email, password, isLoading, error } = useSelector(getLoginState);
  const { authData } = useSelector(getAuthState);

         const contextTheme = useTheme().theme;
          const appliedTheme = `authmodal${ contextTheme}`;

  // Autofocus
  useEffect(() => {
    if (isOpen && emailInputRef.current) {
      setTimeout(() => emailInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeModal, isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal, isOpen]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Success Login Handling
  useEffect(() => {
    if (authData && isOpen) {
      toast.success('შესვლა წარმატებულია');
      closeModal();
    }
  }, [authData, isOpen, closeModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginByUsername({ email, password }));
  };

  const handleSocialRegistration = (provider: string) => {
    console.log(`რეგისტრაცია ${provider}-ით`);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div ref={modalRef} className={`${styles.authmodal} ${appliedTheme}`} tabIndex={-1}>
        <div className={styles.header}>
          <span className={styles.brand}>LaserSola</span>
          <button className={styles.close} onClick={closeModal} aria-label="დახურვა">
            ×
          </button>
        </div>

        {/* Social login */}
        <div className={styles.social}>
          <button className={`${styles.socialBtn} ${styles.googleBtn}`} onClick={() => handleSocialRegistration('Google')}>
            <span className={styles.icon}>🌐</span> Google-ით რეგისტრაცია
          </button>
          <button className={`${styles.socialBtn} ${styles.appleBtn}`} onClick={() => handleSocialRegistration('Apple')}>
            <span className={styles.icon}>🍏</span> Apple-ით რეგისტრაცია
          </button>
          <button className={`${styles.socialBtn} ${styles.facebookBtn}`} onClick={() => handleSocialRegistration('Facebook')}>
            <span className={styles.icon}>📘</span> Facebook-ით რეგისტრაცია
          </button>
        </div>

        {/* Login form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.inputGroup}>
            <input
              type="email"
              ref={emailInputRef}
              value={email}
              onChange={(e) => dispatch(loginActions.setUsername(e.target.value))}
              placeholder="ელ-ფოსტა"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => dispatch(loginActions.setPassword(e.target.value))}
                placeholder="პაროლი"
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'დამალე პაროლი' : 'აჩვენე პაროლი'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.forgotPassword}>
            <a href="#forgot-password">დაგავიწყდათ პაროლი?</a>
          </div>

          <button type="submit" className={styles.signIn} disabled={isLoading}>
            {isLoading ? 'იტვირთება...' : 'შესვლა'}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <span>
            არ ხართ დარეგისტრირებული?{' '}
            <a
              href="#register"
              onClick={(e) => {
                e.preventDefault();
                closeModal();
                openModal('register');
              }}
            >
              რეგისტრაცია
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
