import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface IProp
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * Class names from custom SCSS files and [Tailwind CSS](https://tailwindcss.com/)
   */
  className?: string;
  children: ReactNode;
}

export function Cards({ className, children }: IProp): JSX.Element {
  return (
    <div
      className={`hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-500 border border-transparent rounded-lg shadow-lg shadow-gray-50 dark:shadow-gray-900 ${className}`}
    >
      {children}
    </div>
  );
}
