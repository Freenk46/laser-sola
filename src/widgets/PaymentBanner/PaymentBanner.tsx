import React, { useEffect, useState } from 'react';
import styles from './PaymentBanner.module.scss';

const typingText = 'გრინვეის პროდუქცია უკვე ონლაინ ხელმისაწვდომია';

export const PaymentBanner = () => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (index < typingText.length) {
                setText((prev) => prev + typingText[index]);
                setIndex(index + 1);
            } else {
                // გაჩერდეს 2 წამით, მერე განულდეს
                setTimeout(() => {
                    setText('');
                    setIndex(0);
                }, 2000);
            }
        }, 80);

        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className={styles.banner}>
            <div className={styles.text}>
                🌿 {text}
                <span className={styles.cursor}>|</span>
            </div>

            {/* <div className={styles.logos}>
                <div className={styles.badge}>✔ ბიო კოსმეტიკა</div>
                <div className={styles.badge}>✔ ეკო-მოვლა სახისთვის</div>
                <div className={styles.badge}>✔ ნახე ახლა</div>
            </div> */}
        </div>
    );
};
