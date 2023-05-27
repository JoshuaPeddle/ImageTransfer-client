// This api route should return a single url to a random image.
// The nextjs server preloads the images and stores them in the cache.
// This route will be called by the client to fetch a random image from the cache.

import { NextApiRequest, NextApiResponse } from 'next';

import { getRandomImage } from '../../lib/randomImage';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  const image = await getRandomImage();
  console.log(image);
  res.status(200).json({'url':image});
}