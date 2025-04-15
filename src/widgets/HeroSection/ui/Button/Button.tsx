// shared/ui/Button/Button.tsx
import React from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    href?: string;
}

export const Button = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    iconLeft,
    iconRight,
    href,
    children,
    className,
    onClick,
    ...rest
}: ButtonProps) => {
    const variantClass = styles[variant];
    const sizeClass = styles[size];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;

        if (href) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }

        if (onClick) onClick(e);
    };

    return (
        <button
            className={classNames(
                styles.button,
                {
                    [variantClass]: true,
                    [sizeClass]: true,
                    [styles.fullWidth]: fullWidth,
                    [styles.loading]: loading,
                    [styles.disabled]: disabled,
                },
                [className],
            )}
            onClick={handleClick}
            disabled={disabled}
            {...rest}
        >
            {loading ? (
                <span className={styles.loader} />
            ) : (
                <>
                    {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
                    <span className={styles.label}>{children}</span>
                    {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
                </>
            )}
        </button>
    );
};
