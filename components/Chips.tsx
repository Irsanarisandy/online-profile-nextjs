import Link from 'next/link';
import React, { type DetailedHTMLProps, type HTMLAttributes } from 'react';

interface IProp
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * List of chip names
   */
  labels: string[];
  /**
   * Relative URL
   */
  clickLocation?: string;
  /**
   * Class names from custom SCSS files and [Tailwind CSS](https://tailwindcss.com/)
   */
  className?: string;
}

export function Chips({ labels, clickLocation, className }: IProp) {
  return (
    <div className={`flex flex-wrap ${className}`}>
      {clickLocation == null &&
        labels.map((label, index) => (
          <span
            key={`Chip ${index + 1}: ${label}`}
            data-testid={`Chip ${index + 1}: ${label}`}
            aria-label={`Chip ${index + 1}: ${label}`}
            className="align-center mb-4 mr-4 flex rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors dark:bg-gray-50 dark:text-black"
          >
            {label}
          </span>
        ))}
      {clickLocation != null &&
        labels.map((label, index) => (
          <Link
            aria-label={`Chip link ${index + 1}: ${label}`}
            data-testid={`Chip ${index + 1}: ${label}`}
            key={`Chip link ${index + 1}: ${label}`}
            href={`/${clickLocation}/${label}`}
          >
            <span className="align-center mb-4 mr-4 flex rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors dark:bg-gray-50 dark:text-black">
              {label}
            </span>
          </Link>
        ))}
    </div>
  );
}
