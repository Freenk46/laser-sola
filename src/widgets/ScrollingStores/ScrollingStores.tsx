import React from 'react';
import styles from './ScrollingStores.module.scss';
import clsx from 'clsx';

interface ScrollingStoresProps {
    items: string[];
    highlight?: string;
    speed?: number; // წამებში
    direction?: 'left' | 'right';
}

const ScrollingStores: React.FC<ScrollingStoresProps> = ({
    items,
    highlight,
    speed = 30,
    direction = 'left',
}) => {
    const animationStyle = {
        animationDuration: `${speed}s`,
    };

    const isReverse = direction === 'right';

    return (
        <div className={styles.marqueeWrapper}>
            <div
                className={clsx(styles.marquee, isReverse && styles.reverse)}
                style={animationStyle}
            >
                {[...items, ...items].map((city, i) => (
                    <span
                        key={i}
                        className={clsx(
                            styles.city,
                            highlight === city && styles.highlight
                        )}
                    >
                        {city}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ScrollingStores;
