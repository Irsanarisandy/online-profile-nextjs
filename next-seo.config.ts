import type { NextSeoProps } from 'next-seo';

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  defaultTitle: 'IA | Fullstack Website Developer | Mentor',
  titleTemplate: '%s | Irsan Arisandy',
  description:
    'Hire professional fullstack website developer, Irsan Arisandy, to build interactive and high-end solutions.',
  additionalLinkTags: [
    {
      rel: 'apple-touch-icon',
      href: '/images/initials-black.png',
      sizes: '180x180'
    },
    {
      rel: 'icon',
      href: '/images/favicon.ico'
    },
    {
      rel: 'icon',
      href: '/images/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png'
    },
    {
      rel: 'icon',
      href: '/images/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png'
    },
    {
      rel: 'manifest',
      href: '/manifest.json'
    }
  ],
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Irsan Arisandy'
    },
    {
      name: 'keywords',
      content: [
        'irsan arisandy',
        'irsan arisandy vercel',
        "irsan's online profile",
        'irsan arisandy online profile',
        'irsan arisandy online portfolio',
        'irsan arisandy online cv',
        'online profile',
        'online portfolio',
        'online cv',
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
      ].join(', ')
    },
    {
      name: 'application-name',
      content: "Irsan's Online Profile PWA"
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default'
    },
    {
      name: 'apple-mobile-web-app-title',
      content: "Irsan's Online Profile PWA"
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    }
  ],
  // twitter: {
  //   cardType: 'summary',
  //   handle: 'jhooks',
  //   site: 'jhooks'
  // },
  openGraph: {
    title: 'IA | Fullstack Website Developer | Mentor',
    description:
      'Hire professional fullstack website developer to build interactive and high-end solutions.',
    type: 'website',
    siteName: "Irsan's Online Profile",
    profile: {
      firstName: 'Irsan',
      lastName: 'Arisandy',
      gender: 'male'
    },
    locale: 'en_US'
    // images: [
    //   {
    //     url: '/images/og.jpg',
    //     width: 1280,
    //     height: 720
    //   }
    // ]
  }
};
