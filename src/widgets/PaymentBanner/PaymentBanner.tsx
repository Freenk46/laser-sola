import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './PaymentBanner.module.scss';

const promoMessages = [
  'გრინვეის პროდუქცია უკვე ონლაინ ხელმისაწვდომია',
  '100% ნატურალური კოსმეტიკა სახისთვის და სხეულისთვის',
  'მიიღე უფასო საკონსულტაციო ზარი ეკო-მოვლაზე',
];

export const PaymentBanner = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  const currentText = promoMessages[msgIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (index < currentText.length) {
      timer = setTimeout(() => {
        setText((prev) => prev + currentText[index]);
        setIndex((prev) => prev + 1);
      }, 60);
    } else {
      timer = setTimeout(() => {
        setText('');
        setIndex(0);
        setMsgIndex((prev) => (prev + 1) % promoMessages.length);
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [index, msgIndex, currentText]);

  return (
    <motion.div
      className={styles.banner}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.inner}>
        <div className={styles.text}>
          🌿 {text}
          <span className={styles.cursor}>|</span>
        </div>

        {index === currentText.length && (
          <motion.a
            href="/products"
            className={styles.cta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            დაათვალიერე პროდუქცია
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};
