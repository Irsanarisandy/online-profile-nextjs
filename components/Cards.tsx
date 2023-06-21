import React, {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode
} from 'react';

interface IProp
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * Class names from custom SCSS files and [Tailwind CSS](https://tailwindcss.com/)
   */
  className?: string;
  children: ReactNode;
}

export function Cards({ className, children }: IProp) {
  return (
    <div
      className={`rounded-lg border border-transparent shadow-lg shadow-gray-50 transition-colors duration-500 hover:bg-gray-50 dark:shadow-gray-900 dark:hover:bg-gray-900 ${className}`}
    >
      {children}
    </div>
  );
}
