import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import useSWR from 'swr';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import Navbar from './navbar';
import Footer from './footer';
import useToggleTheme from './toggle-theme';
import styles from '@styles/Layout.module.scss';

function Layout({ children }: PropsWithChildren<object>): JSX.Element {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR('/api/links', fetcher);

  const [colorTheme, setTheme] = useToggleTheme();
  const router = useRouter();

  return (
    <div className="h-screen flex flex-row">
      <Navbar links={data} colorTheme={colorTheme} />
      <div className="flex flex-col flex-auto overflow-y-auto">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <main key={router.asPath} className="grow">
            {children}
          </main>
        </AnimatePresence>
        <Footer links={data} />
      </div>
      <button
        id="themeToggleButton"
        aria-label="theme toggle button"
        className={`fixed bottom-4 right-4 text-black bg-gray-200 ${styles.toggle_button}`}
        onClick={() => setTheme(colorTheme === 'light' ? 'dark' : 'light')}
      >
        <span className="flex justify-center">
          {colorTheme === 'light' ? (
            <SunIcon className={styles.toggle_icon} />
          ) : (
            <MoonIcon className={styles.toggle_icon} />
          )}
        </span>
      </button>
    </div>
  );
}

export default Layout;
