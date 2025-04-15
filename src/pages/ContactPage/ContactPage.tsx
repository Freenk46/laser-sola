import React from 'react';
import ContactForm from 'features/ContactForm/ContactForm';
import ContactInfoBlock from 'shared/ui/ContactInfoBlock/ContactInfoBlock';
import MapEmbed from 'shared/ui/MapEmbed/MapEmbed';
import SocialLinks from 'shared/ui/SocialLinks/SocialLinks';
import styles from './ContactPage.module.scss';

const ContactPage = () => (
    <div className={styles.contactPage}>
        <h1 className={styles.title}>Get in Touch</h1>

        <div className={styles.grid}>
            <div className={styles.left}>
                <ContactForm />
            </div>

            <div className={styles.right}>
                <ContactInfoBlock />
                <SocialLinks />
            </div>
        </div>

        <MapEmbed />
    </div>
);

export default ContactPage;
