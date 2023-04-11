import { PropsWithChildren } from 'react';

interface IProp {
  /**
   * Class names from custom SCSS files and [Tailwind CSS](https://tailwindcss.com/)
   */
  classes?: string;
}

export function Cards({
  children,
  classes
}: PropsWithChildren<IProp>): JSX.Element {
  return (
    <div
      className={`hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-500 border border-transparent rounded-lg shadow-lg shadow-gray-50 dark:shadow-gray-900 ${classes}`}
    >
      {children}
    </div>
  );
}
