import React, { useEffect, useRef, useState } from 'react';
import styles from './UserLoginModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import { getAuthState } from 'features/AuthByUsername/model/selectors/getAuthState';

import { AppDispatch } from 'app/providers/StoreProvider';
import { toast } from 'react-toastify';
import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState/getLoginState';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
// import { useNavigate } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
};

export const UserLoginModal = ({ isOpen, onClose, onSwitchToRegister }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);

  const { email, password, isLoading, error } = useSelector(getLoginState);
  const { authData } = useSelector(getAuthState);
  // const navigate = useNavigate();

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
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, isOpen]);

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Success Login Handling
  useEffect(() => {
    if (authData && isOpen) {
      toast.success('შესვლა წარმატებულია');
      onClose();
      // navigate('/dashboard');
    }
  }, [authData, isOpen, onClose]);

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginByUsername({ email, password }));
  };
  const handleSocialRegistration = (provider: string) => {
    console.log(`რეგისტრაცია ${provider}-ით`);
    // აქ იქნება სოციალური მედიის რეგისტრაციის ლოგიკა
};

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div ref={modalRef} className={styles.modal} tabIndex={-1}>
        <div className={styles.header}>
          <span className={styles.brand}>LaserSola</span>
          <button className={styles.close} onClick={onClose} aria-label="დახურვა">
            ×
          </button>
        </div>
        <div className={styles.social}>
                    <button 
                        className={`${styles.socialBtn} ${styles.googleBtn}`}
                        onClick={() => handleSocialRegistration('Google')}
                    >
                        <span className={styles.icon}>
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                            </svg>
                        </span>
                        Google-ით რეგისტრაცია
                    </button>
                    <button 
                        className={`${styles.socialBtn} ${styles.appleBtn}`}
                        onClick={() => handleSocialRegistration('Apple')}
                    >
                        <span className={styles.icon}>
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path fill="currentColor" d="M16.182,0c0.266,2.438-0.719,4.612-2.134,6.099c-1.438,1.524-3.415,2.617-5.541,2.469c-0.274-2.243,0.737-4.563,2.132-6.054C12.074,1.023,14.309,0.064,16.182,0z M18.968,7.742c-1.754,0.926-3.196,2.43-3.868,4.351c-0.79,2.24-0.301,5.241,0.242,7.681c0.529,2.373,1.298,4.763,2.757,6.226c-1.085,0-2.068-0.454-3.09-0.816c-1.906-0.681-3.726-1.388-5.992-1.39c-2.142-0.004-4.011,0.736-5.86,1.466c-0.98,0.386-1.979,0.828-3.049,0.74c2.15-3.469,3.55-8.292,2.804-13.506c-0.357-2.479-1.326-4.779-2.804-6.701c1.083-0.76,2.396-1.242,3.886-1.271c1.443-0.027,2.653,0.428,3.742,0.909c1.076,0.473,2.099,0.852,3.497,0.873c1.602,0.023,2.568-0.396,3.539-0.873C15.894,4.961,17.12,4.442,18.968,4.418C19.032,5.541,19.238,6.702,18.968,7.742z"/>
                            </svg>
                        </span>
                        Apple-ით რეგისტრაცია
                    </button>
                    <button 
                        className={`${styles.socialBtn} ${styles.facebookBtn}`}
                        onClick={() => handleSocialRegistration('Facebook')}
                    >
                        <span className={styles.icon}>
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path fill="currentColor" d="M9.198,21.5h4v-8.01h3.604l0.396-3.98h-4V7.5c0-1.11,0.402-1.98,1.98-1.98H17.2V2.02c-0.305-0.043-1.423-0.14-2.714-0.14c-2.716,0-4.588,1.657-4.588,4.7v2.93H6.2v3.98h3.598v8.01H9.198z"/>
                            </svg>
                        </span>
                        Facebook-ით რეგისტრაცია
                    </button>
                </div>

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

        <div className={styles.footer}>
          <span>
            არ ხართ დარეგისტრირებული?{' '}
            <a
              href="#register"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                onSwitchToRegister();
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
