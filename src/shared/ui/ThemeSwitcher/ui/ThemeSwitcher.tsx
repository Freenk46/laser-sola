import { classNames } from 'shared/lib/classNames/classNames';
import React, { MouseEvent } from 'react';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './ThemeSwitcher.module.scss'; // 🔹 SCSS module ფაილი

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;

        const overlay = document.createElement('div');
        overlay.className = cls.overlay;

        const maxDim = Math.max(window.innerWidth, window.innerHeight) * 2;
        overlay.style.left = `${clientX - maxDim / 2}px`;
        overlay.style.top = `${clientY - maxDim / 2}px`;
        overlay.style.width = overlay.style.height = `${maxDim}px`;

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.style.transform = 'scale(1)';
        });

        setTimeout(() => {
            toggleTheme();
            document.body.removeChild(overlay);
        }, 800);
    };

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames(cls.themeSwitcher, {}, [className])}
            onClick={handleClick}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
};
