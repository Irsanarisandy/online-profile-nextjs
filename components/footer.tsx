import linkElementPair from './link-element-pair';
import Links from '@entities/links.interface';
import styles from '@styles/Footer.module.scss';

interface IProp {
  links: Links;
}

function Footer({links}: IProp): JSX.Element {
  let linkElements: JSX.Element[] = [];
  if (links != null) {
    Object.entries(links).map(link =>
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
      )
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
