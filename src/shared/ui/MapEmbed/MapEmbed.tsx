import React from 'react';
import styles from './MapEmbed.module.scss';

const MapEmbed = () => (
    <div className={styles.mapWrapper}>
        <iframe
            title="Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.8491870593703!2d44.7944522!3d41.715137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd0637e6cfb%3A0xb6e42b14a4b3b20a!2sTbilisi%2C%20Georgia!5e0!3m2!1sen!2sge!4v1711700000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
    </div>
);

export default MapEmbed;
