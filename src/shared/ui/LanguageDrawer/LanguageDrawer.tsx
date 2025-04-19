import { Globe } from 'lucide-react';
import styles from './LanguageDrawer.module.scss';
import { useState } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';

interface LanguageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark';
}


export const LanguageDrawer = ({ theme, isOpen, onClose }: LanguageDrawerProps) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
        const contextTheme = useTheme().theme;
        const appliedTheme =    `drawer${theme || contextTheme}`;

  const toggleLanguageMenu = () => setIsLangOpen((prev) => !prev);
  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang);
    setIsLangOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.drawer} ${appliedTheme}`}>
      <div className={styles.header}>
        <h3>ენის არჩევა</h3>
        <button onClick={onClose}>✕</button>
      </div>

      <p>აირჩიე ენა</p>
      <div className={styles.selector} onClick={toggleLanguageMenu}>
        <span>
          <Globe size={30} />
        </span>{' '}
        {selectedLang}
        <span className={styles.dropdown}>▾</span>
      </div>

      {isLangOpen && (
        <ul className={styles.menu}>
          <li onClick={() => handleLanguageSelect('EN')}>English</li>
          <li onClick={() => handleLanguageSelect('KA')}>ქართული</li>
        </ul>
      )}
    </div>
  );
};
