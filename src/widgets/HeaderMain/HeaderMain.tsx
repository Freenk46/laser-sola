import React, { useState, MouseEvent } from 'react';
import {
    User, ShoppingBag,
    Earth,
} from 'lucide-react';
import { UserLoginModal } from 'widgets/UserLoginModal/UserLoginModal';
import styles from './HeaderMain.module.scss';
import { useTheme } from 'app/providers/ThemeProvider/ThemeProvider';
import { ThemeExplosionToggle } from 'widgets/ThemeExplosionToggle/ThemeExplosionToggle';
import { LanguageDrawer } from 'shared/ui/LanguageDrawer/LanguageDrawer';

interface HeaderMainProps {
    theme?: 'light' | 'dark';
}

const HeaderMain = ({ theme }: HeaderMainProps) => {
    const contextTheme = useTheme().theme;
    const toggleTheme = useTheme().toggleTheme;
    const appliedTheme =    `headerMain${theme || contextTheme}`;

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const nav = [
        { navItem: 'LASER HAIR REMOVAL', path: '/LHR' },
        { navItem: 'COSMETIC INJECTABLE', path: '/injectables' },
        { navItem: 'SKINCARE', path: '/skincare' },
    ];

    const dropdownContent: Record<string, JSX.Element> = {
        'LASER HAIR REMOVAL': (
            <ul><li>Women’s Laser</li><li>Men’s Laser</li><li>Full Body Packages</li></ul>
        ),
        'COSMETIC INJECTABLE': (
            <ul><li>Lip Filler</li><li>Anti-Wrinkle</li><li>Dermal Filler</li></ul>
        ),
        SKINCARE: (
            <ul><li>Facials</li><li>Peels</li><li>Microneedling</li></ul>
        ),
    };

    const handleThemeToggle = (e: MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const overlay = document.createElement('div');
        overlay.className = styles.overlay;

        const maxDim = Math.max(window.innerWidth, window.innerHeight) * 2;
        overlay.style.left = `${clientX - maxDim / 2}px`;
        overlay.style.top = `${clientY - maxDim / 2}px`;
        overlay.style.width = overlay.style.height = `${maxDim}px`;

        document.body.appendChild(overlay);
        requestAnimationFrame(() => {
            overlay.style.transform = 'scale(1)';
        });

        setTimeout(() => {
            toggleTheme();
        }, 400);

        setTimeout(() => {
            overlay.remove();
        }, 800);
    };

    return (
        <div className={`${styles.headerMain} ${appliedTheme}`}>
            <div className={styles.left}>
                <button className={styles.burger} onClick={() => setMobileMenuOpen(true)}>☰</button>
                <div className={styles.logo}>LASER SOLA</div>
            </div>

            <nav className={styles.center} onMouseLeave={() => setActiveDropdown(null)}>
                {nav.map((item) => (
                    <div
                        key={item.navItem}
                        className={styles.navItem}
                        onMouseEnter={() => setActiveDropdown(item.navItem)}
                        onClick={() => window.location.href = item.path}
                    >
                        {item.navItem}
                    </div>
                ))}
            </nav>

            <div className={styles.right}>
          
                <button
                onClick={() => setDrawerOpen(true)}
                 className={styles.langToggleMobile}
                 >
               <Earth size={20} strokeWidth={1.2} color="var(--text-color)" />
                 </button>
  
            <LanguageDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
            <button>
            <ShoppingBag size={18} strokeWidth={1.2} color="var(--text-color)" />
            </button>
            <button      className={styles.langToggleMobile} onClick={() => setLoginOpen(true)}>
                    <User size={20} strokeWidth={1.2} color="var(--text-color)"/>
                </button>
            </div>

            <UserLoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />

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
                <div className={styles.dropdown}>
                    {dropdownContent[activeDropdown]}
                </div>
            )}
        </div>
    );
};

export default HeaderMain;
