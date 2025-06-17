import React from 'react';
import styles from './DropdownMenu.module.scss';
import { useTheme } from 'app/providers/ThemeProvider';

interface DropdownItem {
  label: string;
  path: string;
  anchor?: string;
}

interface DropdownImage {
  src: string;
  alt?: string;
  link?: string;
}

interface DropdownMenuProps {
  image?: DropdownImage;
  items: DropdownItem[];
  onNavigate: (item: DropdownItem) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;

}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  image,
  items,
  onNavigate,
  onMouseEnter,
  onMouseLeave,

}) => {
      const contextTheme = useTheme().theme;
      const appliedTheme = `dropdown${ contextTheme}`;
    
  return (
    <div className={`${styles.dropdown} ${appliedTheme}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className={styles.dropdownContent}>
        {image && (
          <div
            className={styles.dropdownImage}
            onClick={() => image.link && (window.location.href = image.link)}
          >
            <p className={styles.dropdownImageCaption}>About Laser Hair Removal</p>
            <img src={image.src} alt={image.alt || ''} />
          </div>
        )}
<div>
  
</div>
        <ul className={styles.dropdownList}>
        <p className={styles.dropdownImageCaption}>კატეგორიები</p>
          {items.map((item, index) => (
            <li
              key={index}
              className={styles.dropdownItem}
              onClick={() => onNavigate(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
