import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LOCAL_STORAGE_THEME_KEY = 'theme';

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null;
  if (stored === Theme.LIGHT || stored === Theme.DARK) {
    return stored;
  }

  const systemPrefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return systemPrefersDark ? Theme.DARK : Theme.LIGHT;
};

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme; // optional for Storybook etc.
}

export const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || getInitialTheme());

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
