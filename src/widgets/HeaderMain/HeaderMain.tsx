import { useState } from 'react';
import styles from './HeaderMain.module.scss';
import { User, Search, Heart, ShoppingBag } from 'lucide-react';
import { UserLoginModal } from 'widgets/UserLoginModal/UserLoginModal';

const HeaderMain = () => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);

    const nav = [
        { navItem: 'LASER HAIR REMOVAL', path: '/LHR' },
        { navItem: 'COSMETIC INJECTABLE', path: '/injectables' },
        { navItem: 'SKINCARE', path: '/skincare' },
    ];

    const dropdownContent: Record<string, JSX.Element> = {
        'LASER HAIR REMOVAL': (
            <ul>
                <li>Women’s Laser</li>
                <li>Men’s Laser</li>
                <li>Full Body Packages</li>
            </ul>
        ),
        'COSMETIC INJECTABLE': (
            <ul>
                <li>Lip Filler</li>
                <li>Anti-Wrinkle</li>
                <li>Dermal Filler</li>
            </ul>
        ),
        'SKINCARE': (
            <ul>
                <li>Facials</li>
                <li>Peels</li>
                <li>Microneedling</li>
            </ul>
        ),
    };

    const handleClick = (path: string) => {
        window.location.href = path;
    };

    return (
        <div className={styles.headerMain}>
            <div className={styles.left}>
                <button
                    className={styles.burger}
                    onClick={() => setMobileMenuOpen(true)}
                >
                    ☰
                </button>
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
                <button onClick={() => setLoginOpen(true)}>
                    <User size={18} strokeWidth={1.2} />
                </button >
                <ShoppingBag size={18} strokeWidth={1.2} />
            </div>
            <UserLoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
            {/* Burger icon - visible on mobile */}


            {/* Mobile menu overlay */}
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

            {/* Desktop mega dropdown */}
            {activeDropdown && (
                <div className={styles.dropdown}>
                    {dropdownContent[activeDropdown]}
                </div>
            )}
        </div>
    );
};
export default HeaderMain;
