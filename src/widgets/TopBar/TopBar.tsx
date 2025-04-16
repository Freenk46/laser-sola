import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import styles from './TopBar.module.scss';

const messages = [
  'უფასო კონსულტაცია ყველა ახალ მომხმარებელზე',
  'დაჯავშნე დღეს და მიიღე -20% პირველი ვიზიტისთვის',
  'ლაზერული ეპილაცია — სწრაფი, უსაფრთხო და გრძელვადიანი შედეგი',
];

const navLinks = [
  'ჩვენს შესახებ',
  'დახმარება',
  'კითხვები და პასუხები',
];

interface TopBarProps {
  theme?: 'light' | 'dark';
}

const TopBar = ({ theme = 'light' }: TopBarProps) => {
  const [index, setIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  const prev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? messages.length - 1 : prevIndex - 1));
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex === messages.length - 1 ? 0 : prevIndex + 1));
  };

  const toggleLanguageMenu = () => {
    setIsLangOpen((prev) => !prev);
  };

  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang);
    setIsLangOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={`${styles.topBar} ${styles[theme]}`}>
        <div className={styles.left}>
          <button className={styles.arrow} onPointerDown={prev}>◀</button>
          <button className={styles.arrow} onPointerDown={next}>▶</button>
          <div className={styles.message}>
            <span>{messages[index]}</span>
          </div>
        </div>

        <div className={styles.right}>
          {navLinks.map((link) => (
            <a key={link} href={link}>{link}</a>
          ))}
        </div>

        <div className={styles.globeMobile}>
          <button className={styles.langToggle} onClick={() => setDrawerOpen(true)}>
            <Globe size={18} />
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div className={`${styles.drawer} ${styles[theme]}`}>
          <div className={styles.header}>
            <h3>ენის არჩევა</h3>
            <button onClick={() => setDrawerOpen(false)}>✕</button>
          </div>

          <p>აირჩიე ენა</p>
          <div className={styles.selector} onClick={toggleLanguageMenu}>
            <span role="img" aria-label="lang">
              <Globe size={30} />
            </span>{' '}
            {selectedLang === 'EN' ? 'EN' : 'GE'}
            <span className={styles.dropdown}>▾</span>
          </div>

          {isLangOpen && (
            <ul className={styles.menu}>
              <li onClick={() => handleLanguageSelect('EN')}>English</li>
              <li onClick={() => handleLanguageSelect('KA')}>ქართული</li>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default TopBar;
