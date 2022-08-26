import type { NextApiRequest, NextApiResponse } from 'next';
import Links from '@entities/links.interface';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Links>
) {
  res.status(200).json({
    linkedin: 'https://www.linkedin.com/in/irsan-arisandy',
    github: 'https://github.com/irsanarisandy',
    gitlab: 'https://gitlab.com/irsanarisandy',
    cv: 'https://filen.io/d/ff5b18ff-0c7d-4712-b2d0-a5125553ea02#!Ly7wBRqKfVGsgySn7w4wr5ORE5dPwqbW',
    feedAtom: '/api/feeddata/atom',
    feedJson: '/api/feeddata/json',
    feedRss: '/api/feeddata/rss'
  });
}
