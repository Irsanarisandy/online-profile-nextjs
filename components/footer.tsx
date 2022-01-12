import Link from 'next/link';
import { useState } from 'react';
import linkElementPair from './link-element-pair';
import Links from '@entities/links.interface';
import styles from '@styles/Footer.module.scss';

interface IProp {
  links: Links;
}

function Footer({links}: IProp): JSX.Element {
  let linkElements: JSX.Element[] = [];
  let linkDropdownMenus: JSX.Element[] = [];
  const [feedExpanded, setFeedExpanded] = useState(false);

  if (links != null) {
    Object.entries(links).map(link => {
      if (!link[0].includes('feed')) {
        linkElements.push(
          <a
            href={link[1]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link[0]} link`}
            key={link[0]}
          >
            {linkElementPair(link[0], styles.icon, 24)}
          </a>
        );
      } else {
        let feedType = link[0].substring(4);
        if (feedType !== 'Atom') {
          feedType = feedType.toUpperCase();
        }
        const name = `Feed (${feedType})`;
        linkDropdownMenus.push(
          <Link href={link[1]} replace passHref key={name}>
            <a
              className="text-sm py-2 px-4 block w-full bg-transparent text-gray-700 hover:bg-gray-100"
              target="_blank"
              role="menuitem"
            >
              {name}
            </a>
          </Link>
        );
      }
    });
    linkElements.push(
      <div className="relative flex">
        <button
          id="menu-button"
          className="hover:opacity-50"
          aria-label="feed dropdown button"
          aria-expanded={feedExpanded}
          aria-haspopup="true"
          onClick={() => setFeedExpanded(!feedExpanded)}
          title="Feed Dropdown"
        >
          {linkElementPair('feed', styles.feed_icon, 24)}
        </button>
        {feedExpanded && <div
          className="absolute bottom-10 right-0 w-32 rounded-md bg-white py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {linkDropdownMenus}
        </div>}
      </div>
    );
  }

  return (
    <footer className="flex flex-col items-center py-4">
      <div
        className="mb-2 transition-opacity duration-1500 grid gap-5 items-center"
        style={{
          opacity: linkElements.length === 0 ? 0 : 1,
          gridTemplateColumns: `repeat(${linkElements.length}, minmax(0, 1fr))`
        }}
      >
        {linkElements}
      </div>
      <span className="text-center">
        Copyright &copy; {(new Date()).getFullYear()} Irsan Arisandy
      </span>
    </footer>
  );
};

export default Footer;
