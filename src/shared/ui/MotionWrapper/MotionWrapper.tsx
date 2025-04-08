import { motion, MotionProps } from 'framer-motion';
import React from 'react';
import styles from './MotionWrapper.module.scss';

interface MotionWrapperProps extends MotionProps {
    className?: string;
    children: React.ReactNode;
    tag?: keyof JSX.IntrinsicElements;
}

export const MotionWrapper = ({
    className,
    children,

    tag = 'div',
    ...rest
}: MotionWrapperProps) => {
    const MotionTag = motion[tag as keyof typeof motion];

    return (
        <MotionTag
            className={`${styles.motionWrapper} ${className || ''}`}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            {...rest}
        >
            {children}
        </MotionTag>
    );
};
