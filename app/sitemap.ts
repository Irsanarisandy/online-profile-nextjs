import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: '/',
      lastModified: new Date('2022-01-09T05:54:24.000Z')
    },
    {
      url: '/about',
      lastModified: new Date('2022-01-09T05:54:32.399Z')
    },
    {
      url: '/posts',
      lastModified: new Date('2022-04-01T05:20:00.000Z')
    },
    {
      url: '/posts/FirstPost',
      lastModified: new Date('2022-01-10T06:26:27.858Z')
    },
    {
      url: '/posts/CypressCucumber',
      lastModified: new Date('2022-03-11T10:03:00.000Z')
    },
    {
      url: '/posts/Esoteric',
      lastModified: new Date('2022-04-01T05:20:00.000Z')
    }
  ];
}
