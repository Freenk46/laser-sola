import React from 'react';
import styles from './HeroSection.module.scss';

interface HeroSectionProps {
    image: string;
    title: string;
    description: string;
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
    navLinks = [],
}: HeroSectionProps) => {
    const handleScroll = (id: string) => {
        const target = document.querySelector(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.hero}>
            <div className={styles.imageBlock}>
                <img src={image} alt="Hero" />
            </div>

            <div className={styles.textBlock}>
                <h1>{title}</h1>
                <p>{description}</p>

                <div className={styles.buttons}>
                    {primaryBtn.href ? (
                        <button className={styles.primary} onClick={() => handleScroll(primaryBtn.href!)}>
                            {primaryBtn.text}
                        </button>
                    ) : (
                        <button className={styles.primary} onClick={primaryBtn.onClick}>
                            {primaryBtn.text}
                        </button>
                    )}

                    {secondaryBtn?.href ? (
                        <button className={styles.secondary} onClick={() => handleScroll(secondaryBtn.href!)}>
                            {secondaryBtn.text}
                        </button>
                    ) : (
                        secondaryBtn?.onClick && (
                            <button className={styles.secondary} onClick={secondaryBtn.onClick}>
                                {secondaryBtn.text}
                            </button>
                        )
                    )}
                </div>
            </div>

            {navLinks.length > 0 && (
                <nav className={styles.nav}>
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
