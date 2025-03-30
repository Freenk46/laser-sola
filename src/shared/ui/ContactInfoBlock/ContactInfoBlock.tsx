import React from 'react';
import styles from './ContactInfoBlock.module.scss';

const ContactInfoBlock = () => {
    return (
        <div className={styles.info}>
            <h3>Contact Information</h3>
            <ul>
                <li>
                    <strong>Address:</strong> 123 Beauty Street, Tbilisi, Georgia
                </li>
                <li>
                    <strong>Phone:</strong> <a href="tel:+995555123456">+995 555 123 456</a>
                </li>
                <li>
                    <strong>Email:</strong> <a href="mailto:info@lasersola.com">info@lasersola.com</a>
                </li>
                <li>
                    <strong>Working Hours:</strong> Mon–Sat, 10:00–19:00
                </li>
            </ul>
        </div>
    );
};

export default ContactInfoBlock;
