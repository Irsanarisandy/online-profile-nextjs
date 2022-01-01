import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Links from '@entities/links.interface';
import linkElementPair from './link-element-pair';
import styles from '@styles/Navbar.module.scss';

interface CustomMotionProp {
  isMobile: boolean;
  isOpen: boolean;
  children: React.ReactNode;
  classes?: string;
}

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

const NavOpacityMotionContainer = ({isMobile, isOpen, children, classes}: CustomMotionProp) => {
  return isMobile ? (
    <div className={classes} style={{ opacity: Number(isOpen) }}>
      {children}
    </div>
  ) : (
    <motion.div
      variants={{
        // default duration is 0.3
        hidden: { opacity: 0, transition: { ease: [0, 1, 1, 1] } },
        display: { opacity: 1, transition: { duration: 2, ease: 'easeIn' } }
      }}
      initial="hidden"
      animate={isOpen ? 'display' : 'hidden'}
      className={classes}
    >
      {children}
    </motion.div>
  );
};

const Navlink = ({href, name, isOpen, colorTheme, handleClick}: NavlinkProp) => (
  <div
    className={`text-center ${colorTheme !== 'dark' ? styles.navlink : styles.navlink_dark}`}
    onClick={handleClick}
  >
    <Link href={href} passHref>
      <a style={{
        pointerEvents: isOpen ? 'auto' : 'none'
      }}>
        <motion.span
          whileHover={{
            opacity: [1, 0.5],
            fontSize: ['1.125rem', '1.3rem'],
            transition: {
              duration: 0.8,
              repeat: Infinity,
              repeatType: 'reverse'
            }
          }}
          className="py-4 font-bold"
        >
          {name}
        </motion.span>
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
            style={{
              backgroundColor: (isMobile && isOpen) ?
                (colorTheme !== 'dark' ? 'white' : 'black') : 'transparent'
            }}
          >
            <NavOpacityMotionContainer
              isMobile={isMobile}
              isOpen={isOpen}
              classes="flex flex-col items-center p-4"
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
            </NavOpacityMotionContainer>
          </div>
          <div className="flex-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
            <NavOpacityMotionContainer
              isMobile={isMobile}
              isOpen={isOpen}
              classes="flex flex-col items-center"
            >
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
            </NavOpacityMotionContainer>
          </div>
        </nav>
        <button
          aria-label="nav menu toggle button"
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
