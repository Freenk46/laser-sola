import React from 'react';
import styles from './ClearpayLogo.module.scss';

const ClearpayLogo: React.FC = () => {
  return (
    <div className={styles.clearpayContainer}>
      <span className={styles.clearpayText}>
        clearpay
      </span>
      <div className={styles.clearpayIcon}>
        <div className={styles.clearpayDot}></div>
      </div>
    </div>
  );
};

export default ClearpayLogo;