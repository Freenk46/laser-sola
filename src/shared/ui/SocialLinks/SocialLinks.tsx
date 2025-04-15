import React from 'react';
import styles from './SocialLinks.module.scss';

const SocialLinks = () => (
    <div className={styles.socials}>
        <h4>Follow Us</h4>
        <div className={styles.icons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                📘
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                📸
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                🔗
            </a>
        </div>
    </div>
);

export default SocialLinks;
