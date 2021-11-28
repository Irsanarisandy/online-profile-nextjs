import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Links from '@entities/links.interface';
import linkElementPair from './link-element-pair';
import styles from '@styles/Navbar.module.scss';

interface NavlinkProp {
  href: string;
  name: string;
}

interface NavbarProp {
  links: Links;
}

interface NavbarState {
  isOpen: boolean;
}

const Navlink = ({href, name}: NavlinkProp) => (
  <div className="border border-gray-100 dark:border-gray-800 text-center">
    <Link href={href} passHref>
      <a>
        <span className="py-4 font-bold transition-opacity duration-500 hover:opacity-50">
          {name}
        </span>
      </a>
    </Link>
  </div>
);

class Navbar extends React.Component<NavbarProp, NavbarState> {
  constructor(props: NavbarProp) {
    super(props);
    this.state = { isOpen: false };
  }

  handleClick = () => this.setState(state => ({ isOpen: !state.isOpen }));

  render() {
    const { links } = this.props;
    const { isOpen } = this.state;
    let linkElements: JSX.Element[] = [];
    if (links != null) {
      const certainLinks = ['linkedin', 'github', 'gitlab'] as const;
      certainLinks.forEach(name => {
        if (!!links[name]) {
          linkElements.push(
            <a href={links[name]} target="_blank" rel="noopener noreferrer" key={name}>
              {linkElementPair(name, styles.icon)}
            </a>
          );
        }
      });
    }
    return (
      <>
        <nav
          role="navigation"
          aria-label="main navigation"
          className={`flex flex-col ${styles.navbar} ${isOpen ? styles.navbar_display : ''}`}
        >
          <div className="flex flex-col items-center p-4">
            <Link href="/" passHref>
              <a>
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  height={100}
                  width={55}
                  className="cursor-pointer"
                />
              </a>
            </Link>
            <h1 className={styles.customfont_name}>Irsan</h1>
            <span className={styles.customfont_role}>Web Developer</span>
          </div>
          <div className='flex flex-col items-center flex-auto bg-gray-50 dark:bg-gray-900'>
            <div className="w-full my-12">
              {/* <Navlink href="/games" name="Games" /> */}
              <Navlink href="/coming-soon" name="About" />
              <Navlink href="/coming-soon" name="My Skills" />
              <Navlink href="/coming-soon" name="Blog" />
            </div>
            <div
              className='mb-2 transition-opacity duration-1500 grid gap-3 items-center'
              style={{
                opacity: linkElements.length === 0 ? 0 : 1,
                gridTemplateColumns: `repeat(${linkElements.length}, minmax(0, 1fr))`
              }}
            >
              {linkElements}
            </div>
          </div>
        </nav>
        <button
          className={`fixed top-4 right-4 text-black bg-gray-200 ${styles.toggle_button}`}
          onClick={this.handleClick}
        >
          <span>
            {isOpen ? '\u2613' : '\u2630'}
          </span>
        </button>
      </>
    );
  }
}

export default Navbar;
