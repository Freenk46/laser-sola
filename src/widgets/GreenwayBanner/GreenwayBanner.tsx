import React, { useEffect, useState } from 'react';
import styles from './GreenwayBanner.module.scss';

const MESSAGE = '🌿 გრინვეის პროდუქცია უკვე ონლაინ ხელმისაწვდომია';

export const GreenwayBanner = () => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            if (index < MESSAGE.length) {
                setText((prev) => prev + MESSAGE[index]);
                setIndex(index + 1);
            } else {
                // გაჩერება და წაშლა ციკლისთვის
                setTimeout(() => {
                    setText('');
                    setIndex(0);
                }, 2000); // 2 წამი გაჩერებული ტექსტით
            }
        }, 70); // typing speed

        return () => clearTimeout(typingTimeout);
    }, [index]);

    return (
        <div className={styles.banner}>
            <span className={styles.typing}>{text}</span>

        </div>

    );
};
