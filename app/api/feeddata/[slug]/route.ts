import { Feed } from 'feed';
import fs from 'fs';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import type { NextRequest } from 'next/server';
import path from 'path';

import { publicLinks } from '.data/publicLinks';

const markdown = new MarkdownIt();

export async function GET(
  request: NextRequest,
  {
    params
  }: {
    params: { slug: string };
  }
) {
  const requestHeaders = new Headers(request.headers);
  const host = requestHeaders.get('host');
  const siteURL = `${
    process.env.NODE_ENV !== 'production' ? 'http' : 'https'
  }://${host}`;
  const author = {
    name: 'Irsan Arisandy'
  };
  const description =
    'Irsan Arisandy is a professional fullstack web developer who has experienced working with companies in multiple countries. Whether you need an interactive solution, or just mentoring, Irsan Arisandy got you covered.';

  const feed = new Feed({
    title: `Irsan's Online Profile & Blog`,
    id: `${siteURL}/`,
    link: `${siteURL}/`,
    description,
    image: `${siteURL}/api/initialsImage?height=250&width=250&scale=1.5`,
    favicon: `${siteURL}/images/favicon.ico`,
    copyright: `Copyright © ${new Date().getFullYear()} Irsan Arisandy`,
    generator: 'Feed for Node.js',
    feedLinks: {
      atom: `${siteURL}${publicLinks.feedAtom}`,
      json: `${siteURL}${publicLinks.feedJson}`,
      rss: `${siteURL}${publicLinks.feedRss}`
    },
    author
  });

  const aboutFile = path.join(process.cwd(), '/content/page/About.md');
  const { content } = matter(fs.readFileSync(aboutFile));
  const aboutUrl = `${siteURL}/about`;
  feed.addItem({
    title: 'About Irsan Arisandy',
    id: aboutUrl,
    link: aboutUrl,
    description,
    content: markdown.render(content.trim()),
    author: [author],
    contributor: [author],
    date: new Date('2022-01-09T05:54:32.399Z')
  });

  const postFiles = fs.readdirSync(path.join(process.cwd(), '/content/posts'));
  postFiles.forEach((file) => {
    const postFile = path.join(process.cwd(), `/content/posts/${file}`);
    const { data, content } = matter(fs.readFileSync(postFile));
    const postUrl = `${siteURL}/posts/${file.substring(0, file.indexOf('.'))}`;
    feed.addItem({
      title: data.title,
      id: postUrl,
      link: postUrl,
      description: data.excerpt,
      content: markdown.render(content.trim()),
      author: [author],
      contributor: [author],
      date: new Date(data.postDateTime),
      image: data.heroImage
    });
  });

  const { slug } = params;
  switch (slug) {
    case 'atom':
      return new Response(feed.atom1(), {
        headers: {
          'Content-Disposition': 'attachment;filename=atom.xml'
        },
        status: 200
      });
    case 'json':
      let jsonFeed: { [key: string]: any } = {};
      const generatedJSON = JSON.parse(feed.json1());
      for (let key in generatedJSON) {
        if (key === 'version') {
          jsonFeed[key] = `${generatedJSON[key]}.1`;
        } else if (key === 'author') {
          jsonFeed.authors = [generatedJSON[key]];
        } else if (key === 'items') {
          jsonFeed[key] = [];
          generatedJSON[key].forEach((item: { [key: string]: any }) => {
            item.authors = [item.author];
            delete item.author;
            jsonFeed[key].push(item);
          });
        } else {
          jsonFeed[key] = generatedJSON[key];
        }
        if (key === 'icon') {
          jsonFeed.favicon = `${siteURL}/images/favicon.ico`;
        }
      }
      return new Response(JSON.stringify(jsonFeed, null, 4), {
        headers: {
          'Content-Disposition': 'attachment;filename=feed.json'
        },
        status: 200
      });
    case 'rss':
      return new Response(feed.rss2(), {
        headers: {
          'Content-Disposition': 'attachment;filename=feed.xml'
        },
        status: 200
      });
  }
}
