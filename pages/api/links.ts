import type { NextApiRequest, NextApiResponse } from 'next';

import { publicLinks } from '.data/publicLinks';
import Links from '.entities/links.interface';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Links>
) {
  res.status(200).json(publicLinks);
}
