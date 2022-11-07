'use client';

import { createContext, PropsWithChildren, useEffect, useState } from 'react';

type ThemeState = 'dark' | 'light';

const initialState = {
  theme: 'light',
  changeTheme: () => {}
};
export const ThemeContext = createContext(initialState);

const preferDarkQuery = '(prefers-color-scheme: dark)';

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeState>(() => {
    const localStorageValue = localStorage.getItem('theme');
    if (localStorageValue != null && localStorageValue !== '') {
      return localStorageValue as ThemeState;
    }
    return matchMedia(preferDarkQuery).matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const mediaQuery = matchMedia(preferDarkQuery);
    const pageContent = document.getElementById('__next') as HTMLElement;
    const handleChange = () => {
      setTheme(() => {
        const result = mediaQuery.matches ? 'dark' : 'light';
        if (result === 'dark') {
          document.documentElement.classList.add('dark');
          document.body.classList.add('bg-black', 'text-white');
          pageContent.className = 'dark-gradient';
        } else {
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('bg-black', 'text-white');
          pageContent.className = 'light-gradient';
        }
        return result;
      });
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const pageContent = document.getElementById('__next') as HTMLElement;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-black', 'text-white');
      pageContent.className = 'dark-gradient';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-black', 'text-white');
      pageContent.className = 'light-gradient';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const changeTheme = () => {
    setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
