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
    cv: 'https://www.dropbox.com/s/lfazvco9hgy6qq0/CV.pdf?dl=1',
    feedAtom: '/api/feeddata/atom',
    feedJson: '/api/feeddata/json',
    feedRss: '/api/feeddata/rss'
  });
};
