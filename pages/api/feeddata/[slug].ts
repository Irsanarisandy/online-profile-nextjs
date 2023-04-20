import { Feed } from 'feed';
import fs from 'fs';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { publicLinks } from '.data/publicLinks';

const markdown = new MarkdownIt();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const siteURL = `${
    process.env.NODE_ENV !== 'production' ? 'http' : 'https'
  }://${req.headers.host}`;
  const author = {
    name: 'Irsan Arisandy'
  };

  const feed = new Feed({
    title: `Irsan's Online Profile & Blog`,
    id: `${siteURL}/`,
    link: `${siteURL}/`,
    description:
      'Hire professional fullstack website developer to build interactive and high-end solutions.',
    image: `${siteURL}/images/logo.png`,
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
    title: 'About',
    id: aboutUrl,
    link: aboutUrl,
    description:
      'An about page containing some information about Irsan Arisandy, as a website developer.',
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

  const { slug } = req.query;
  switch (slug) {
    case 'atom':
      res.setHeader('Content-Disposition', 'attachment;filename=atom.xml');
      res.status(200).send(feed.atom1());
      break;
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
      res.setHeader('Content-Disposition', 'attachment;filename=feed.json');
      res.status(200).send(JSON.stringify(jsonFeed, null, 4));
      break;
    case 'rss':
      res.setHeader('Content-Disposition', 'attachment;filename=feed.xml');
      res.status(200).send(feed.rss2());
      break;
  }
}
