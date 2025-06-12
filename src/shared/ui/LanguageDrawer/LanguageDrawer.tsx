import { Globe } from 'lucide-react';
import styles from './LanguageDrawer.module.scss';
import { useState } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useModalContext } from 'shared/context/ModalContext';

export const LanguageDrawer = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { i18n } = useTranslation();
  const contextTheme = useTheme().theme;
  const { activeModal, closeModal } = useModalContext();

  const isOpen = activeModal === 'language';
  const appliedTheme = `drawer${contextTheme}`;
  const selectedLang = i18n.language.toUpperCase();

  const toggleLanguageMenu = () => setIsLangOpen(prev => !prev);

  const handleLanguageSelect = (lang: string) => {
    i18n.changeLanguage(lang.toLowerCase());
    setIsLangOpen(false);
    closeModal(); // დახურვა ენის არჩევის შემდეგ
  };

  const handleOverlayClick = () => {
    closeModal();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.drawerOverlay} onClick={handleOverlayClick}>
      <div className={`${styles.drawer} ${appliedTheme}`} onClick={stopPropagation}>
        <div className={styles.header}>
          <h3>ენის არჩევა</h3>
          <button onClick={closeModal}>✕</button>
        </div>

        <p>აირჩიე ენა</p>
        <div className={styles.selector} onClick={toggleLanguageMenu}>
          <span><Globe color="#000" size={30} /></span> {selectedLang}
          <span className={styles.dropdown}>▾</span>
        </div>

        {isLangOpen && (
          <ul className={styles.menu}>
            <li onClick={() => handleLanguageSelect('en')}>English</li>
            <li onClick={() => handleLanguageSelect('ka')}>ქართული</li>
          </ul>
        )}
      </div>
    </div>
  );
};
