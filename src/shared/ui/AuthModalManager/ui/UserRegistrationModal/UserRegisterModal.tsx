import React, { useEffect, useRef, useState } from 'react';
import styles from './UserRegisterModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'app/providers/StoreProvider';
import { registerUser } from 'features/RegisterUser/model/services/registerUser';
import { resetRegisterState } from 'features/RegisterUser/model/slice/registerSlice';
import { getRegisterState } from 'features/RegisterUser/model/selectors/getRegisterState';
import { getAuthState } from 'features/AuthByUsername/model/selectors/getAuthState';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
};

export const UserRegisterModal = ({ isOpen, onClose, onSwitchToLogin }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, success } = useSelector(getRegisterState);
  const { authData } = useSelector(getAuthState);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      dispatch(resetRegisterState());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      setTimeout(() => nameInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (authData && isOpen) {
      onClose();
    }
  }, [authData, isOpen, onClose]);

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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'სახელი აუცილებელია';
    if (!formData.email) newErrors.email = 'ელ-ფოსტა აუცილებელია';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'არასწორი ფორმატი';
    if (!formData.password || formData.password.length < 8)
      newErrors.password = 'პაროლი სავალდებულოა და უნდა შეიცავდეს 8+ სიმბოლოს';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'პაროლები არ ემთხვევა';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'დაეთანხმეთ წესებს';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    await dispatch(
      registerUser({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      }),
    );
  };
  const handleSocialRegistration = (provider: string) => {
    console.log(`რეგისტრაცია ${provider}-ით`);
    // აქ იქნება სოციალური მედიის რეგისტრაციის ლოგიკა
};

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.header}>
          <span className={styles.brand}>LaserSola</span>
          <h2>რეგისტრაცია</h2>
          <button className={styles.close} onClick={onClose} aria-label="დახურვა">
            ×
          </button>
        </div>

        

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <input
            name="fullName"
            type="text"
            ref={nameInputRef}
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="სახელი და გვარი"
            required
          />
          {errors.fullName && <div className={styles.errorMessage}>{errors.fullName}</div>}

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="ელ-ფოსტა"
            required
          />
          {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}

          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="პაროლი"
            required
          />
          {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}

          <input
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="გაიმეორეთ პაროლი"
            required
          />
          {errors.confirmPassword && (
            <div className={styles.errorMessage}>{errors.confirmPassword}</div>
          )}

          <label className={styles.checkbox}>
            <input
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              required
            />
            ვეთანხმები წესებს და პირობებს
          </label>
          {errors.agreeTerms && <div className={styles.errorMessage}>{errors.agreeTerms}</div>}

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button type="submit" disabled={loading}   className={styles.registerButton}>
            {loading ? 'რეგისტრაცია...' : 'რეგისტრაცია'}
          </button>
        </form>

        <div className={styles.footer}>
          <span>
            უკვე გაქვს ანგარიში?{' '}
            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                onSwitchToLogin?.();
              }}
            >
              შესვლა
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
