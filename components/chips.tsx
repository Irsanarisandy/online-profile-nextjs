import Link from 'next/link';

interface IProp {
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
  classes?: string;
}

export const Chips = ({ labels, clickLocation, classes }: IProp) => (
  <div className={`flex flex-wrap ${classes}`}>
    {clickLocation == null &&
      labels.map((label, index) => (
        <span
          key={`Chip ${index + 1}: ${label}`}
          data-testid={`Chip ${index + 1}: ${label}`}
          aria-label={`Chip ${index + 1}: ${label}`}
          className="mr-4 mb-4 px-4 py-2 rounded-full bg-gray-900 dark:bg-gray-50 text-white dark:text-black font-semibold text-sm flex align-center transition-colors"
        >
          {label}
        </span>
      ))}
    {clickLocation != null &&
      labels.map((label, index) => (
        <Link
          key={`Chip ${index + 1}: ${label}`}
          href={`/${clickLocation}/${label}`}
          replace
          passHref
        >
          <a data-testid={`Chip ${index + 1}: ${label}`}>
            <span
              aria-label={`Chip ${index + 1}: ${label}`}
              className="mr-4 mb-4 px-4 py-2 rounded-full bg-gray-900 dark:bg-gray-50 text-white dark:text-black font-semibold text-sm flex align-center transition-colors"
            >
              {label}
            </span>
          </a>
        </Link>
      ))}
  </div>
);
