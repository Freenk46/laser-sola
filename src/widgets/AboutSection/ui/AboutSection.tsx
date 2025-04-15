import React from 'react';
import styles from './AboutSection.module.scss';

type Props = {
    title: string;
    text: string[];
    imageSrc: string;
    imageAlt?: string;
    buttonLabel?: string;
    onButtonClick?: () => void;
};

export const AboutSection = ({
    title,
    text,
    imageSrc,
    imageAlt = '',
    buttonLabel,
    onButtonClick,
}: Props) => (
    <section className={styles.section}>
        <div className={styles.text}>
            <h2 className={styles.title}>{title}</h2>
            {text.map((paragraph, idx) => (
                <p key={idx} className={styles.description}>{paragraph}</p>
            ))}
            {buttonLabel && (
                <button className={styles.button} onClick={onButtonClick}>
                    {buttonLabel}
                </button>
            )}
        </div>
        <div className={styles.image}>
            <img src={imageSrc} alt={imageAlt} />
        </div>
    </section>
);
