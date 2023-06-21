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
  /**
   * Tina's click to edit functionality (only available in Tina's edit mode)
   */
  passedTinaFieldFunc?: (i: number) => string;
}

export function Chips({
  labels,
  clickLocation,
  className,
  passedTinaFieldFunc
}: IProp) {
  return (
    <div className={`flex flex-wrap ${className}`}>
      {labels.map((label, i) => {
        const passedTinaField = passedTinaFieldFunc
          ? passedTinaFieldFunc(i)
          : undefined;

        return clickLocation == null ? (
          <span
            key={`Chip ${i + 1}: ${label}`}
            data-testid={`Chip ${i + 1}: ${label}`}
            aria-label={`Chip ${i + 1}: ${label}`}
            data-tina-field={passedTinaField}
            className="align-center mb-4 mr-4 flex rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors dark:bg-gray-50 dark:text-black"
          >
            {label}
          </span>
        ) : (
          <Link
            aria-label={`Chip link ${i + 1}: ${label}`}
            data-testid={`Chip ${i + 1}: ${label}`}
            key={`Chip link ${i + 1}: ${label}`}
            href={`/${clickLocation}/${label}`}
            data-tina-field={passedTinaField}
          >
            <span className="align-center mb-4 mr-4 flex rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors dark:bg-gray-50 dark:text-black">
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
