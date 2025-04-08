import React from 'react';
import styles from './HeroSection.module.scss';
import { Button } from './Button/Button';

interface HeroSectionProps {
    image: string;
    title: string;
    description: string;
    textBackgroundColor?: string;
    navBackgroundColor?: string;
    primaryBtn: {
        text: string;
        onClick?: () => void;
        href?: string;
    };
    secondaryBtn?: {
        text: string;
        onClick?: () => void;
        href?: string;
    };
    navLinks?: { label: string; href: string }[];
}

export const HeroSection = ({
    image,
    title,
    description,
    primaryBtn,
    secondaryBtn,
    textBackgroundColor = '#fff',
    navBackgroundColor = '#fff',
    navLinks = [],
}: HeroSectionProps) => {
    const handleScroll = (id: string) => {
        const target = document.querySelector(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            className={styles.hero}

        >
            <div className={styles.heroInner}>
                <div className={styles.imageBlock}>
                    <img src={image} alt="Hero" />
                </div>

                <div className={styles.textBlock} style={{ backgroundColor: textBackgroundColor }}>
                    <h1>{title}</h1>
                    <p>{description}</p>

                    <div className={styles.buttons}>
                        {primaryBtn && (
                            <Button
                                variant="primary"
                                size="md"
                                href={primaryBtn.href}
                                onClick={primaryBtn.onClick}
                            >
                                {primaryBtn.text}
                            </Button>
                        )}
                        {secondaryBtn && (
                            <Button
                                variant="secondary"
                                size="md"
                                href={secondaryBtn.href}
                                onClick={secondaryBtn.onClick}
                            >
                                {secondaryBtn.text}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {navLinks.length > 0 && (
                <nav
                    className={styles.nav}
                    style={{ backgroundColor: navBackgroundColor }}
                >
                    {navLinks.map((link) => (
                        <button key={link.href} onClick={() => handleScroll(link.href)}>
                            {link.label}
                        </button>
                    ))}
                </nav>
            )}
        </section>
    );
};
