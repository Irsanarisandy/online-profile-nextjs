'use client';

import { AnimatePresence } from 'framer-motion';
import React, { type PropsWithChildren, useContext } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

import Footer from '.components/Footer';
import Navbar from '.components/Navbar';
import { ThemeContext } from '.components/ThemeContext';
import { publicLinks } from '.data/publicLinks';
import styles from '.styles/Layout.module.scss';

export default function LayoutContent({ children }: PropsWithChildren) {
  const data = publicLinks;
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div className="flex h-screen flex-row">
      <Navbar links={data} theme={theme} />
      <div className="flex flex-auto flex-col overflow-y-auto">
        <main className="grow">
          <AnimatePresence mode="wait" onExitComplete={() => scrollTo(0, 0)}>
            {children}
          </AnimatePresence>
        </main>
        <Footer links={data} />
      </div>
      <button
        id="themeToggleButton"
        aria-label="theme toggle button"
        className={`fixed bottom-4 right-4 bg-gray-200 text-black ${styles.toggle_button}`}
        onClick={changeTheme}
      >
        <span className="flex justify-center">
          {theme === 'light' ? (
            <SunIcon className={styles.toggle_icon} />
          ) : (
            <MoonIcon className={styles.toggle_icon} />
          )}
        </span>
      </button>
    </div>
  );
}
