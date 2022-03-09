import Link from 'next/link';

interface IProp {
  labels: string[];
  clickLocation?: string;
  classes?: string;
}

export const Chips = ({ labels, clickLocation, classes }: IProp) => (
  <div className={`flex flex-wrap ${classes}`}>
    {clickLocation == null &&
      labels.map((label, index) => (
        <span
          aria-label={`chip ${index + 1}: ${label}`}
          className="mr-4 mb-4 px-4 py-2 rounded-full bg-gray-900 dark:bg-gray-50 text-white dark:text-black font-semibold text-sm flex align-center transition-colors"
          key={`chip${index + 1}`}
        >
          {label}
        </span>
      ))}
    {clickLocation != null &&
      labels.map((label, index) => (
        <Link
          href={`/${clickLocation}/${label}`}
          replace
          passHref
          key={`chip${index + 1}`}
        >
          <a>
            <span
              aria-label={`chip ${index + 1}: ${label}`}
              className="mr-4 mb-4 px-4 py-2 rounded-full bg-gray-900 dark:bg-gray-50 text-white dark:text-black font-semibold text-sm flex align-center transition-colors"
            >
              {label}
            </span>
          </a>
        </Link>
      ))}
  </div>
);
