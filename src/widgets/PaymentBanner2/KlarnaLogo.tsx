import React from 'react';
import styles from './KlarnaLogo.module.scss';

const KlarnaLogo: React.FC = () => {
  return (
    <div className={styles.klarnaContainer}>
      <span className={styles.klarnaText}>
        Klarna.
      </span>
    </div>
  );
};

export default KlarnaLogo;