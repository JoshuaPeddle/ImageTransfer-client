// This api route should allow the user to fetch the style model information from the server.
// The nextjs server will periodocally fetch the style model info from the server and store it in the cache.
// This route will be called by the client to fetch the styles from the cache.

import { NextApiRequest, NextApiResponse } from 'next';

import { getModels } from '../../lib/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=86400'
  );
  const styles = await  getModels();
  res.status(200).json(styles);
}
