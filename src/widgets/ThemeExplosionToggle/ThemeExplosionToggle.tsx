import React, { MouseEvent } from 'react';
import { useTheme } from 'app/providers/ThemeProvider/ThemeProvider';
import { createThemeTransition } from 'shared/lib/theme/createThemeTransition';
import { Sun } from 'lucide-react';

export const ThemeExplosionToggle = () => {
  const { toggleTheme, theme } = useTheme();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const isDark = theme === 'dark';
    const direction = isDark ? 'explode' : 'implode';
    const color = '#ffffff';

    // 🌀 ტალღა - ორივე შემთხვევაში
    createThemeTransition(e.clientX, e.clientY, direction, color);

    // ✅ Dark → Light: ჯერ აფეთქება, მერე თემა (დაგვიანებით)
    if (isDark) {
      setTimeout(() => {
        toggleTheme();
      }, 300); // ანიმაციის დასრულების შემდეგ
    }

    // ✅ Light → Dark: ჯერ თემა, მერე ტალღა (თანმიმდევრობით)
    else {
      setTimeout(() => {
        toggleTheme();
      }, 500); // დაუყოვნებლივ
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        fontSize: 18,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 1,
      }}
      aria-label="Toggle theme"
    >
      <Sun color="var(--text-color)"/>
    </button>
  );
};
