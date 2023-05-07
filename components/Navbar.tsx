import { motion } from 'framer-motion';
import { Merienda } from 'next/font/google';
import Image, { type ImageLoaderProps } from 'next/image';
import Link from 'next/link';
import React, {
  type DetailedHTMLProps,
  type HTMLAttributes,
  useLayoutEffect,
  useState
} from 'react';

import { LinkElementPair } from './LinkElementPair';
import type Links from '.entities/links.interface';
import styles from '.styles/Navbar.module.scss';

interface CustomMotionProp
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isMobile: boolean;
  isOpen: boolean;
}

interface NavlinkProp {
  href: string;
  name: string;
  isOpen: boolean;
  theme?: string;
  handleClick?: () => void;
}

interface NavbarProp {
  links: Links;
  theme?: string;
}

const merienda = Merienda({
  subsets: ['latin']
});

const imageLoader = ({ src }: ImageLoaderProps) => {
  return `${location.origin}/${src}`;
};

function NavOpacityMotionContainer({
  children,
  isMobile,
  isOpen,
  className
}: CustomMotionProp) {
  return isMobile ? (
    <div className={className} style={{ opacity: Number(isOpen) }}>
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
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navlink({ href, name, isOpen, theme, handleClick }: NavlinkProp) {
  return (
    <div
      className={`text-center ${
        theme !== 'dark' ? styles.navlink : styles.navlink_dark
      }`}
      onClick={handleClick}
    >
      <Link
        href={href}
        style={{
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
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
          className="block py-4 font-bold"
        >
          {name}
        </motion.span>
      </Link>
    </div>
  );
}

export default function Navbar({ links, theme }: NavbarProp) {
  const [isMobile, setIsMobile] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    const updateWindowDimensions = () => {
      setIsMobile(
        innerHeight <= 570 || innerWidth <= 640 || innerHeight >= innerWidth
      );
      setIsOpen(
        innerHeight > 570 && innerWidth > 640 && innerHeight < innerWidth
      );
    };

    updateWindowDimensions();

    addEventListener('resize', updateWindowDimensions);

    return () => {
      removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  const handleClick = () =>
    setIsOpen((prevState) => (isMobile ? !prevState : true));

  let linkElements: React.JSX.Element[] = [];
  if (links != null) {
    const certainLinks = ['linkedin', 'github', 'gitlab'] as const;
    certainLinks.forEach((name) => {
      if (!!links[name]) {
        linkElements.push(
          <Link
            aria-label={`${name} navbar link`}
            key={`${name} navbar link`}
            href={links[name]}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              pointerEvents: isOpen ? 'auto' : 'none'
            }}
          >
            <LinkElementPair linkName={name} className={styles.icon} />
          </Link>
        );
      }
    });
  }
  return (
    <>
      <nav
        role="navigation"
        aria-label="main navigation"
        className={`z-10 flex flex-col ${styles.navbar} ${
          isOpen ? styles.navbar_display : ''
        }`}
      >
        <div
          className={isOpen ? styles.logo_section : ''}
          style={{
            backgroundColor:
              isMobile && isOpen
                ? theme !== 'dark'
                  ? 'white'
                  : 'black'
                : 'transparent'
          }}
        >
          <NavOpacityMotionContainer
            isMobile={isMobile}
            isOpen={isOpen}
            className="flex flex-col items-center p-4"
          >
            <Link
              href="/"
              onClick={handleClick}
              style={{
                pointerEvents: isOpen ? 'auto' : 'none'
              }}
            >
              <Image
                loader={imageLoader}
                src={`api/initialsImage${
                  theme === 'dark' ? '?color=white' : ''
                }`}
                alt="logo"
                height={100}
                width={100}
                className="cursor-pointer"
              />
            </Link>
            <h1 className={`font-bold ${merienda.className}`}>Irsan</h1>
            <span className={`font-normal text-xs ${merienda.className}`}>
              Web Developer
            </span>
          </NavOpacityMotionContainer>
        </div>
        <div className="flex-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
          <NavOpacityMotionContainer
            isMobile={isMobile}
            isOpen={isOpen}
            className="flex flex-col items-center"
          >
            <div className="w-full my-12">
              <Navlink
                href="/about"
                name="About"
                isOpen={isOpen}
                theme={theme}
                handleClick={handleClick}
              />
              <Navlink
                href="/posts"
                name="Blog"
                isOpen={isOpen}
                theme={theme}
                handleClick={handleClick}
              />
              <Navlink
                href="/coming-soon"
                name="Games"
                isOpen={isOpen}
                theme={theme}
                handleClick={handleClick}
              />
            </div>
            <div
              className="mb-2 grid gap-4"
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
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        {isMobile && (
          <div>
            <span
              className={`block bg-black ${isOpen ? styles.top_bar : ''}`}
            ></span>
            <span
              className={`block bg-black ${isOpen ? styles.middle_bar : ''}`}
            ></span>
            <span
              className={`block bg-black ${isOpen ? styles.bottom_bar : ''}`}
            ></span>
          </div>
        )}
        {!isMobile && (
          <div>
            <span
              className={`block bg-black ${
                isOpen ? styles.top_left_arrow : styles.top_right_arrow
              }`}
            ></span>
            <span
              className={`block bg-black ${
                isOpen ? styles.bottom_left_arrow : styles.bottom_right_arrow
              }`}
            ></span>
          </div>
        )}
      </button>
    </>
  );
}
