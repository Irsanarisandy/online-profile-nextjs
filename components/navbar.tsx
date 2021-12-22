import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Links from '@entities/links.interface';
import linkElementPair from './link-element-pair';
import styles from '@styles/Navbar.module.scss';

interface NavlinkProp {
  href: string;
  name: string;
  isOpen: boolean;
  colorTheme?: string;
  handleClick?: React.MouseEventHandler<HTMLElement>;
}

interface NavbarProp {
  links: Links;
  colorTheme?: string;
}

interface NavbarState {
  isMobile: boolean;
  isOpen: boolean;
  height?: number;
  width?: number;
}

const Navlink = ({href, name, isOpen, colorTheme, handleClick}: NavlinkProp) => (
  <div
    className={`text-center ${colorTheme !== 'dark' ? styles.navlink : styles.navlink_dark}`}
    onClick={handleClick}
  >
    <Link href={href} passHref>
      <a style={{
        pointerEvents: isOpen ? 'auto' : 'none'
      }}>
        <span className="py-4 font-bold hover:duration-500 hover:opacity-50">
          {name}
        </span>
      </a>
    </Link>
  </div>
);

class Navbar extends React.Component<NavbarProp, NavbarState> {
  constructor(props: NavbarProp) {
    super(props);
    this.state = { isMobile: true, isOpen: false };
  }

  componentDidMount() {
    window.addEventListener('load', this.updateWindowDimensions);
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.updateWindowDimensions);
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => this.setState({
    height: window.innerHeight,
    width: window.innerWidth,
    isMobile: window.innerHeight <= 570 || window.innerWidth <= 640 || window.innerHeight >= window.innerWidth,
    isOpen: window.innerHeight > 570 && window.innerWidth > 640 && window.innerHeight < window.innerWidth
  });

  handleClick = () => this.setState(state => ({ isOpen: state.isMobile ? !state.isOpen : true }));

  render() {
    const { links, colorTheme } = this.props;
    const { isMobile, isOpen } = this.state;
    let linkElements: JSX.Element[] = [];
    if (links != null) {
      const certainLinks = ['linkedin', 'github', 'gitlab'] as const;
      certainLinks.forEach(name => {
        if (!!links[name]) {
          linkElements.push(
            <a
              href={links[name]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} link`}
              key={name}
              style={{
                pointerEvents: isOpen ? 'auto' : 'none'
              }}
            >
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
          className={`z-10 flex flex-col ${styles.navbar} ${isOpen ? styles.navbar_display : ''}`}
        >
          <div
            className="flex flex-col items-center p-4"
            style={{
              backgroundColor: (isMobile && isOpen) ?
                (colorTheme !== 'dark' ? 'white' : 'black') : 'transparent'
            }}
          >
            <Link href="/" passHref>
              <a
                onClick={this.handleClick}
                style={{
                  pointerEvents: isOpen ? 'auto' : 'none'
                }}
              >
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
          <div className="flex flex-col items-center flex-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
            <div className="w-full my-12">
              {/* <Navlink href="/games" name="Games" isOpen={isOpen} colorTheme={colorTheme} handleClick={this.handleClick} /> */}
              <Navlink href="/coming-soon" name="About" isOpen={isOpen} colorTheme={colorTheme} handleClick={this.handleClick} />
              <Navlink href="/coming-soon" name="My Skills" isOpen={isOpen} colorTheme={colorTheme} handleClick={this.handleClick} />
              <Navlink href="/coming-soon" name="Blog" isOpen={isOpen} colorTheme={colorTheme} handleClick={this.handleClick} />
            </div>
            <div
              className="mb-2 grid gap-3 items-center"
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
          className={`z-10 text-black bg-gray-200 flex flex-col justify-center items-center ${styles.toggle_nav_button}`}
          onClick={() => this.setState({ isOpen: !isOpen })}
        >
          {isMobile && <div>
            <span className={`bg-black ${isOpen ? styles.top_bar : ''}`}></span>
            <span className={`bg-black ${isOpen ? styles.middle_bar : ''}`}></span>
            <span className={`bg-black ${isOpen ? styles.bottom_bar : ''}`}></span>
          </div>}
          {!isMobile && <div>
            <span className={`bg-black ${isOpen ? styles.top_left_arrow : styles.top_right_arrow}`}></span>
            <span className={`bg-black ${isOpen ? styles.bottom_left_arrow : styles.bottom_right_arrow}`}></span>
          </div>}
        </button>
      </>
    );
  }
}

export default Navbar;
