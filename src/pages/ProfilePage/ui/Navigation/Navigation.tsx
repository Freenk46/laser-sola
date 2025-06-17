import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MenuItemType } from '../../ProfilePage';
import styles from './Navigation.module.scss';

interface MenuItem {
  id: MenuItemType;
  label: string;
}

interface NavigationProps {
  activeMenuItem: MenuItemType;
  onMenuItemClick: (itemId: MenuItemType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeMenuItem, onMenuItemClick }) => {
  const menuItems: MenuItem[] = [
    { id: 'account', label: 'Account' },
    { id: 'treatments', label: 'My Treatments' },
    { id: 'appointments', label: 'My Appointments' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'feedback', label: 'Feedback' }
  ];

  return (
    <div className={styles.navigation}>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.menuItem} ${
              activeMenuItem === item.id ? styles.active : ''
            }`}
            onClick={() => onMenuItemClick(item.id)}
          >
            <span className={styles.menuLabel}>{item.label}</span>
            <ChevronRight size={16} className={styles.chevron} />
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;