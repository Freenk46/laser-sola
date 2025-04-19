import { useEffect, useState } from 'react';
import styles from './TopBar.module.scss';
import { ThemeExplosionToggle } from 'widgets/ThemeExplosionToggle/ThemeExplosionToggle';
import { useTheme } from 'app/providers/ThemeProvider';

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


const TopBar = ({ theme }: TopBarProps) => {
  const [index, setIndex] = useState(0);
      const contextTheme = useTheme().theme;  
      const appliedTheme =    `topBar${theme || contextTheme}`;

  const prev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? messages.length - 1 : prevIndex - 1));
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex === messages.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.topBar} ${appliedTheme}`}>
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
  
               < ThemeExplosionToggle  />
          
      
    </div>
  );
};

export default TopBar;
