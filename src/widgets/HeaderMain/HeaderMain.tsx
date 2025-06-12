import React, { useState, MouseEvent, useRef } from 'react';
import { User, ShoppingBag, Earth } from 'lucide-react';
import { useTheme } from 'app/providers/ThemeProvider/ThemeProvider';
import { LanguageDrawer } from 'shared/ui/LanguageDrawer/LanguageDrawer';
import { AuthModalManager, } from 'shared/ui/AuthModalManager/AuthModalManager';
import styles from './HeaderMain.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from 'features/AuthByUsername/model/services/logoutUser';
import { getAuthData } from 'features/AuthByUsername/model/selectors/getAuthState';

import CartModal, { CartItem } from '../CartModal/index';
import { useModalContext } from 'shared/context/ModalContext';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

interface HeaderMainProps {
  theme?: 'light' | 'dark';
}

interface DropdownItem {
  label: string;
  path: string;
  anchor?: string;
}

interface DropdownData {
  image?: {
    src: string;
    alt?: string;
    link?: string;
  };
  items: DropdownItem[];
}

const HeaderMain = ({ theme }: HeaderMainProps) => {
  const contextTheme = useTheme().theme;
  const toggleTheme = useTheme().toggleTheme;
  const appliedTheme = `headerMain${theme || contextTheme}`;

  const dispatch = useDispatch();
  const authData = useSelector(getAuthData);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { isModalOpen, closeModal, openModal } = useModalContext();
  const [cartItems, setCartItems] = useState<CartItem[]>([{
    id: '1', tag: 'LHR', name: 'Lip & Chin', quantity: 1, price: 22.50
  }, {
    id: '2', tag: 'LHR', name: 'Face & Neck', quantity: 6, price: 270.00
  }]);

  const nav = [
    { navItem: 'ლაზერული ეპილაცია', path: '/LHR' },
    { navItem: 'კოსმეტიკური ინექციები', path: '/injectables' },
    { navItem: 'კანის მოვლა', path: '/skincare' },
  ];

  const dropdownContent: Record<string, DropdownData> = {
    'ლაზერული ეპილაცია': {
      image: { src: '/images/123.png', alt: 'ლაზერული ეპილაცია', link: '/LHR' },
      items: [
        { label: 'ქალბატონების ლაზერი', path: '/LHR', anchor: 'HeroSection' },
        { label: 'მამაკაცების ლაზერი', path: '/LHR' },
        { label: 'უპირატესობები', path: '/LHR', anchor: 'full-body-packages' },
        { label: 'ფასები და პაკეტები', path: '/LHR', anchor: 'pricing' },
        { label: 'დაჯავშნე კონსულტაცია', path: '/LHR', anchor: 'faqs' }
      ]
    },
    'კოსმეტიკური ინექციები': {
      image: { src: '/images/123.png', alt: 'ლაზერული ეპილაცია', link: '/LHR' },
      items: [
        { label: 'ტუჩების ფილერი', path: '/injectables', anchor: 'lip-filler' },
        { label: 'ბოტოქსი', path: '/injectables', anchor: 'anti-wrinkle' },
        { label: 'დერმალური ფილერი', path: '/injectables', anchor: 'dermal-filler' },
        { label: 'კონსულტაცია', path: '/injectables' },
        { label: 'უსაფრთხოება', path: '/injectables', anchor: 'safety-care' }
      ]
    },
    'კანის მოვლა': {
      image: { src: '/images/123.png', alt: 'ლაზერული ეპილაცია', link: '/LHR' },
      items: [
        { label: 'სახის მასაჟი', path: '/skincare', anchor: 'facials' },
        { label: 'ქიმიური პილინგი', path: '/skincare', anchor: 'peels' },
        { label: 'მიკრონიდლინგი', path: '/skincare', anchor: 'microneedling' },
        { label: 'HydraFacial', path: '/skincare' },
        { label: 'კანის ანალიზი', path: '/skincare', anchor: 'skin-analysis' }
      ]
    }
  };

  const handleDropdownEnter = (navItem: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(navItem);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
  };

  const handleNavigation = (item: DropdownItem) => {
    setActiveDropdown(null);
    const currentPath = window.location.pathname;

    if (item.anchor) {
      if (currentPath === item.path) {
        const element = document.getElementById(item.anchor);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = `${item.path}#${item.anchor}`;
      }
    } else {
      window.location.href = item.path;
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleProceedToCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
  };

  return (
    <div className={`${styles.headerMain} ${appliedTheme}`}>
      <div className={styles.left}>
        <button className={styles.burger} onClick={() => setMobileMenuOpen(true)}>☰</button>
        <div className={styles.logo}>LASER SOLA</div>
      </div>

      <nav className={styles.center} onMouseLeave={handleDropdownLeave}>
        {nav.map((item) => (
          <div
            key={item.navItem}
            className={styles.navItem}
            onMouseEnter={() => handleDropdownEnter(item.navItem)}
            onClick={() => window.location.href = item.path}
          >
            {item.navItem}
          </div>
        ))}
      </nav>

      <div className={styles.right}>
        <button onClick={() => openModal('language')} className={styles.langToggleMobile}>
          <Earth size={20} strokeWidth={1.2} />
        </button>
        <LanguageDrawer />
        <CartModal
          items={cartItems}
          onRemoveItem={handleRemoveItem}
          onProceedToCheckout={handleProceedToCheckout}
        />

        {authData ? (
          <button onClick={() => dispatch(logoutUser())}>
            <span style={{ marginRight: 4 }}>გამოსვლა</span><User size={20} />
          </button>
        ) : (
          <button onClick={() => openModal('login')}>
            <User  size={20} />
          </button>
        )}

        <button onClick={() => openModal('cart')}>
          <ShoppingBag  size={20} strokeWidth={1.2} />
        </button>
      </div>

      <AuthModalManager />

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <button className={styles.close} onClick={() => setMobileMenuOpen(false)}>✕</button>
          <ul>
            {nav.map((item) => (
              <li
                key={item.navItem}
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = item.path;
                }}
              >
                {item.navItem}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeDropdown && (
        <DropdownMenu
          image={dropdownContent[activeDropdown]?.image}
          items={dropdownContent[activeDropdown]?.items || []}
          onNavigate={handleNavigation}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownLeave}
        />
      )}
    </div>
  );
};

export default HeaderMain;
