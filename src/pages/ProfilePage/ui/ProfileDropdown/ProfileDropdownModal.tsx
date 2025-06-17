import React, { useRef, useEffect, useState } from 'react';
import { User, Settings, Calendar, HelpCircle, MessageSquare, LogOut } from 'lucide-react';
import styles from './ProfileDropdown.module.scss';
import { useModalContext } from 'shared/context/ModalContext';
import { useTheme } from 'app/providers/ThemeProvider';

interface Props {
  onNavigate: (section: string) => void;
}

export default function ProfileDropdownModal({ onNavigate }: Props) {
  const { isModalOpen, closeModal, activeModal, modalConfig } = useModalContext();
  const isOpen = isModalOpen('profile');
  const config = modalConfig['profile'];

  const [scrolled, setScrolled] = useState(false); // ✅ scroll flag

  const dropdownRef = useRef(null);
  const theme = useTheme().theme;
  const appliedTheme = `profileDropdown${theme}`;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (
      e.target === e.currentTarget &&
      activeModal === 'profile' &&
      config?.closeOnOverlayClick
    ) {
      closeModal('profile');
    }
  };

  const handleNavigation = (section: string) => {
    onNavigate(section);
    closeModal('profile');
  };

  const menuItems = [
    { id: 'account', label: 'My Account', icon: User },
    { id: 'treatments', label: 'My Treatments', icon: Settings },
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'faqs', label: 'FAQ', icon: HelpCircle },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ];

  // ✅ SCROLL Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${styles.open} `}
      data-modal-overlay="true"
      onClick={handleOverlayClick}
    >
      <div
        ref={dropdownRef}
        className={`${styles.dropdown} ${appliedTheme} ${scrolled ? styles.scrolled : ''}`} // ✅ apply scrolled
      >
        <div className={styles.dropdownContent}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={styles.menuItem}
              >
                <IconComponent className={styles.menuIcon} />
                <span className={styles.menuLabel}>{item.label}</span>
              </button>
            );
          })}
          <div className={styles.divider}></div>
          <button
            onClick={() => handleNavigation('logout')}
            className={styles.logoutButton}
          >
            <LogOut className={styles.menuIcon} />
            <span className={styles.menuLabel}>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
