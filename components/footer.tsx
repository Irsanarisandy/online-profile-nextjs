import Link from 'next/link';
import { useState } from 'react';
import { LinkElementPair } from './link-element-pair';
import Links from '@entities/links.interface';
import styles from '@styles/Footer.module.scss';

interface IProp {
  links: Links;
}

function Footer({ links }: IProp): JSX.Element {
  let linkElements: JSX.Element[] = [];
  let linkDropdownMenus: JSX.Element[] = [];
  const [feedExpanded, setFeedExpanded] = useState(false);

  if (links != null) {
    Object.entries(links).map((link) => {
      if (!link[0].includes('feed')) {
        linkElements.push(
          <Link
            aria-label={`${link[0]} footer link`}
            key={`${link[0]} footer link`}
            href={link[1]}
            target="_blank"
          >
            <LinkElementPair
              linkName={link[0]}
              classes={styles.icon}
              otherIconSize={20}
            />
          </Link>
        );
      } else {
        let feedType = link[0].substring(4);
        if (feedType !== 'Atom') {
          feedType = feedType.toUpperCase();
        }
        const name = `Feed (${feedType})`;
        linkDropdownMenus.push(
          <Link
            key={name}
            role="menuitem"
            id={`feed${feedType}`}
            className="text-sm py-2 px-4 block w-full bg-transparent text-gray-700 hover:bg-gray-100"
            href={link[1]}
            target="_blank"
          >
            {name}
          </Link>
        );
      }
    });
    linkElements.push(
      <div className="relative flex" key="feed-type-button">
        <button
          id="feedMenuButton"
          className="hover:opacity-50"
          aria-label="feed dropdown button"
          aria-expanded={feedExpanded}
          aria-haspopup="true"
          onClick={() => setFeedExpanded(!feedExpanded)}
          title="Feed Dropdown"
        >
          <LinkElementPair linkName="feed" classes={styles.icon} />
        </button>
        {feedExpanded && (
          <div
            className="absolute bottom-10 right-0 w-32 rounded-md bg-white py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="feedMenuButton"
          >
            {linkDropdownMenus}
          </div>
        )}
      </div>
    );
  }

  return (
    <footer className="flex flex-col items-center py-4">
      <div
        className="mb-2 transition-opacity duration-1500 grid gap-5"
        style={{
          opacity: linkElements.length === 0 ? 0 : 1,
          gridTemplateColumns: `repeat(${linkElements.length}, minmax(0, 1fr))`
        }}
      >
        {linkElements}
      </div>
      <span>Copyright &copy; {new Date().getFullYear()} Irsan Arisandy</span>
    </footer>
  );
}

export default Footer;
