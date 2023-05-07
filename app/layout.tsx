import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Quicksand } from 'next/font/google';
import React, { type PropsWithChildren } from 'react';

import LayoutContent from './LayoutContent';
import { publicLinks } from '.data/publicLinks';
import '.styles/globals.scss';

const quicksand = Quicksand({
  subsets: ['latin']
});

export default function RootLayout({ children }: PropsWithChildren) {
  const data = publicLinks;
  const ThemeProvider = dynamic(() => import('.components/ThemeContext'), {
    ssr: false
  });

  return (
    <html lang="en" className={`scroll-smooth ${quicksand.className}`}>
      <head>
        <link
          rel="alternate"
          href={data.feedAtom}
          title="Irsan's Atom Feed"
          type="application/atom+xml"
        />
        <link
          rel="alternate"
          href={data.feedJson}
          title="Irsan's JSON Feed"
          type="application/feed+json"
        />
        <link
          rel="alternate"
          href={data.feedRss}
          title="Irsan's RSS Feed"
          type="application/rss+xml"
        />
      </head>
      <body className="transition-colors duration-500">
        <div id="__next">
          <ThemeProvider>
            <LayoutContent>{children}</LayoutContent>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

const title = {
  template: '%s | Irsan Arisandy',
  default: 'Irsan Arisandy | Fullstack Web Developer | Mentor'
};
const description =
  'Irsan Arisandy is a professional fullstack web developer who has experienced working with companies in multiple countries. Whether you need an interactive solution, or just mentoring, Irsan Arisandy got you covered.';

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: [
      { url: '/images/favicon.ico', type: 'image/vnd.microsoft.icon' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [{ url: '/api/initialsImage', sizes: '180x180', type: 'image/png' }]
  },
  manifest: '/manifest.json',
  authors: [{ name: 'Irsan Arisandy' }],
  keywords: [
    'irsan',
    'arisandy',
    'irsan arisandy',
    'irsan arisandy vercel',
    "irsan's online profile",
    'irsan arisandy online cv',
    'irsan arisandy online portfolio',
    'irsan arisandy online profile',
    'blog',
    'cv',
    'developer',
    'portfolio',
    'profile',
    'online cv',
    'online portfolio',
    'online profile',
    'web developer',
    'website developer',
    'software developer',
    'fullstack developer',
    'full-stack developer',
    'full stack developer',
    'frontend developer',
    'front-end developer',
    'front end developer',
    'backend developer',
    'back-end developer',
    'back end developer',
    'mentor',
    'tutor'
  ],
  applicationName: "Irsan's Online Profile PWA",
  appleWebApp: {
    title: "Irsan's Online Profile PWA",
    statusBarStyle: 'default'
  },
  themeColor: '#ffffff',
  // twitter: {
  //   cardType: 'summary',
  //   handle: 'jhooks',
  //   site: 'jhooks'
  // },
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: "Irsan's Online Profile",
    locale: 'en_US',
    images: [
      {
        url: '/api/initialsImage?height=630&width=630&scale=4',
        width: 630,
        height: 630,
        type: 'image/png',
        alt: 'black initials'
      },
      {
        url: '/api/initialsImage?height=630&width=630&scale=4&color=white',
        width: 630,
        height: 630,
        type: 'image/png',
        alt: 'white initials'
      }
    ]
  }
};
