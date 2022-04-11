import { PropsWithChildren } from 'react';

interface IProp {
  classes?: string;
}

export const Cards = ({ children, classes }: PropsWithChildren<IProp>) => (
  <div
    className={`hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-500 border border-transparent rounded-lg shadow-lg shadow-gray-50 dark:shadow-gray-900 ${classes}`}
  >
    {children}
  </div>
);
