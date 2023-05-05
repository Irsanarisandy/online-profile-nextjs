import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/coming-soon/'
    },
    sitemap: `${process.env.NEXT_PUBLIC_ORIGIN_URL || ''}/sitemap.xml`
  };
}
