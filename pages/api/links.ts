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
    cv: 'https://filen.io/d/5941aa6b-79eb-4780-911d-1aaa8886a14f#!Nop9m3euENPRol1YmdztggZ1vRoJ1Wlh',
    feedAtom: '/api/feeddata/atom',
    feedJson: '/api/feeddata/json',
    feedRss: '/api/feeddata/rss'
  });
}
