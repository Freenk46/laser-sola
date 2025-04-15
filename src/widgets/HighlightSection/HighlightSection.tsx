import React from 'react';
import styles from './HighlightSection.module.scss';

interface HighlightSectionProps {
    videoSrc: string;
    heading: string;
    paragraphs: string[];
    ctaText?: string;
    ctaHref?: string;
    reverse?: boolean;
}

const HighlightSection = ({
    videoSrc,
    heading,
    paragraphs,
    ctaText,
    ctaHref,
    reverse = false,
}: HighlightSectionProps) => (
    <section className={styles.section}>
        <div className={`${styles.wrapper} ${reverse ? styles.reverse : ''}`}>
            <div className={styles.videoWrapper}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className={styles.content}>
                <h2 className={styles.heading}>{heading}</h2>

                {paragraphs.map((text, i) => (
                    <p key={i} className={styles.paragraph}>
                        {text}
                    </p>
                ))}

                {ctaText && ctaHref && (
                    <a href={ctaHref} className={styles.cta}>
                        {ctaText}
                    </a>
                )}
            </div>
        </div>
    </section>
);

export default HighlightSection;
