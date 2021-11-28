import { useEffect, useState } from 'react';

type ToggleThemeState = 'dark' | 'light';

function useToggleTheme() {
  const preferDarkQuery = '(prefers-color-scheme: dark)';
  const [theme, setTheme] = useState<ToggleThemeState>(() => {
    if (typeof(window) === 'undefined') {
      return 'light';
    }
    const localStorageValue = window.localStorage.getItem('theme');
    if (localStorageValue) {
      return localStorageValue === 'dark' ? 'dark' : 'light';
    }
    return window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const handleChange = () => {
      setTheme(() => {
        const result = mediaQuery.matches ? 'dark' : 'light';
        if (result === 'dark') {
					document.documentElement.classList.add('dark');
					document.body.classList.add('bg-black', 'text-white');
        } else {
					document.documentElement.classList.remove('dark');
					document.body.classList.remove('bg-black', 'text-white');
        }
        return result;
      });
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-black', 'text-white');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-black', 'text-white');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme] as const;
}

export default useToggleTheme;
