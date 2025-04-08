import { useEffect, useState } from 'react';
import styles from './TopBar.module.scss';

const messages = [
    'Free Shipping On All Intl. Orders Over $150 USD',
    'We’re waiving piercing fees for Mejuri+ members. Book Now',
    'New arrivals just dropped — check them out!'
];

const navLinks = [

    'About Us',
    'Help',
    'USD / (Rest Of World)',
    '/LHR'
];

const TopBar = () => {
    const [index, setIndex] = useState(0);

    const prev = () => {
        setIndex((prevIndex) =>
            prevIndex === 0 ? messages.length - 1 : prevIndex - 1
        );
    };

    const next = () => {
        setIndex((prevIndex) =>
            prevIndex === messages.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.topBar}>
            <div className={styles.left}>
                <button className={styles.arrow} onPointerDown={prev}>
                    ◀
                </button>
                <button className={styles.arrow} onPointerDown={next}>
                    ▶
                </button>
                <div className={styles.message}>
                    <span>{messages[index]}</span>
                </div>
            </div>

            <div className={styles.right}>
                {navLinks.map((link) => (
                    <a key={link} href={link}>
                        {link}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TopBar;
